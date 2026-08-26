const CODE_TOKEN_RATIO = 3.5;
const TEXT_TOKEN_RATIO = 4;

export type TokenBudgetStatus = "comfortable" | "near-limit" | "at-limit" | "over-budget";

export interface TokenBudgetAnalysis {
  budget: number;
  estimatedTokens: number;
  remainingTokens: number;
  overBudgetTokens: number;
  utilizationPercent: number;
  status: TokenBudgetStatus;
}

export interface TokenReduction {
  beforeTokens: number;
  afterTokens: number;
  savedTokens: number;
  reductionPercent: number;
}

export function estimateTokens(value: string, kind: "code" | "text" = "text"): number {
  if (!value) return 0;
  const ratio = kind === "code" ? CODE_TOKEN_RATIO : TEXT_TOKEN_RATIO;
  const characters = value.length;
  const structuralTokens = (value.match(/[{}()[\].,;:+\-*/=<>!?|&]/g) ?? []).length * 0.12;
  return Math.max(1, Math.ceil(characters / ratio + structuralTokens));
}

export function truncateToTokens(value: string, budget: number): string {
  if (estimateTokens(value) <= budget) return value;
  const maxCharacters = Math.max(0, Math.floor(budget * TEXT_TOKEN_RATIO));
  return `${value.slice(0, maxCharacters).trimEnd()}\n…`;
}

export function estimateRepositoryTokens(files: Array<{ size: number }>): number {
  return files.reduce(
    (total, file) => total + Math.max(1, Math.ceil(file.size / CODE_TOKEN_RATIO)),
    0,
  );
}

export function analyzeTokenBudget(
  estimatedTokens: number,
  budget: number,
): TokenBudgetAnalysis {
  const safeBudget = Math.max(1, Math.floor(budget));
  const safeTokens = Math.max(0, Math.ceil(estimatedTokens));
  const utilizationPercent = (safeTokens / safeBudget) * 100;
  const status: TokenBudgetStatus =
    safeTokens > safeBudget
      ? "over-budget"
      : safeTokens === safeBudget
        ? "at-limit"
        : utilizationPercent >= 85
          ? "near-limit"
          : "comfortable";
  return {
    budget: safeBudget,
    estimatedTokens: safeTokens,
    remainingTokens: Math.max(0, safeBudget - safeTokens),
    overBudgetTokens: Math.max(0, safeTokens - safeBudget),
    utilizationPercent,
    status,
  };
}

export function calculateTokenReduction(beforeTokens: number, afterTokens: number): TokenReduction {
  const before = Math.max(0, Math.ceil(beforeTokens));
  const after = Math.max(0, Math.ceil(afterTokens));
  const savedTokens = Math.max(0, before - after);
  return {
    beforeTokens: before,
    afterTokens: after,
    savedTokens,
    reductionPercent: before > 0 ? (savedTokens / before) * 100 : 0,
  };
}
