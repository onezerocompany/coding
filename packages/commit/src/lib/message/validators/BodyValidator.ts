import { ValidationError, ValidationErrorLevel } from './ValidationError';
import { Validator } from './Validator';

export class BodyValidator extends Validator {
  public override get normalized(): string {
    return (
      this.content
        // remove leading and trailing whitespace
        .trim()
        // remove lines that start with a #
        .split('\n')
        // trim the line and remove double whitespaces between words
        .map((line) => line.trim().replace(/\s+/gu, ' '))
        // remove comments
        .filter((line) => !line.startsWith('#'))
        .join('\n')
        .replaceAll(/\n\n+/gu, '\n\n')
        .trim()
    );
  }

  public override get errors(): ValidationError[] {
    const errors: ValidationError[] = [];

    // body must begin with a capital letter
    if (!/^[A-Z]/u.test(this.normalized)) {
      errors.push(
        new ValidationError({
          level: ValidationErrorLevel.fatal,
          message: 'body must begin with a capital letter',
        }),
      );
    }

    // body must end with a period, question mark, or exclamation mark
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
