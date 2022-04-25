import type { PromptObject } from 'prompts';
import { SubjectValidator } from '../../lib/message/validators/SubjectValidator';

export const subjectQuestion: PromptObject = {
  type: 'text',
  name: 'subject',
  message: 'Subject',
  validate: (value: string) => new SubjectValidator(value).valid,
  format: (value: string) => new SubjectValidator(value).parsed,
};
