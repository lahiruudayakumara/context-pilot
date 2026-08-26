import assert from "node:assert/strict";
import test from "node:test";
import { compareVersions, parseArguments } from "../apps/cli/src/index.js";

test("parses update command options", () => {
  const parsed = parseArguments(["update", "--check", "--package-manager", "pnpm"]);
  assert.equal(parsed.command, "update");
  assert.equal(parsed.flags.get("check"), true);
  assert.equal(parsed.flags.get("package-manager"), "pnpm");
});

test("compares stable and prerelease versions", () => {
  assert.equal(compareVersions("0.1.0", "0.2.0"), -1);
  assert.equal(compareVersions("1.0.0", "1.0.0"), 0);
  assert.equal(compareVersions("2.0.0", "1.9.9"), 1);
  assert.equal(compareVersions("1.0.0-beta.1", "1.0.0"), -1);
  assert.equal(compareVersions("1.0.0-beta.10", "1.0.0-beta.2"), 1);
});
