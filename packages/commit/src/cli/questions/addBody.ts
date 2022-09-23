/**
 * @file Prompt object to ask if the user wants to add a body to the commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { PromptObject } from 'prompts';

/** Prompt object to ask if the user wants to add a body to the commit. */
export const bodyQuestion: PromptObject = {
  /**
   * The type of prompt.
   *
   * @param prev - The previous answer.
   * @returns The type of prompt.
   * @example bodyQuestion.type(prev)
   */
  type: (prev: boolean) => (prev ? null : 'toggle'),

  name: 'addBody',
  message: 'Add body?',
  active: 'yes',
  inactive: 'no',
};
