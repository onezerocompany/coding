import { ValidationError, ValidationErrorLevel } from './ValidationError';
import { Validator } from './Validator';

export class ScopeValidator extends Validator {
  public override get normalized(): string {
    return (
      this.content
        // trim the content
        .trim()
        // convert all to lowercase
        .toLowerCase()
        // remove whitespaces
        .replace(/\s/gu, '')
    );
  }

  // eslint-disable-next-line max-lines-per-function
  public override get errors(): ValidationError[] {
    const errors: ValidationError[] = [];
    const minScopeLength = 3;
    const maxScopeLength = 20;

    // scope must be longer than 3 characters
    if (this.content.length < minScopeLength) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'scope must be at least 3 characters',
        }),
      );
    }

    // scope must be shorter than 20 characters
    if (this.content.length > maxScopeLength) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'scope must be at most 20 characters',
        }),
      );
    }

    // scope must be all lowercase
    if (this.content !== this.content.toLowerCase()) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'scope must be all lowercase',
        }),
      );
    }

    // scope cannot contain whitespace
    if (/\s/u.test(this.content)) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'scope cannot contain whitespace',
        }),
      );
    }

    // scope cannot contain numbers
    if (/\d/u.test(this.content)) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'scope cannot contain numbers',
        }),
      );
      // scope can only contain lowercase letters, forward slashes, dashes
    }

    // scope must not contain non alphanumeric characters
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
