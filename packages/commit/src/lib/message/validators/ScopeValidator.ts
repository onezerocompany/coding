/**
 * @file Contains a validator for the scope of a commit message.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ValidationError, ValidationErrorLevel } from './ValidationError';
import { Validator } from './Validator';

/** Validator for the scope in a commit message. */
export class ScopeValidator extends Validator {
  /**
   * Normalizes the input for easier validation.
   *
   * @returns The normalized input.
   * @example
   *   const validator = new ScopeValidator('This is a scope.');
   *   return validator.normalized;
   */
  public override get normalized(): string {
    return (
      this.content
        // Trim the content
        .trim()
        // Convert all to lowercase
        .toLowerCase()
        // Remove whitespaces
        .replace(/\s/gu, '')
    );
  }

  /**
   * Outputs any validation errors for the scope.
   *
   * @returns The validation errors for the scope.
   * @example
   *   const validator = new ScopeValidator('This is a scope.');
   *   return validator.errors;
   */
  public override get errors(): ValidationError[] {
    const errors: ValidationError[] = [];

    errors.push(...this.checkScopeLength());
    errors.push(...this.checkInvalidCharacters());

    // Scope must be all lowercase
    if (this.content !== this.content.toLowerCase()) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'scope must be all lowercase',
        }),
      );
    }

    return errors;
  }

  /**
   * Validates the scope length.
   * The scope must be between 3 and 20 characters long.
   *
   * @returns The validation errors.
   * @example this.checkScopeLength();
   */
  private checkScopeLength(): ValidationError[] {
    const errors: ValidationError[] = [];
    const minScopeLength = 3;
    const maxScopeLength = 20;
    // Scope must be longer than 3 characters
    if (this.content.length < minScopeLength) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'scope must be at least 3 characters',
        }),
      );
    }
    // Scope must be shorter than 20 characters
    if (this.content.length > maxScopeLength) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'scope must be at most 20 characters',
        }),
      );
    }
    return errors;
  }

  /**
   * Checks for invalid characters.
   *
   * @returns The validation errors.
   * @example
   *   const validator = new ScopeValidator('This is a scope.');
   *   return validator.checkInvalidCharacters();
   */
  private checkInvalidCharacters(): ValidationError[] {
    const errors: ValidationError[] = [];

    // Scope cannot contain whitespace
    if (/\s/u.test(this.content)) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'scope cannot contain whitespace',
        }),
      );
    }

    // Scope cannot contain numbers
    if (/\d/u.test(this.content)) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'scope cannot contain numbers',
        }),
      );
      // Scope can only contain lowercase letters, forward slashes, dashes
    }

    // Scope must not contain non alphanumeric characters
    if (/[^a-z0-9/-]/u.test(this.normalized)) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'scope can only contain forward slashes and dashes',
        }),
      );
    }

    return errors;
  }
}
