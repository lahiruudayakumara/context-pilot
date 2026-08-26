import type { SkillDefinition } from "../types.js";

export const seniorArchitectureSkills: SkillDefinition[] = [
  {
    name: "domain-driven-design",
    label: "Domain-Driven Design (DDD)",
    category: "Senior Architecture",
    description: "Architect complex software systems using Bounded Contexts, Aggregates, Entities, Value Objects, and Ubiquitous Language.",
    keywords: ["ddd", "domain-driven", "bounded-context", "aggregate", "entity", "value-object", "domain-event", "ubiquitous-language"],
    guidelines: [
      "Define explicit Bounded Contexts to insulate domain models from external boundaries.",
      "Encapsulate state mutations within Aggregate Roots to guarantee transactional consistency.",
      "Represent immutable domain state using Value Objects without identity.",
    ],
    executionSteps: [
      "Map out domain model boundaries, aggregates, and value objects.",
      "Design domain event publishers for cross-aggregate notifications.",
      "Decouple domain logic completely from database persistence framework models.",
    ],
    verificationRules: [
      "Verify domain entities compile with zero framework or database dependencies.",
    ],
  },
  {
    name: "cqrs-event-sourcing",
    label: "CQRS & Event Sourcing Architecture",
    category: "Senior Architecture",
    description: "Separate Command and Query responsibility models, store state as immutable event streams, and project read models.",
    keywords: ["cqrs", "event-sourcing", "command", "query", "projection", "event-store", "read-model", "replay"],
    guidelines: [
      "Strictly isolate read query models from write command validation state.",
      "Treat stored domain events as the single source of truth.",
      "Ensure asynchronous projection handlers process events idempotently.",
    ],
    executionSteps: [
      "Define command DTOs and command handler validation logic.",
      "Implement event store append handlers and domain event publishing.",
      "Build optimized read model projections for fast UI query lookups.",
    ],
    verificationRules: [
      "Verify event store append operations and deterministic event replay projections.",
    ],
  },
  {
    name: "hexagonal-architecture",
    label: "Hexagonal Architecture (Ports & Adapters)",
    category: "Senior Architecture",
    description: "Isolate core domain logic behind input/output Ports and implement infrastructure Adapters.",
    keywords: ["hexagonal", "ports-and-adapters", "clean-architecture", "onion", "decoupled", "adapter", "port"],
    guidelines: [
      "Depend on abstraction ports rather than concrete infrastructure implementations.",
      "Keep core application services free of HTTP or database dependencies.",
    ],
    executionSteps: [
      "Define driving (inbound) and driven (outbound) TypeScript port interfaces.",
      "Implement core application domain services implementing inbound ports.",
      "Write infrastructure adapters (REST controllers, ORM repositories) bound to outbound ports.",
    ],
    verificationRules: [
      "Verify core application services pass tests using in-memory port stubs.",
    ],
  },
  {
    name: "tech-debt-remediation",
    label: "Technical Debt Remediation & Strategy",
    category: "Senior Architecture",
    description: "Quantify, prioritize, and systematically refactor technical debt while keeping delivery velocity high.",
    keywords: ["tech-debt", "technical-debt", "remediation", "legacy", "code-smell", "debt", "modernize"],
    guidelines: [
      "Quantify architectural risk and maintenance overhead for target debt areas.",
      "Refactor incrementally alongside active feature development rather than massive rewrites.",
    ],
    executionSteps: [
      "Audit high-churn, low-coverage modules for anti-patterns.",
      "Establish automated safety nets with unit and integration coverage.",
      "Execute targeted refactoring passes to simplify complexity.",
    ],
    verificationRules: [
      "Verify cyclomatic complexity reduction and zero regression in test suites.",
    ],
  },
  {
    name: "legacy-modernization",
    label: "Legacy System Modernization (Strangler Fig)",
    category: "Senior Architecture",
    description: "Incrementally replace legacy monolithic systems using the Strangler Fig pattern and modular migration routes.",
    keywords: ["strangler", "strangler-fig", "modernization", "monolith-to-microservices", "legacy-migration", "interception"],
    guidelines: [
      "Intercept legacy route calls at the API gateway layer.",
      "Migrate single services or domains incrementally while legacy system runs parallel.",
    ],
    executionSteps: [
      "Deploy API gateway or routing proxy to intercept incoming traffic.",
      "Implement modern service handler for the target sub-domain.",
      "Shift traffic incrementally (1% -> 10% -> 100%) and deprecate legacy paths.",
    ],
    verificationRules: [
      "Verify routing proxy dispatch and data consistency between legacy and modern services.",
    ],
  },
];
