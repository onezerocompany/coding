import type { PromptObject } from 'prompts';

export const bodyQuestion: PromptObject = {
  type: (prev: boolean) => (prev ? null : 'toggle'),
  name: 'addBody',
  message: 'Add body?',
  active: 'yes',
  inactive: 'no',
};
