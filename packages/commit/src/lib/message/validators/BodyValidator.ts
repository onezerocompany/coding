/**
 * @file Contains functions to validate the commit body.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ValidationError, ValidationErrorLevel } from './ValidationError';
import { Validator } from './Validator';

/** Validator for body input. */
export class BodyValidator extends Validator {
  /**
   * Normalized value of the body for easier validation.
   *
   * @returns The normalized value of the body.
   * @example
   *   const validator = new BodyValidator('This is a body.');
   *   return validator.normalizedValue;
   */
  public override get normalized(): string {
    return (
      this.content
        // Remove leading and trailing whitespace
        .trim()
        // Remove lines that start with a #
        .split('\n')
        // Trim the line and remove double whitespaces between words
        .map((line) => line.trim().replace(/\s+/gu, ' '))
        // Remove comments
        .filter((line) => !line.startsWith('#'))
        .join('\n')
        .replaceAll(/\n\n+/gu, '\n\n')
        .trim()
    );
  }

  /**
   * Output the errors for the body.
   *
   * @returns The errors for the body.
   * @example
   *   const validator = new BodyValidator('This is a body.');
   *   return validator.errors;
   */
  public override get errors(): ValidationError[] {
    const errors: ValidationError[] = [];

    // Body must begin with a capital letter
    if (!/^[A-Z]/u.test(this.normalized)) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'body must begin with a capital letter',
        }),
      );
    }

    // Body must end with a period, question mark, or exclamation mark
    if (!/[.?!]$/u.test(this.normalized)) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message:
            'body must end with a period, question mark, or exclamation mark',
        }),
      );
    }

    return errors;
  }
}
