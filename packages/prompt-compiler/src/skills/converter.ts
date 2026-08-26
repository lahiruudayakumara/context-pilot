import type { ConvertPromptOptions, ConvertPromptResult, SkillDefinition } from "./types.js";
import { SKILL_PRESETS, detectSkills } from "./registry.js";

export function convertPrompt(options: ConvertPromptOptions): ConvertPromptResult {
  const originalTask = options.task.trim();
  const requestedSkills = options.skills ?? [];
  const selectedSkillsSet = new Set<string>();

  for (const rawSkill of requestedSkills) {
    for (const part of rawSkill.split(",")) {
      const trimmed = part.trim().toLowerCase();
      if (trimmed === "auto") {
        detectSkills(originalTask).forEach((skill) => selectedSkillsSet.add(skill));
      } else if (SKILL_PRESETS[trimmed]) {
        selectedSkillsSet.add(SKILL_PRESETS[trimmed].name);
      }
    }
  }

  if (selectedSkillsSet.size === 0 && options.autoDetect !== false) {
    detectSkills(originalTask).forEach((skill) => selectedSkillsSet.add(skill));
  }

  const appliedSkills = Array.from(selectedSkillsSet);
  const skillDefs = appliedSkills
    .map((name) => SKILL_PRESETS[name])
    .filter((def): def is SkillDefinition => Boolean(def));

  const skillGuidelines = Array.from(
    new Set(skillDefs.flatMap((def) => def.guidelines)),
  );
  const executionSteps = Array.from(
    new Set(skillDefs.flatMap((def) => def.executionSteps)),
  );
  const verificationRules = Array.from(
    new Set(skillDefs.flatMap((def) => def.verificationRules)),
  );

  const lines: string[] = [
    `# Enhanced Task: ${originalTask}`,
    "",
    "## Objective",
    originalTask,
  ];

  if (appliedSkills.length > 0) {
    lines.push(
      "",
      "## Applied Skills",
      ...appliedSkills.map((skill) => `- **${SKILL_PRESETS[skill]?.label ?? skill}** (${SKILL_PRESETS[skill]?.category ?? "General"})`),
    );
  }

  if (skillGuidelines.length > 0) {
    lines.push("", "## Skill Guidelines & Constraints", ...skillGuidelines.map((g) => `- ${g}`));
  }

  if (executionSteps.length > 0) {
    lines.push("", "## Execution Strategy", ...executionSteps.map((step, idx) => `${idx + 1}. ${step}`));
  }

  if (verificationRules.length > 0) {
    lines.push("", "## Verification Criteria", ...verificationRules.map((v) => `- ${v}`));
  }

  if (options.customInstructions && options.customInstructions.trim()) {
    lines.push("", "## Additional Instructions", options.customInstructions.trim());
  }

  const convertedTask = lines.join("\n");

  return {
    originalTask,
    convertedTask,
    appliedSkills,
    skillGuidelines,
    executionSteps,
    verificationRules,
  };
}
