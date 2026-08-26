import assert from "node:assert/strict";
import test from "node:test";
import {
  convertPrompt,
  detectSkills,
  getSkillDefinition,
  getSkillsByCategory,
  AVAILABLE_SKILL_NAMES,
  ALL_SKILL_DEFINITIONS,
} from "../packages/core/src/index.js";

test("exposes large skill set (30+ skills)", () => {
  assert.ok(AVAILABLE_SKILL_NAMES.length >= 30);
  assert.ok(ALL_SKILL_DEFINITIONS.length >= 30);

  // Core Coding & Architecture
  assert.ok(AVAILABLE_SKILL_NAMES.includes("bugfix"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("refactor"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("clean-code"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("architecture"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("design-patterns"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("code-review"));

  // Web & Frontend
  assert.ok(AVAILABLE_SKILL_NAMES.includes("frontend-ui"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("react-nextjs"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("state-management"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("accessibility-a11y"));

  // Backend & Services
  assert.ok(AVAILABLE_SKILL_NAMES.includes("backend-api"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("rest-api"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("graphql-api"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("microservices"));

  // Databases
  assert.ok(AVAILABLE_SKILL_NAMES.includes("database-sql"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("orm-prisma"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("caching-redis"));

  // Security & DevOps
  assert.ok(AVAILABLE_SKILL_NAMES.includes("security-audit"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("authentication-oauth"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("devops-docker"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("ci-cd-pipeline"));

  // Senior Architecture & AI/ML
  assert.ok(AVAILABLE_SKILL_NAMES.includes("domain-driven-design"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("cqrs-event-sourcing"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("hexagonal-architecture"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("circuit-breaker"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("rag-architecture"));
  assert.ok(AVAILABLE_SKILL_NAMES.includes("llm-integration"));
});

test("groups skills by domain category", () => {
  const categories = getSkillsByCategory();
  assert.ok(categories["Coding & Architecture"]?.length);
  assert.ok(categories["Web & Frontend"]?.length);
  assert.ok(categories["Backend & Services"]?.length);
  assert.ok(categories["Databases & Storage"]?.length);
  assert.ok(categories["Security & Auth"]?.length);
  assert.ok(categories["Testing & Quality"]?.length);
  assert.ok(categories["DevOps & Cloud"]?.length);
  assert.ok(categories["Performance & Async"]?.length);
  assert.ok(categories["Docs & Specifications"]?.length);
  assert.ok(categories["Senior Architecture"]?.length);
  assert.ok(categories["Distributed Systems"]?.length);
  assert.ok(categories["Advanced Data Engineering"]?.length);
  assert.ok(categories["AI & ML Engineering"]?.length);
});

test("resolves senior and documentation shorthand aliases", () => {
  const ddd = getSkillDefinition("ddd");
  assert.equal(ddd?.name, "domain-driven-design");

  const cqrs = getSkillDefinition("cqrs");
  assert.equal(cqrs?.name, "cqrs-event-sourcing");

  const rag = getSkillDefinition("rag");
  assert.equal(rag?.name, "rag-architecture");

  const llm = getSkillDefinition("llm");
  assert.equal(llm?.name, "llm-integration");

  const adr = getSkillDefinition("adr");
  assert.equal(adr?.name, "architecture-decision-records");

  const mermaid = getSkillDefinition("mermaid");
  assert.equal(mermaid?.name, "mermaid-diagrams");

  const jsdoc = getSkillDefinition("jsdoc");
  assert.equal(jsdoc?.name, "jsdoc-typedoc");

  const changelog = getSkillDefinition("changelog");
  assert.equal(changelog?.name, "changelog-release-notes");
});

test("auto detects domain skills from task prompt keywords", () => {
  const detected = detectSkills("Implement OAuth2 login with React hooks and Redis caching");
  assert.ok(detected.includes("authentication-oauth") || detected.includes("react-nextjs") || detected.includes("caching-redis"));
});

test("converts raw task prompt into structured prompt using domain skills", () => {
  const conversion = convertPrompt({
    task: "Build Docker container for NestJS microservice with PostgreSQL database migration",
    skills: ["devops-docker", "microservices", "database-migration"],
  });

  assert.equal(conversion.originalTask, "Build Docker container for NestJS microservice with PostgreSQL database migration");
  assert.deepEqual(conversion.appliedSkills, ["devops-docker", "microservices", "database-migration"]);
  assert.match(conversion.convertedTask, /## Objective/);
  assert.match(conversion.convertedTask, /Docker Containerization & Compose/);
  assert.match(conversion.convertedTask, /Microservices Architecture/);
  assert.match(conversion.convertedTask, /Database Migration Management/);
});

test("converts prompt using senior architecture skill aliases", () => {
  const conversion = convertPrompt({
    task: "Refactor core billing module to separate command validation from query projections",
    skills: ["ddd", "cqrs"],
  });

  assert.ok(conversion.appliedSkills.includes("domain-driven-design"));
  assert.ok(conversion.appliedSkills.includes("cqrs-event-sourcing"));
  assert.match(conversion.convertedTask, /Domain-Driven Design/);
  assert.match(conversion.convertedTask, /CQRS & Event Sourcing Architecture/);
});

test("handles auto skill option in convertPrompt with expanded catalog", () => {
  const conversion = convertPrompt({
    task: "Fix GraphQL mutation error during user authentication",
    skills: ["auto"],
  });

  assert.ok(conversion.appliedSkills.length > 0);
  assert.match(conversion.convertedTask, /## Applied Skills/);
});
