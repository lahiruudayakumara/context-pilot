import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { prepareContext, taskHistory } from "../packages/core/src/index.js";
import { estimateTokens } from "../packages/token-estimator/src/index.js";

test("prepares a bounded task bundle with instructions", async () => {
  const root = await mkdtemp(join(tmpdir(), "context-pilot-core-"));
  await mkdir(join(root, "src"), { recursive: true });
  await writeFile(join(root, "AGENTS.md"), "# Rules\n\n- Preserve the public API.\n");
  await writeFile(
    join(root, "src", "refund-service.ts"),
    `export class RefundService {
  approveRefund(id: string) {
    return { id, approved: true };
  }
}
`,
  );
  await writeFile(
    join(root, "src", "unrelated.ts"),
    `export const values = [${Array.from({ length: 2_000 }, (_, index) => index).join(",")}];`,
  );
  const result = await prepareContext({
    root,
    task: "Add refund approval validation",
    budget: 2_000,
  });
  const persisted = await readFile(result.outputPath, "utf8");
  assert.match(persisted, /RefundService/);
  assert.match(persisted, /Preserve the public API/);
  assert.match(persisted, /Estimates only/);
  assert.ok(estimateTokens(persisted, "code") <= 2_200);
  assert.equal(result.selected[0]?.file.path, "src/refund-service.ts");
  assert.ok(
    result.usage.estimatedWithoutContextPilotTokens >=
      result.usage.estimatedWithContextPilotTokens,
  );
  assert.equal(
    result.usage.estimatedTokensSaved,
    result.usage.estimatedWithoutContextPilotTokens -
      result.usage.estimatedWithContextPilotTokens,
  );
  assert.match(persisted, /Without ContextPilot/);
  assert.match(persisted, /With ContextPilot/);
  assert.match(persisted, /Estimated budget remaining/);
  assert.match(persisted, /Reduction stages/);
  assert.equal(
    result.usage.budgetRemainingTokens,
    Math.max(0, result.usage.budget - result.usage.estimatedTotalInputTokens),
  );
  assert.equal(result.usage.selectedFileCount, result.selected.length);
  assert.equal(
    result.usage.estimatedTotalInputTokens,
    estimateTokens(persisted, "code"),
  );
  const history = await taskHistory(root);
  assert.equal(history.length, 1);
  assert.equal(history[0]?.task, "Add refund approval validation");
});

test("prepares context with skill options and converted prompt", async () => {
  const root = await mkdtemp(join(tmpdir(), "context-pilot-skills-"));
  await mkdir(join(root, "src"), { recursive: true });
  await writeFile(
    join(root, "src", "payment.ts"),
    `export function processPayment(amount: number) {
  if (amount <= 0) throw new Error("Invalid amount");
  return { success: true };
}`,
  );

  const result = await prepareContext({
    root,
    task: "Fix payment error on negative amount",
    skills: ["bugfix", "test"],
    budget: 3_000,
  });

  assert.deepEqual(result.appliedSkills, ["bugfix", "unit-testing"]);
  assert.ok(result.convertedTask);
  const persisted = await readFile(result.outputPath, "utf8");
  assert.match(persisted, /Active Skills/);
  assert.match(persisted, /bugfix/);
  assert.match(persisted, /test/);
});

test("automatically ensures .context-pilot/ entry in target .gitignore", async () => {
  const root = await mkdtemp(join(tmpdir(), "context-pilot-gitignore-"));
  await mkdir(join(root, "src"), { recursive: true });
  await writeFile(join(root, "src", "index.ts"), "export const a = 1;");
  await writeFile(join(root, ".gitignore"), "node_modules/\n");

  await prepareContext({
    root,
    task: "Build index",
    budget: 1_000,
  });

  const gitignoreContent = await readFile(join(root, ".gitignore"), "utf8");
  assert.match(gitignoreContent, /node_modules\//);
  assert.match(gitignoreContent, /\.context-pilot\//);
});

test("compresses code token excerpts when compact mode is enabled", async () => {
  const root = await mkdtemp(join(tmpdir(), "context-pilot-compress-"));
  await mkdir(join(root, "src"), { recursive: true });
  const verboseCode = `
/**
 * Verbose documentation block comment.
 * Line 2 of comment.
 */
export function calculateTotal(items: number[]) {
  // Inline comment explaining iteration
  let total = 0;


  for (const item of items) {
    total += item;
  }

  return total;
}
`;
  await writeFile(join(root, "src", "calculator.ts"), verboseCode);

  const normalResult = await prepareContext({
    root,
    task: "calculateTotal iteration",
    budget: 3_000,
    compact: false,
  });

  const compactResult = await prepareContext({
    root,
    task: "calculateTotal iteration",
    budget: 3_000,
    compact: true,
  });

  assert.ok(
    compactResult.usage.estimatedWithContextPilotTokens <
      normalResult.usage.estimatedWithContextPilotTokens,
  );
  assert.ok(compactResult.usage.compressionTokensSaved > 0);
  const compactMarkdown = await readFile(compactResult.outputPath, "utf8");
  assert.ok(compactMarkdown.includes("calculateTotal(items: number[])"));
});
