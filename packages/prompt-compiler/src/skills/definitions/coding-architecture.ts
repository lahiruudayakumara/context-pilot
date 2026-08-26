import type { SkillDefinition } from "../types.js";

export const codingArchitectureSkills: SkillDefinition[] = [
  {
    name: "bugfix",
    label: "Bug Fixing & Troubleshooting",
    category: "Coding & Architecture",
    description: "Diagnose root causes, resolve defects, and prevent regression bugs.",
    keywords: ["bug", "fix", "error", "fail", "issue", "crash", "defect", "patch", "repair", "exception"],
    guidelines: [
      "Isolate the root cause before attempting code mutations.",
      "Minimize side effects to surrounding working code.",
      "Ensure existing API contracts and public interfaces remain unbroken.",
    ],
    executionSteps: [
      "Reproduce and identify the precise failure trigger.",
      "Trace execution flow and state transformations upstream.",
      "Apply targeted fix for the underlying fault.",
      "Add or update regression tests verifying the fix.",
    ],
    verificationRules: [
      "Verify that the reproduction scenario passes cleanly.",
      "Run existing test suite to ensure no regression was introduced.",
    ],
  },
  {
    name: "refactor",
    label: "Code Refactoring & Cleanup",
    category: "Coding & Architecture",
    description: "Improve code structure, readability, and maintainability without altering runtime behavior.",
    keywords: ["refactor", "clean", "simplify", "restructure", "reorganize", "decouple", "extract", "deduplicate"],
    guidelines: [
      "Strictly preserve current functional behavior and return types.",
      "Reduce cyclomatic complexity and duplicate logic.",
      "Maintain modular separation of concerns.",
    ],
    executionSteps: [
      "Identify target code anti-patterns and candidate abstractions.",
      "Extract helper modules or refactor internal functions incrementally.",
      "Keep method signatures backward compatible where applicable.",
    ],
    verificationRules: [
      "Verify all pre-existing tests continue to pass without modifications to test logic.",
    ],
  },
  {
    name: "clean-code",
    label: "Clean Code & Quality Standards",
    category: "Coding & Architecture",
    description: "Apply clean code principles, meaningful naming, small functions, and clear separation.",
    keywords: ["clean", "naming", "readable", "maintainable", "quality", "lint", "formatting", "standards"],
    guidelines: [
      "Use clear, descriptive, intention-revealing names.",
      "Keep functions short and single-purpose.",
      "Eliminate dead code and unneeded comments.",
    ],
    executionSteps: [
      "Review symbol naming and function length.",
      "Simplify nested conditional branches.",
      "Format code according to project linter rules.",
    ],
    verificationRules: [
      "Ensure static analysis and linter checks pass with zero warnings.",
    ],
  },
  {
    name: "architecture",
    label: "Architecture & System Design",
    category: "Coding & Architecture",
    description: "Evaluate system boundaries, component coupling, dependency flow, and structural design.",
    keywords: ["architecture", "design", "structure", "module", "system", "boundary", "decouple", "pattern"],
    guidelines: [
      "Maintain clear package and layer boundaries.",
      "Prefer explicit data flow over hidden global state.",
      "Document architectural decisions and trade-offs.",
    ],
    executionSteps: [
      "Map out component relationships and dependency graphs.",
      "Design clean abstract interfaces and contract definitions.",
      "Formulate modular migration or integration plans.",
    ],
    verificationRules: [
      "Verify structural coherence and clean separation of concerns.",
    ],
  },
  {
    name: "design-patterns",
    label: "Design Patterns & Abstractions",
    category: "Coding & Architecture",
    description: "Implement proven design patterns (Factory, Strategy, Observer, Repository, Adapter).",
    keywords: ["pattern", "factory", "strategy", "observer", "repository", "adapter", "singleton", "builder"],
    guidelines: [
      "Select design patterns that solve concrete complexity without over-engineering.",
      "Maintain clean interface abstractions.",
    ],
    executionSteps: [
      "Define abstract interfaces for key behavioral contracts.",
      "Implement concrete pattern providers or factories.",
      "Wire dependency injection or creation registries.",
    ],
    verificationRules: [
      "Verify pattern contracts using unit test suites.",
    ],
  },
  {
    name: "code-review",
    label: "Code Review & Quality Audit",
    category: "Coding & Architecture",
    description: "Conduct thorough code reviews checking correctness, performance, security, and standards.",
    keywords: ["review", "pr", "pull-request", "audit", "diff", "inspection", "quality-gate"],
    guidelines: [
      "Check functional correctness, edge case handling, and error states.",
      "Inspect test coverage and potential breaking changes.",
    ],
    executionSteps: [
      "Analyze Git diff and modified symbols.",
      "Highlight potential bugs, edge-case flaws, or performance risks.",
      "Provide constructive, actionable feedback and structural suggestions.",
    ],
    verificationRules: [
      "Confirm all reviewer checklist criteria are satisfied.",
    ],
  },
];
