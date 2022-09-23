/**
 * @file Prompt asking the user for the scope of the commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { parse } from 'path';
import type { PromptObject } from 'prompts';
import { ScopeValidator } from '../../lib/message/validators/ScopeValidator';

export const scopeQuestion: PromptObject = {
  type: 'text',
  name: 'scope',
  message: 'Scope',
  hint: 'component or file, e.g. auth, billing, README',

  /**
   * Provides the initial value for the scope prompt.
   *
   * @param _ - Unused.
   * @param answers - Answers from previous prompts.
   * @returns Initial value for the scope prompt.
   * @example
   *   const initialValue = scopeQuestion.initial();
   */
  initial: (_, answers: Record<string, unknown>) =>
    // Remove extension from file name
    parse((answers['files'] as string[])[0] ?? '')
      .name.toLowerCase()
      .replaceAll(/[^a-z/-]/giu, ''),

  /**
   * Validator for the scope prompt.
   *
   * @param value - Value to validate.
   * @returns Whether the value is valid or not.
   * @example
   *   const isValid = scopeQuestion.validate('auth');
   */
  validate: (value: string) => new ScopeValidator(value).valid,

  /**
   * Formatter for the scope prompt.
   *
   * @param value - Value to format.
   * @returns Formatted value.
   * @example
   *   const formatted = scopeQuestion.format('auth');
   */
  format: (value: string) => new ScopeValidator(value).parsed,
};
