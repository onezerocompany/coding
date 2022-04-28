import { ValidationError, ValidationErrorLevel } from './ValidationError';

export class Validator {
  public content: string;

  public constructor(content: string) {
    this.content = content;
  }

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

  public get valid(): boolean | string {
    const { errors } = this;
    return errors.length > 0
      ? errors
          .map((validationError) => validationError.displayString)
          .join(', ')
      : true;
  }

  public get normalized(): string {
    return this.content.trim();
  }

  public get parsed(): number[] | string[] | string {
    return this.normalized;
  }
}
