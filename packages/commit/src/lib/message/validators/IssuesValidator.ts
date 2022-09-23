/**
 * @file Contains the validator.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ValidationError, ValidationErrorLevel } from './ValidationError';
import { Validator } from './Validator';

/**
 * Validator for the issues field input.
 *
 * @returns A list of validation errors.
 * @example
 *   const validator = new IssuesValidator('foo');
 *   return validator.errors; // []
 */
export class IssuesValidator extends Validator {
  /**
   * Normalizes the input for easier validation.
   *
   * @returns The normalized input.
   */
  public override get normalized(): string {
    return this.content
      .split(',')
      .map((line) => line.trim())
      .join(',')
      .trim();
  }

  /**
   * Outputs a parsed version of the input.
   *
   * @returns The parsed input.
   * @example
   *   const validator = new IssuesValidator('foo');
   *   return validator.parsed; // ['foo']
   */
  public override get parsed(): number[] {
    const issues = this.content.split(',').map((line) => line.trim());
    return issues
      .map((issue) => parseInt(issue, 10))
      .filter((issue) => !isNaN(issue));
  }

  /**
   * Outputs a list of validation errors (if any).
   *
   * @returns The list of validation errors.
   * @example
   *   const validator = new IssuesValidator('foo');
   *   return validator.errors; // []
   */
  public override get errors(): ValidationError[] {
    const errors: ValidationError[] = [];
    if (!this.content) return [];

    const lines = this.content.split(',').map((line) => line.trim());
    for (const line of lines) {
      // Regex for format: '11, 12, 13' or '11,12,13'

      const regex = /^\d+(?:,\d+)*$/u;
      const match = regex.exec(line);
      if (!match) {
        errors.push(
          new ValidationError({
            level: ValidationErrorLevel.fatal,
            message: `invalid format for issue: ${line}`,
          }),
        );
      }
    }
    return errors;
  }
}
