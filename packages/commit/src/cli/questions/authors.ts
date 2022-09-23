/**
 * @file Prompt object to ask for the author(s) of the commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { PromptObject } from 'prompts';
import { AuthorsValidator } from '../../lib/message/validators/AuthorsValidator';

export const authorsQuestion: PromptObject = {
  type: 'list',
  name: 'authors',
  message: 'Co-Authors',

  /**
   * Validate the input.
   *
   * @param value - The input value.
   * @returns Boolean indicating if the input is valid.
   * @example authorsQuestion.validate(value)
   */
  validate: (value: string) => new AuthorsValidator(value).valid,

  /**
   * Formatter for the entered value.
   *
   * @param value - The input value.
   * @returns The formatted and parsed value.
   * @example authorsQuestion.format(value)
   */
  format: (value: string[]) => new AuthorsValidator(value.join()).parsed,
};
