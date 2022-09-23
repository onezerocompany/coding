/**
 * @file
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Level of validation error. */
export enum ValidationErrorLevel {
  /** Fatal, no recovery. */
  fatal = 'fatal',
  /** Warning, can proceed but not without explicit confirmation. */
  warning = 'warning',
  /** Info, just informing about operations. */
  info = 'info',
}

/** An error occurred durign validation. */
export class ValidationError {
  /** Severity of the error that occured. */
  public level: ValidationErrorLevel;

  /** Content of the error. */
  public message: string;

  /**
   * Creates a new instance of a validation error.
   *
   * @param input - The input to validate.
   * @param input.level - The level of the error.
   * @param input.message - The message to display.
   * @example
   *   new ValidationError({
   *     level: ValidationErrorLevel.fatal,
   *     message: 'This is a fatal error',
   *   });
   */
  public constructor(input: { level: ValidationErrorLevel; message: string }) {
    this.level = input.level;
    this.message = input.message.trim();
  }

  /**
   * Outputs the error as a string.
   *
   * @returns The error as a string.
   * @example
   *   const error = new ValidationError({
   *     level: ValidationErrorLevel.fatal,
   *     message: 'This is a fatal error',
   *   });
   */
  public get displayString(): string {
    return `❗️ ${this.level} - ${this.message}`;
  }
}
