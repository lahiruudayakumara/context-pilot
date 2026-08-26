import type { SkillDefinition } from "../types.js";

export const documentationI18nSkills: SkillDefinition[] = [
  {
    name: "docs",
    label: "Documentation & Technical Writing",
    category: "Docs & Specifications",
    description: "Write clear, precise, and up-to-date technical documentation, READMEs, and API guides.",
    keywords: ["doc", "docs", "readme", "comment", "guide", "changelog", "explain", "markdown"],
    guidelines: [
      "Use clear, concise, Markdown-formatted prose.",
      "Provide practical code snippets and CLI usage examples.",
      "Keep docs in sync with actual exported types and signatures.",
    ],
    executionSteps: [
      "Review target feature or API for accurate detail.",
      "Draft concise documentation sections with examples.",
      "Verify links, code examples, and command formatting.",
    ],
    verificationRules: [
      "Check doc formatting and link/code correctness.",
    ],
  },
  {
    name: "api-spec-openapi",
    label: "OpenAPI / Swagger Specifications",
    category: "Docs & Specifications",
    description: "Generate and maintain OpenAPI 3.0 / Swagger API specification documents and schemas.",
    keywords: ["openapi", "swagger", "api-spec", "json-schema", "postman"],
    guidelines: [
      "Define explicit schema models for request bodies and responses.",
      "Include detailed description and example fields for endpoints.",
    ],
    executionSteps: [
      "Draft OpenAPI 3.0 YAML or JSON specification.",
      "Annotate API parameters, request schemas, and HTTP response codes.",
      "Validate specification using OpenAPI linter.",
    ],
    verificationRules: [
      "Verify OpenAPI document passes validation checks.",
    ],
  },
  {
    name: "i18n-localization",
    label: "Internationalization (i18n) & Localization",
    category: "Docs & Specifications",
    description: "Implement multi-language i18n translation keys, locale formatting, and RTL support.",
    keywords: ["i18n", "l10n", "translation", "locale", "internationalization", "localization", "rtl"],
    guidelines: [
      "Never hardcode user-facing strings directly in components or logic.",
      "Use ICU message syntax for plurals and interpolation.",
    ],
    executionSteps: [
      "Extract hardcoded strings into structured locale JSON files.",
      "Implement translation key lookup wrappers.",
      "Add date, currency, and number locale formatters.",
    ],
    verificationRules: [
      "Verify missing key fallbacks and locale rendering correctness.",
    ],
  },
  {
    name: "architecture-decision-records",
    label: "Architecture Decision Records (ADR)",
    category: "Docs & Specifications",
    description: "Document software architecture choices using structured ADR files recording context, decisions, and consequences.",
    keywords: ["adr", "architecture-decision", "decision-record", "decision-log", "consequences"],
    guidelines: [
      "Record architectural context, options considered, decision outcome, and positive/negative consequences.",
      "Keep ADRs immutable once accepted; create a new ADR for decision updates.",
    ],
    executionSteps: [
      "Create ADR template with Status, Context, Decision, and Consequences sections.",
      "Draft clear problem statement and trade-off comparisons.",
      "Link related ADRs and document system impact.",
    ],
    verificationRules: [
      "Verify Markdown ADR structure and trade-off completeness.",
    ],
  },
  {
    name: "jsdoc-typedoc",
    label: "JSDoc & TSDoc Code Documentation",
    category: "Docs & Specifications",
    description: "Annotate source code with comprehensive JSDoc/TSDoc comments, `@param`, `@returns`, `@throws`, and `@example` tags.",
    keywords: ["jsdoc", "typedoc", "tsdoc", "comment", "param", "returns", "annotation"],
    guidelines: [
      "Document all exported types, interfaces, classes, and public functions.",
      "Include `@example` usage snippets for complex API functions.",
    ],
    executionSteps: [
      "Review exported symbols and add block JSDoc/TSDoc comments.",
      "Specify `@param` descriptions and return types.",
      "Add TypeDoc generation script check.",
    ],
    verificationRules: [
      "Verify TSDoc comment compilation and API generator rendering.",
    ],
  },
  {
    name: "mermaid-diagrams",
    label: "Mermaid Architecture Diagrams",
    category: "Docs & Specifications",
    description: "Create interactive sequence diagrams, flowcharts, ER diagrams, and state diagrams using Mermaid Markdown blocks.",
    keywords: ["mermaid", "diagram", "sequence-diagram", "flowchart", "er-diagram", "visualize"],
    guidelines: [
      "Use clean Mermaid block syntax with clear node aliases.",
      "Enclose labels with special characters in quotes.",
    ],
    executionSteps: [
      "Design component interaction or flow sequence.",
      "Write Mermaid syntax fenced code blocks (` ```mermaid `).",
      "Verify visual rendering of diagrams.",
    ],
    verificationRules: [
      "Verify Mermaid syntax validity and node connectivity.",
    ],
  },
  {
    name: "changelog-release-notes",
    label: "Changelogs & Release Notes",
    category: "Docs & Specifications",
    description: "Maintain Keep-a-Changelog release documents, Semantic Versioning tags, breaking change notes, and migration steps.",
    keywords: ["changelog", "release-notes", "semver", "version", "breaking-change", "migration-guide"],
    guidelines: [
      "Categorize changes under Added, Changed, Deprecated, Removed, Fixed, and Security headers.",
      "Highlight breaking changes prominently with migration instructions.",
    ],
    executionSteps: [
      "Review git commits and PR summaries since last release.",
      "Draft structured CHANGELOG entry adhering to Keep a Changelog standard.",
      "Add explicit migration steps for any breaking API changes.",
    ],
    verificationRules: [
      "Verify CHANGELOG formatting and version tag alignment.",
    ],
  },
  {
    name: "user-guides-tutorials",
    label: "Developer Guides & Tutorials",
    category: "Docs & Specifications",
    description: "Write step-by-step developer onboarding guides, getting started tutorials, and troubleshooting FAQs.",
    keywords: ["tutorial", "guide", "onboarding", "getting-started", "faq", "walkthrough"],
    guidelines: [
      "Provide copy-pasteable shell commands and code blocks.",
      "Include prerequisite dependencies and expected outputs.",
    ],
    executionSteps: [
      "Outline user journey from installation to feature execution.",
      "Draft step-by-step instructions with code blocks.",
      "Add common error resolution FAQ section.",
    ],
    verificationRules: [
      "Verify code example execution from a clean environment.",
    ],
  },
  {
    name: "sdk-api-reference",
    label: "SDK & Library API Reference",
    category: "Docs & Specifications",
    description: "Author complete SDK API reference manuals detailing class methods, parameters, return types, and code snippets.",
    keywords: ["sdk", "sdk-docs", "api-reference", "library-docs", "manual"],
    guidelines: [
      "List all public methods with full type signatures and default parameter values.",
      "Provide runnable code snippets for each major API method.",
    ],
    executionSteps: [
      "Catalog all client SDK entrypoints and helper methods.",
      "Write comprehensive parameter tables and code examples.",
      "Document error codes and exception types.",
    ],
    verificationRules: [
      "Verify SDK method signature accuracy and code snippet validity.",
    ],
  },
];
