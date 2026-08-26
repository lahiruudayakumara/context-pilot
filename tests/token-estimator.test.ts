import assert from "node:assert/strict";
import test from "node:test";
import {
  analyzeTokenBudget,
  calculateTokenReduction,
} from "../packages/token-estimator/src/index.js";

test("reports remaining token budget and pressure status", () => {
  assert.deepEqual(analyzeTokenBudget(750, 1_000), {
    budget: 1_000,
    estimatedTokens: 750,
    remainingTokens: 250,
    overBudgetTokens: 0,
    utilizationPercent: 75,
    status: "comfortable",
  });
  assert.equal(analyzeTokenBudget(900, 1_000).status, "near-limit");
  assert.equal(analyzeTokenBudget(1_000, 1_000).status, "at-limit");
  assert.equal(analyzeTokenBudget(1_050, 1_000).overBudgetTokens, 50);
});

test("calculates deterministic reduction without negative savings", () => {
  assert.deepEqual(calculateTokenReduction(1_000, 400), {
    beforeTokens: 1_000,
    afterTokens: 400,
    savedTokens: 600,
    reductionPercent: 60,
  });
  assert.equal(calculateTokenReduction(100, 120).savedTokens, 0);
  assert.equal(calculateTokenReduction(0, 0).reductionPercent, 0);
});
