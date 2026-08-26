import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import type { RankedFile, UsageEstimate } from "../../core/src/types.js";
import {
  analyzeTokenBudget,
  calculateTokenReduction,
  estimateTokens,
  truncateToTokens,
} from "../../token-estimator/src/index.js";
import { compressExcerpt } from "./compressor.js";

export * from "./skills/index.js";
export * from "./compressor.js";

export interface CompileInput {
  root: string;
  task: string;
  budget: number;
  ranked: RankedFile[];
  changedFiles: string[];
  instructions: Array<{ path: string; content: string }>;
  repositoryEstimatedTokens: number;
  diff?: string;
  skills?: string[];
  compact?: boolean;
}

export interface CompileResult {
  markdown: string;
  included: RankedFile[];
  usage: UsageEstimate;
}

function fenceFor(path: string): string {
  const extension = extname(path).slice(1);
  const aliases: Record<string, string> = {
    js: "javascript",
    jsx: "jsx",
    md: "markdown",
    py: "python",
    rb: "ruby",
    rs: "rust",
    sh: "bash",
    ts: "typescript",
    tsx: "tsx",
    yml: "yaml",
  };
  return aliases[extension] ?? extension;
}

function usageReport(usage: UsageEstimate): string {
  const budgetLine = usage.budgetOverageTokens > 0
    ? `- Budget overage: ${usage.budgetOverageTokens.toLocaleString()} tokens`
    : `- Estimated budget remaining: ${usage.budgetRemainingTokens.toLocaleString()} tokens`;
  const lines = [
    "## Estimated usage",
    "",
    "> Estimates only. ContextPilot cannot see the coding agent's internal prompt, cache, or billing.",
    "",
    `- Without ContextPilot (indexable repository baseline): ${usage.estimatedWithoutContextPilotTokens.toLocaleString()} tokens`,
    `- With ContextPilot (compiled task bundle): ${usage.estimatedWithContextPilotTokens.toLocaleString()} tokens`,
    `- Estimated tokens saved: ${usage.estimatedTokensSaved.toLocaleString()} tokens`,
    `- Estimated reduction: ${usage.estimatedContextReductionPercent.toFixed(1)}%`,
    "",
    `- Budget utilization: ${usage.budgetUtilizationPercent.toFixed(1)}% (${usage.budgetStatus})`,
    budgetLine,
    `- Files included / omitted: ${usage.selectedFileCount} / ${usage.omittedFileCount}`,
    "",
    "### Reduction stages",
    "",
    `- Raw selected file content: ${usage.rawSelectedTokens.toLocaleString()} tokens`,
    `- After symbol extraction: ${usage.afterSymbolExtractionTokens.toLocaleString()} tokens (saved ${usage.symbolExtractionTokensSaved.toLocaleString()}, ${usage.symbolExtractionReductionPercent.toFixed(1)}%)`,
    `- After optional compact compression: ${usage.afterSummaryCompressionTokens.toLocaleString()} tokens (saved ${usage.compressionTokensSaved.toLocaleString()}, ${usage.compressionReductionPercent.toFixed(1)}%)`,
    `- Instructions: ${usage.instructionTokens.toLocaleString()} tokens`,
    `- Final bundle: ${usage.estimatedTotalInputTokens.toLocaleString()} / ${usage.budget.toLocaleString()} tokens`,
  ];
  if (usage.optimizationHints.length) {
    lines.push("", "### Optimization hints", "", ...usage.optimizationHints.map((hint) => `- ${hint}`));
  }
  return lines.join("\n");
}

