export const PROVIDER_MODELS = {
  anthropic: [
    'Claude Opus 4.x',
    'Claude Sonnet 4.x',
    'Claude Haiku 4.x',
  ],
  openai: [
    'GPT 5.x',
    'GPT 5.x Codex',
    'GPT 5.x Fast',
    'GPT 5.x Mini',
  ],
  google: [
    'Gemini 3.x Pro Preview',
    'Gemini 3.x Flash',
    'Gemma 4',
    'Gemma 3',
  ],
} as const;

export type ProviderKey = keyof typeof PROVIDER_MODELS;

export type SamplePromptPreset = {
  id: string;
  title: string;
  summary: string;
  modelProvider: ProviderKey;
  modelName: string;
  goal: string;
  promptText: string;
};

export const SAMPLE_PROMPT_PRESETS: SamplePromptPreset[] = [];
