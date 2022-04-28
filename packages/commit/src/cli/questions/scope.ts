import { parse } from 'path';
import type { PromptObject } from 'prompts';
import { ScopeValidator } from '../../lib/message/validators/ScopeValidator';

export const scopeQuestion: PromptObject = {
  type: 'text',
  name: 'scope',
  message: 'Scope',
  initial: (_, answers: Record<string, unknown>) =>
    // remove extension from file name
    parse((answers['files'] as string[])[0] ?? '')
      .name.toLowerCase()
      .replaceAll(/[^a-z/-]/giu, ''),
  hint: 'component or file, e.g. auth, billing, README',
  validate: (value: string) => new ScopeValidator(value).valid,
  format: (value: string) => new ScopeValidator(value).parsed,
};
