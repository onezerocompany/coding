/**
 * @file Contains the validator for the subject field.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ValidationError, ValidationErrorLevel } from './ValidationError';
import { Validator } from './Validator';

/** Validator for the subject input field. */
export class SubjectValidator extends Validator {
  /** Maximum lenght of the subject. */
  private readonly maxLength: number;

  /**
   * Creates a new subject validator.
   *
   * @param input - The input to validate.
   * @param input.subject - The subject to validate.
   * @param input.maxLength - The maximum length of the subject.
   * @example
   *   const validator = new SubjectValidator('foo');
   *   return validator.errors; // []
   */
  public constructor(input: { subject: string; maxLength: number }) {
    super(input.subject);
    this.maxLength = input.maxLength;
  }

  /**
   * Outputs a normalized version of the input.
   *
   * @returns The normalized input.
   */
  public override get normalized(): string {
    return (
      this.content
        // Remove leading and trailing whitespace
        .trim()
        // Convert to lowercase
        .toLowerCase()
        // Remove dot at the end
        .replace(/\.$/u, '')
        // remove all non alphanumeric characters
        .replace(/[^a-z0-9/-]/gu, ' ')
        // Split into words
        .split(' ')
        // Remove empty words
        .filter((word) => word)
        // Join words with a space
        .join(' ')
    );
  }

  /**
   * Outputs a list of validation errors (if any).
   *
   * @returns The list of validation errors.
   * @example
   *   const validator = new SubjectValidator('foo');
   *   return validator.errors; // []
   */
  public override get errors(): ValidationError[] {
    const errors: ValidationError[] = [];
    this.checkLength(errors);

    let skipAlphanumericCheck = false;
    // Subject must be all lowercase
    if (this.content !== this.content.toLowerCase()) {
      skipAlphanumericCheck = true;
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'subject must be all lowercase',
        }),
      );
    }

    // Subject must not contain parantheses or colons
    if (/[():]/u.test(this.content)) {
      skipAlphanumericCheck = true;
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'subject must not contain parantheses or colons',
        }),
      );
    }

    // Subject must not end with a dot
    if (this.content.endsWith('.')) {
      skipAlphanumericCheck = true;
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'subject must not end with a dot',
        }),
      );
    }

    // Subject must only contain alphanumeric characters
    if (!/^[a-z0-9 ]+$/u.test(this.content) && !skipAlphanumericCheck) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'subject must only contain alphanumeric characters',
        }),
      );
    }

    return errors;
  }

  /**
   * Checks the length of the subject.
   *
   * @param errors - The list of errors to add to.
   * @example
   *   const errors: ValidationError[] = [];
   *   const validator = new SubjectValidator('foo');
   */
  private checkLength(errors: ValidationError[]): void {
    const minSubjectLength = 10;

    // Subject must be longer than 10 characters
    if (this.content.length < minSubjectLength) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: `subject must be at least ${minSubjectLength} characters`,
        }),
      );
    }

    // Subject must be shorter than 48 characters
    if (this.content.length > this.maxLength) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: `subject must be at most ${this.maxLength} characters`,
        }),
      );
    }
  }
}
