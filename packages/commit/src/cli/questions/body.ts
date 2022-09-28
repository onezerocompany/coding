/**
 * @file Prompt object to ask if the user wants to add a body to the commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { PromptObject } from 'prompts';
import { promptBody } from '../../lib/utils/promptBody';

let previousBody: string | null = null;
let previousRawBody: string | null = null;
let breaking = false;

/** Prompt object to ask if the user wants to add a body to the commit. */
export const bodyQuestion: PromptObject = {
  /**
   * The type of prompt.
   *
   * @param prev - The previous answer.
   * @returns The type of prompt.
   * @example bodyQuestion.type(prev)
   */
  type: 'text',

  validate(value: string): boolean | string {
    const yes = ['y', 'yes', 'true'].includes(value.toLowerCase()) || breaking;

    if (yes) {
      const result = promptBody(previousRawBody);
      previousBody = result.parsed as string;
      previousRawBody = result.content;
      return result.valid;
    }
    return true;
  },

  format(value: string): string {
    const yes = ['y', 'yes', 'true'].includes(value.toLowerCase()) || breaking;
    if (yes) return previousBody ?? value;
    return '';
  },

  name: 'messageBody',
  message: 'Add body? [y/n]',

  initial(_, answers: Record<string, unknown>): string {
    breaking = answers['breaking'] === true;
    if (breaking) return 'yes';
    return 'no';
  },
};