export async function compilePrompt(input: CompileInput): Promise<CompileResult> {
  const rawContents = await Promise.all(
    input.ranked.map(async ({ file }) => {
      try {
        return await readFile(join(input.root, file.path), "utf8");
      } catch {
        return "";
      }
    }),
  );
  const rawSelectedTokens = rawContents.reduce(
    (total, content) => total + estimateTokens(content, "code"),
    0,
  );
  const extractedContents = input.ranked.map((item) => item.excerpt ?? item.file.summary);
  const afterSymbolExtractionTokens = extractedContents.reduce(
    (total, content) => total + estimateTokens(content, "code"), 0,
  );
  const compressedContents = input.ranked.map((item, index) =>
    input.compact && item.excerpt
      ? compressExcerpt(extractedContents[index] ?? "")
      : extractedContents[index] ?? "",
  );
  const afterSummaryCompressionTokens = compressedContents.reduce(
    (total, content) => total + estimateTokens(content, "code"), 0,
  );
  const instructionTokens = input.instructions.reduce(
    (total, instruction) => total + estimateTokens(instruction.content),
    0,
  );

  const headerParts = [
    "# ContextPilot task bundle",
    "",
    "## Task",
    "",
    input.task,
  ];

  if (input.skills && input.skills.length > 0) {
    headerParts.push(
      "",
      "## Active Skills",
      "",
      ...input.skills.map((skill) => `- ${skill}`),
    );
  }

  headerParts.push(
    "",
    "## Agent guidance",
    "",
    "- Implement the task using the focused context below.",
    "- Inspect additional repository files only when the bundle is insufficient.",
    "- Treat excerpts as partial files; preserve surrounding behavior when editing.",
    "- Run the repository's relevant validation commands after changes.",
  );

  if (input.instructions.length) {
    headerParts.push("", "## Repository instructions", "");
    const instructionBudget = Math.max(200, Math.floor(input.budget * 0.2));
    const perFileBudget = Math.max(100, Math.floor(instructionBudget / input.instructions.length));
    for (const instruction of input.instructions) {
      headerParts.push(
        `### ${instruction.path}`,
        "",
        truncateToTokens(instruction.content.trim(), perFileBudget),
        "",
      );
    }
  }

  if (input.changedFiles.length) {
    headerParts.push(
      "",
      "## Git changes",
      "",
      ...input.changedFiles.map((path) => `- ${path}`),
    );
  }

  const rankedSummary = input.ranked.map(
    ({ file, score, reasons }, index) =>
      `${index + 1}. \`${file.path}\` — score ${score}; ${reasons.join("; ")}`,
  );
  headerParts.push("", "## Relevant files", "", ...rankedSummary);

  const sections = [headerParts.join("\n")];
  let consumed = estimateTokens(sections[0] ?? "");
  const reserveForReport = Math.min(450, Math.max(300, Math.floor(input.budget * 0.25)));
  const included: RankedFile[] = [];

  if (input.diff) {
    const available = input.budget - consumed - reserveForReport;
    if (available > 300) {
      const diff = truncateToTokens(input.diff, Math.min(available, Math.floor(input.budget * 0.25)));
      const section = `## Current diff\n\n\`\`\`diff\n${diff}\n\`\`\``;
      sections.push(section);
      consumed += estimateTokens(section, "code");
    }
  }

  sections.push("## Focused context");
  consumed += estimateTokens("## Focused context");

  for (const rankedFile of input.ranked) {
    const summary = [
      `### ${rankedFile.file.path}`,
      "",
      `Language: ${rankedFile.file.language} · Lines: ${rankedFile.file.lines} · Relevance: ${rankedFile.score}`,
      "",
      rankedFile.file.summary,
    ].join("\n");
    let rawExcerpt = rankedFile.excerpt;
    if (rawExcerpt && input.compact) {
      rawExcerpt = compressExcerpt(rawExcerpt);
    }
    const excerpt = rawExcerpt
      ? `\n\n\`\`\`${fenceFor(rankedFile.file.path)}\n${rawExcerpt}\n\`\`\``
      : "";
    let section = `${summary}${excerpt}`;
    const available = input.budget - consumed - reserveForReport;
    if (available < estimateTokens(summary) + 20) break;
    if (estimateTokens(section, "code") > available) section = summary;
    sections.push(section);
    const sectionTokens = estimateTokens(section, "code");
    consumed += sectionTokens;
    included.push(rankedFile);
  }

  const omitted = input.ranked.length - included.length;
  if (omitted > 0) {
    const note = `> ${omitted} lower-priority file${omitted === 1 ? " was" : "s were"} omitted to stay within budget.`;
    sections.push(note);
    consumed += estimateTokens(note);
  }

  const estimatedWithoutContextPilotTokens =
    input.repositoryEstimatedTokens + estimateTokens(input.task);
  const symbolReduction = calculateTokenReduction(rawSelectedTokens, afterSymbolExtractionTokens);
  const compressionReduction = calculateTokenReduction(
    afterSymbolExtractionTokens,
    afterSummaryCompressionTokens,
  );
  const createUsage = (totalTokens: number): UsageEstimate => {
    const budget = analyzeTokenBudget(totalTokens, input.budget);
    const overallReduction = calculateTokenReduction(
      estimatedWithoutContextPilotTokens,
      totalTokens,
    );
    const optimizationHints: string[] = [];
    if (budget.status === "over-budget") {
      optimizationHints.push("Reduce the task scope, lower `--max-files`, or increase `--budget`.");
    } else if ((budget.status === "near-limit" || budget.status === "at-limit") && !input.compact) {
      optimizationHints.push("Use `--compact` to remove comments and excess blank lines from excerpts.");
    }
    if (omitted > 0) {
      optimizationHints.push(`${omitted} relevant file${omitted === 1 ? " was" : "s were"} omitted; increase the budget only if that context is needed.`);
    }
    return {
      estimatedWithoutContextPilotTokens,
      estimatedWithContextPilotTokens: totalTokens,
      estimatedTokensSaved: overallReduction.savedTokens,
      rawSelectedTokens,
      afterSymbolExtractionTokens,
      afterSummaryCompressionTokens,
      instructionTokens,
      estimatedTotalInputTokens: totalTokens,
      estimatedContextReductionPercent: overallReduction.reductionPercent,
      budget: input.budget,
      budgetRemainingTokens: budget.remainingTokens,
      budgetOverageTokens: budget.overBudgetTokens,
      budgetUtilizationPercent: budget.utilizationPercent,
      budgetStatus: budget.status,
      symbolExtractionTokensSaved: symbolReduction.savedTokens,
      symbolExtractionReductionPercent: symbolReduction.reductionPercent,
      compressionTokensSaved: compressionReduction.savedTokens,
      compressionReductionPercent: compressionReduction.reductionPercent,
      selectedFileCount: included.length,
      omittedFileCount: omitted,
      optimizationHints,
    };
  };

  let estimatedTotalInputTokens = consumed + reserveForReport;
  let usage = createUsage(estimatedTotalInputTokens);
  let markdown = "";
  for (let pass = 0; pass < 4; pass += 1) {
    markdown = `${[...sections, usageReport(usage)].join("\n\n").trim()}\n`;
    const measured = estimateTokens(markdown, "code");
    usage = createUsage(measured);
    if (measured === estimatedTotalInputTokens) break;
    estimatedTotalInputTokens = measured;
  }
  markdown = `${[...sections, usageReport(usage)].join("\n\n").trim()}\n`;

  return { markdown, included, usage };
}
