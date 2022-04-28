import type { PromptObject } from 'prompts';
import { IssuesValidator } from '../../lib/message/validators/IssuesValidator';

export const issuesQuestion: PromptObject = {
  type: 'list',
  name: 'issues',
  message: 'Issues',
  validate: (value: string) => new IssuesValidator(value).valid,
  format: (value: string[]) => new IssuesValidator(value.join()).parsed,
  instructions: 'Enter one issue per line',
};
