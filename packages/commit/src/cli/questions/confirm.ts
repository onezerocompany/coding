import type { PromptObject } from 'prompts';

export const confirmQuestion: PromptObject = {
  type: 'toggle',
  name: 'commit',
  message: 'Do you want to commit the above?',
  active: 'yes',
  inactive: 'no',
};
