import type { PromptObject } from 'prompts';
import { promptBody } from '../../lib/utils/promptBody';

let previousBody: string | null = null;
let previousRawBody: string | null = null;
export const bodyEditor: PromptObject = {
  type: (_, answers: Record<string, boolean>) =>
    answers['addBody'] === true || answers['breaking'] === true ? 'text' : null,
  name: 'messageBody',
  message: 'Body',
  validate() {
    const result = promptBody(previousRawBody);
    previousBody = result.parsed as string;
    previousRawBody = result.content;
    return result.valid;
  },
  format: (value: string) => previousBody ?? value,
};
