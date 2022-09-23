/**
 * @file Contains functions to validate authors input from the user.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ValidationError, ValidationErrorLevel } from './ValidationError';
import { Validator } from './Validator';

/** Validator for author field input. */
export class AuthorsValidator extends Validator {
  /**
   * Normalizes the input to make it easier to validate.
   *
   * @returns The normalized input.
   * @example
   *   const validator = new AuthorsValidator('Luca Silverentand <luca@onezero.company>');
   *   const normalized = validator.normalized;
   */
  public override get normalized(): string {
    return this.content
      .split(',')
      .map((line) => line.trim())
      .join(', ');
  }

  /**
   * Outputs a list of errors for the input.
   *
   * @returns The errors found in the input.
   * @example
   *   const validator = new AuthorsValidator('Luca Silverentand <luca@onezero.company>');
   *   const errors = validator.errors;
   */
  public override get errors(): ValidationError[] {
    // Allow empty field
    if (!this.normalized) return [];

    const errors: ValidationError[] = [];
    const lines = this.normalized.split(',').map((line) => line.trim());
    for (const line of lines) {
      // Regex for format: John Doe <john.doe@example.com>

      const regex =
        // eslint-disable-next-line no-control-regex
        /^(?:[^<]+) <(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])>$/u;

      const match = regex.exec(line);
      if (!match) {
        errors.push(
          new ValidationError({
            level: ValidationErrorLevel.fatal,
            message: `invalid format for co-author: ${line}`,
          }),
        );
      }
    }
    return errors;
  }

  /**
   * Parses the input into a list of authors.
   *
   * @returns The list of authors.
   * @example
   *   const validator = new AuthorsValidator('Luca Silverentand');
   *   const authors = validator.authors;
   */
  public override get parsed(): string[] {
    return this.normalized
      .split(',')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
}
