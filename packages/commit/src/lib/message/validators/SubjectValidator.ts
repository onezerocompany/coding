import { ValidationError, ValidationErrorLevel } from './ValidationError';
import { Validator } from './Validator';

export class SubjectValidator extends Validator {
  public override get normalized(): string {
    return (
      this.content
        // remove leading and trailing whitespace
        .trim()
        // convert to lowercase
        .toLowerCase()
        // remove dot at the end
        .replace(/\.$/u, '')
        // split into words
        .split(' ')
        // remove empty words
        .filter((word) => word)
        // join words with a space
        .join(' ')
    );
  }

  public override get errors(): ValidationError[] {
    const errors: ValidationError[] = [];
    this.checkLength(errors);

    // subject must be all lowercase
    if (this.content !== this.content.toLowerCase()) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'subject must be all lowercase',
        }),
      );
    }

    // subject must not contain parantheses or colons
    if (/[():]/u.test(this.content)) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'subject must not contain parantheses or colons',
        }),
      );
    }

    // subject must not end with a dot
    if (this.content.endsWith('.')) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'subject must not end with a dot',
        }),
      );
    }

    return errors;
  }

  private checkLength(errors: ValidationError[]): void {
    const minSubjectLength = 10;
    const maxSubjectLength = 48;

    // subject must be longer than 10 characters
    if (this.content.length < minSubjectLength) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: `subject must be at least ${minSubjectLength} characters`,
        }),
      );
    }

    // subject must be shorter than 48 characters
    if (this.content.length > maxSubjectLength) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: `subject must be at most ${maxSubjectLength} characters`,
        }),
      );
    }
  }
}
