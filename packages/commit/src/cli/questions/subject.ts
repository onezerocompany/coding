/**
 * @file Prompt asking the user for the subject of the commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { PromptObject } from 'prompts';
import { categoryForTag } from '../../lib/categories/categories';
import { SubjectValidator } from '../../lib/message/validators/SubjectValidator';

let maxLength = 0;
export const subjectQuestion: PromptObject = {
  type: 'text',
  name: 'subject',
  message: 'Subject',

  /**
   * Provides the initial value for the subject prompt.
   *
   * @param _ - Unused.
   * @param answers - Answers from previous prompts.
   * @returns Initial value for the subject prompt.
   * @example
   *   const initialValue = subjectQuestion.initial();
   */
  initial(_, answers: Record<string, unknown>) {
    const { category } = answers;
    const categoryDetails = categoryForTag(category as string);

    const firstLine = `${categoryDetails.emoji} ${categoryDetails.tag}(${
      answers['scope'] as string
    })${answers['breaking'] === true ? '!' : ''}: `;
    maxLength = firstLine.length;
    return '';
  },

  /**
   * Validator for the subject prompt.
   *
   * @param subject - Subject to validate.
   * @returns Whether the subject is valid or not.
   * @example
   *   const isValid = subjectQuestion.validate('auth');
   */
  validate(subject: string) {
    return new SubjectValidator({
      subject,
      maxLength,
    }).valid;
  },
  /**
   * Formatter for the subject prompt.
   *
   * @param subject - Subject to format.
   * @returns Formatted subject.
   * @example
   *   const formatted = subjectQuestion.format('auth');
   */
  format(subject: string) {
    return new SubjectValidator({
      subject,
      maxLength,
    }).parsed;
  },
};
