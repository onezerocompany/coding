export enum ValidationErrorLevel {
  fatal = 'fatal',
  warning = 'warning',
  info = 'info',
}

export class ValidationError {
  public level: ValidationErrorLevel;
  public message: string;

  public constructor(input: { level: ValidationErrorLevel; message: string }) {
    this.level = input.level;
    this.message = input.message.trim();
  }

  public get displayString(): string {
    return `❗️ ${this.level} - ${this.message}`;
  }
}
