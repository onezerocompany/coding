import type { PromptObject } from 'prompts';
import { AuthorsValidator } from '../../lib/message/validators/AuthorsValidator';

export const authorsQuestion: PromptObject = {
  type: 'list',
  name: 'authors',
  message: 'Co-Authors',
  validate: (value: string) => new AuthorsValidator(value).valid,
  format: (value: string[]) => new AuthorsValidator(value.join()).parsed,
};
