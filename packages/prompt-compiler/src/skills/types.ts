export interface SkillDefinition {
  name: string;
  label: string;
  category: string;
  description: string;
  keywords: string[];
  guidelines: string[];
  executionSteps: string[];
  verificationRules: string[];
}

export interface ConvertPromptOptions {
  task: string;
  skills?: string[] | undefined;
  customInstructions?: string | undefined;
  autoDetect?: boolean | undefined;
}

export interface ConvertPromptResult {
  originalTask: string;
  convertedTask: string;
  appliedSkills: string[];
  skillGuidelines: string[];
  executionSteps: string[];
  verificationRules: string[];
}
