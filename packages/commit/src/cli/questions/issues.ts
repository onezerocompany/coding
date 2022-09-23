/**
 * @file Prompt object to ask for issues related to the commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { PromptObject } from 'prompts';
import { IssuesValidator } from '../../lib/message/validators/IssuesValidator';

export const issuesQuestion: PromptObject = {
  type: 'list',
  name: 'issues',
  message: 'Issues',
  /**
   * Validator for the issues prompt.
   *
   * @param value - Value to validate.
   * @returns Whether the value is valid or not.
   * @example
   *   const isValid = issuesQuestion.validate('123');
   */
  validate: (value: string) => new IssuesValidator(value).valid,
  /**
   * Formatter for the issues prompt.
   *
   * @param value - Value to format.
   * @returns Formatted value.
   * @example
   *   const formatted = issuesQuestion.format('123');
   */
  format: (value: string[]) => new IssuesValidator(value.join()).parsed,
  instructions: 'Enter one issue per line',
};
