/**
 * @file Prompt object to ask if the commit is a breaking change.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { PromptObject } from 'prompts';

export const breakingQuestion: PromptObject = {
  type: 'toggle',
  name: 'breaking',
  message: 'Breaking change?',
  active: 'yes',
  inactive: 'no',
};
