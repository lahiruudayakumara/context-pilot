import type { SkillDefinition } from "./types.js";
import { codingArchitectureSkills } from "./definitions/coding-architecture.js";
import { webFrontendSkills } from "./definitions/web-frontend.js";
import { backendServicesSkills } from "./definitions/backend-services.js";
import { databaseStorageSkills } from "./definitions/database-storage.js";
import { securityAuthSkills } from "./definitions/security-auth.js";
import { testingQASkills } from "./definitions/testing-qa.js";
import { devopsCloudSkills } from "./definitions/devops-cloud.js";
import { performanceOptimizationSkills } from "./definitions/performance-optimization.js";
import { documentationI18nSkills } from "./definitions/documentation-i18n.js";
import { seniorArchitectureSkills } from "./definitions/senior-architecture.js";
import { distributedResilienceSkills } from "./definitions/distributed-resilience.js";
import { advancedDataSkills } from "./definitions/advanced-data.js";
import { aiMlEngineeringSkills } from "./definitions/ai-ml-engineering.js";

export const ALL_SKILL_DEFINITIONS: SkillDefinition[] = [
  ...codingArchitectureSkills,
  ...webFrontendSkills,
  ...backendServicesSkills,
  ...databaseStorageSkills,
  ...securityAuthSkills,
  ...testingQASkills,
  ...devopsCloudSkills,
  ...performanceOptimizationSkills,
  ...documentationI18nSkills,
  ...seniorArchitectureSkills,
  ...distributedResilienceSkills,
  ...advancedDataSkills,
  ...aiMlEngineeringSkills,
];

export const SKILL_ALIASES: Record<string, string> = {
  test: "unit-testing",
  security: "security-audit",
  docs: "documentation-docs",
  docker: "devops-docker",
  api: "backend-api",
  db: "database-sql",
  react: "react-nextjs",
  auth: "authentication-oauth",
  ddd: "domain-driven-design",
  cqrs: "cqrs-event-sourcing",
  hexagonal: "hexagonal-architecture",
  rag: "rag-architecture",
  llm: "llm-integration",
  vector: "vector-database",
  cdc: "cdc-change-data-capture",
  sharding: "database-sharding",
  adr: "architecture-decision-records",
  jsdoc: "jsdoc-typedoc",
  typedoc: "jsdoc-typedoc",
  mermaid: "mermaid-diagrams",
  diagrams: "mermaid-diagrams",
  changelog: "changelog-release-notes",
  tutorials: "user-guides-tutorials",
  guides: "user-guides-tutorials",
  "sdk-docs": "sdk-api-reference",
};

export const SKILL_PRESETS: Record<string, SkillDefinition> = ALL_SKILL_DEFINITIONS.reduce(
  (acc, skill) => {
    acc[skill.name] = skill;
    return acc;
  },
  {} as Record<string, SkillDefinition>,
);

for (const [alias, target] of Object.entries(SKILL_ALIASES)) {
  const targetDef = SKILL_PRESETS[target];
  if (targetDef) {
    SKILL_PRESETS[alias] = targetDef;
  }
}

export const AVAILABLE_SKILL_NAMES = ALL_SKILL_DEFINITIONS.map((skill) => skill.name);

export function getSkillDefinition(name: string): SkillDefinition | undefined {
  const normalized = name.trim().toLowerCase();
  const targetName = SKILL_ALIASES[normalized] ?? normalized;
  return SKILL_PRESETS[targetName];
}

export function detectSkills(task: string): string[] {
  const words = task.toLowerCase().split(/[^a-z0-9]+/);
  const detected = new Set<string>();

  for (const skill of ALL_SKILL_DEFINITIONS) {
    if (skill.keywords.some((keyword) => words.includes(keyword))) {
      detected.add(skill.name);
    }
  }

  return Array.from(detected);
}

export function getSkillsByCategory(): Record<string, SkillDefinition[]> {
  const categories: Record<string, SkillDefinition[]> = {};
  for (const skill of ALL_SKILL_DEFINITIONS) {
    if (!categories[skill.category]) {
      categories[skill.category] = [];
    }
    categories[skill.category]?.push(skill);
  }
  return categories;
}
