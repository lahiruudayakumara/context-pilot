import type { SkillDefinition } from "../types.js";

export const testingQASkills: SkillDefinition[] = [
  {
    name: "unit-testing",
    label: "Unit Testing & Assertion",
    category: "Testing & Quality",
    description: "Write fast, isolated unit tests checking individual functions, methods, and modules.",
    keywords: ["test", "unit", "spec", "jest", "vitest", "mocha", "assert", "coverage"],
    guidelines: [
      "Keep tests independent, fast, and deterministic.",
      "Assert precise expected outputs and error exceptions.",
    ],
    executionSteps: [
      "Identify target module functions and state paths.",
      "Construct explicit unit test cases for standard, boundary, and error scenarios.",
      "Run test runner and verify 100% test pass rate.",
    ],
    verificationRules: [
      "Execute unit test suite and confirm clean pass execution.",
    ],
  },
  {
    name: "integration-testing",
    label: "Integration Testing",
    category: "Testing & Quality",
    description: "Verify cross-module interactions, database queries, API endpoints, and service integrations.",
    keywords: ["integration", "supertest", "api-test", "db-test", "component-test"],
    guidelines: [
      "Use isolated test databases or containers for integration tests.",
      "Clean up test state after test suite execution.",
    ],
    executionSteps: [
      "Set up test environment and mock fixtures.",
      "Execute multi-component workflow calls.",
      "Assert final database or service state.",
    ],
    verificationRules: [
      "Confirm integration scenarios pass without leaving dirty state.",
    ],
  },
  {
    name: "e2e-testing",
    label: "End-to-End (E2E) Testing",
    category: "Testing & Quality",
    description: "Automate user flow testing using Playwright, Cypress, or Selenium.",
    keywords: ["e2e", "playwright", "cypress", "selenium", "browser-test", "user-flow"],
    guidelines: [
      "Use robust data-testid or semantic role selectors.",
      "Avoid artificial sleep waits; wait for explicit UI state triggers.",
    ],
    executionSteps: [
      "Define critical user journeys and test scripts.",
      "Implement Page Object Model (POM) or test fixture helpers.",
      "Execute headless browser tests.",
    ],
    verificationRules: [
      "Verify headless browser flow execution and screenshot/video artifacts on failure.",
    ],
  },
  {
    name: "mocking-stubbing",
    label: "Mocking, Stubbing & Test Spies",
    category: "Testing & Quality",
    description: "Stub network calls, mock third-party SDK dependencies, and inspect call spies.",
    keywords: ["mock", "stub", "spy", "nock", "sinon", "msw", "double"],
    guidelines: [
      "Avoid over-mocking internal implementation details.",
      "Reset mock states between tests.",
    ],
    executionSteps: [
      "Configure mock servers or dependency replacement stubs.",
      "Execute test scenario with controlled mock responses.",
      "Assert mock call parameters and call counts.",
    ],
    verificationRules: [
      "Verify test execution behavior with deterministic mock payloads.",
    ],
  },
];
