/**
 * @file Contains the definition of a universal validator.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ValidationError, ValidationErrorLevel } from './ValidationError';

/** Definition of a common validator implementation. */
export class Validator {
  /** The content that needs to be validated. */
  public content: string;

  /**
   * Create a new validator with the given content.
   *
   * @param content - The content that needs to be validated.
   * @example
   *   const validator = new Validator('foo');
   *   validator.valid; // true
   */
  public constructor(content: string) {
    this.content = content;
  }

  /**
   * Outputs a list of validation errors.
   *
   * @returns A list of validation errors.
   * @example
   *   const validator = new Validator('foo');
   *   return validator.errors; // []
   */
  public get errors(): ValidationError[] {
    const errors = [];

    if (this.content.length === 0) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'content must not be empty',
        }),
      );
    }

    return errors;
  }

  /**
   * Whether the output is valid.
   *
   * @returns Whether the output is valid.
   */
  public get valid(): boolean | string {
    const { errors } = this;
    return errors.length > 0
      ? errors
          .map((validationError) => validationError.displayString)
          .join(', ')
      : true;
  }

  /**
   * Normalizes the input for easier validation.
   *
   * @returns The normalized input.
   * @example
   *   const validator = new Validator('foo');
   *   return validator.normalized; // 'foo'
   */
  public get normalized(): string {
    return this.content.trim();
  }

  /**
   * Outputs the parsed content.
   *
   * @returns The parsed content.
   * @example
   *   const validator = new Validator('foo');
   *   return validator.parsed; // 'foo'
   */
  public get parsed(): number[] | string[] | string {
    return this.normalized;
  }
}
