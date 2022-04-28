import { ValidationError, ValidationErrorLevel } from './ValidationError';
import { Validator } from './Validator';

export class IssuesValidator extends Validator {
  public override get normalized(): string {
    return this.content
      .split(',')
      .map((line) => line.trim())
      .join(',')
      .trim();
  }

  public override get parsed(): number[] {
    const issues = this.content.split(',').map((line) => line.trim());
    return issues
      .map((issue) => parseInt(issue, 10))
      .filter((issue) => !isNaN(issue));
  }

  public override get errors(): ValidationError[] {
    const errors: ValidationError[] = [];
    if (!this.content) return [];

    const lines = this.content.split(',').map((line) => line.trim());
    for (const line of lines) {
      // regex for format: '11, 12, 13' or '11,12,13'
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
