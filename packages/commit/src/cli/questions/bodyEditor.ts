/**
 * @file Prompt object to open an editor to write the body of the commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { PromptObject } from 'prompts';
import { promptBody } from '../../lib/utils/promptBody';

let previousBody: string | null = null;
let previousRawBody: string | null = null;
export const bodyEditor: PromptObject = {
  name: 'messageBody',
  message: 'Body',
  /**
   * The type of prompt this is.
   *
   * @param _ - Unused.
   * @param answers - The answers from the previous prompts.
   * @returns The type of prompt.
   * @example bodyEditor.type(_, answers)
   */
  type: (_, answers: Record<string, boolean>) =>
    answers['addBody'] === true || answers['breaking'] === true ? 'text' : null,

  /**
   * Checks the validity of the entered body.
   *
   * @returns Whether the entered value is valid.
   * @example bodyEditor.validate()
   */
  validate() {
    const result = promptBody(previousRawBody);
    previousBody = result.parsed as string;
    previousRawBody = result.content;
    return result.valid;
  },
  /**
   * Formats the answer to the prompt.
   *
   * @param value - The answer to the prompt.
   * @returns The formatted answer.
   * @example bodyEditor.format(value);
   */
  format: (value: string) => previousBody ?? value,
};
