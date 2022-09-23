/**
 * @file Prompt object to ask for confirmation of the commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { PromptObject } from 'prompts';

export const confirmQuestion: PromptObject = {
  type: 'toggle',
  name: 'commit',
  message: 'Do you want to commit the above?',
  active: 'yes',
  inactive: 'no',
};
