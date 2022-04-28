import { ValidationError, ValidationErrorLevel } from './ValidationError';
import { Validator } from './Validator';

export class AuthorsValidator extends Validator {
  public override get normalized(): string {
    return this.content
      .split(',')
      .map((line) => line.trim())
      .join(', ');
  }

  public override get errors(): ValidationError[] {
    // allow empty field
    if (!this.normalized) return [];

    const errors: ValidationError[] = [];
    const lines = this.normalized.split(',').map((line) => line.trim());
    for (const line of lines) {
      // regex for format: John Doe <john.doe@example.com>
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

  public override get parsed(): string[] {
    return this.normalized
      .split(',')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
}
