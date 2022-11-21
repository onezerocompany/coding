import { validateMessage } from './validateMessage';
import {
  ValidationError,
  ValidationErrorLevel,
} from './validators/ValidationError';

describe('mesage validation', () => {
  it('valid message should pass', () => {
    const validMessage = `
      :open_book: docs(readme): add readme to the project

      The readme should be a good summary of the project.
      It should be short and concise.

      Closes #123

      Co-authored-by: Jack Smith <jack.smith@example.com>
      Co-authored-by: Jane Doe <jane.doe@example.com>

      Signed-off-by: John Doe <john.doe@example.com>
    `
      .split('\n')
      .map((line) => line.trim())
      .join('\n')
      .trim();
    const validation = validateMessage({ message: validMessage });
    expect(validation.errors).toEqual([]);
    expect(validation.valid).toBe(true);
  });
  it('should reject wrong emoji', () => {
    const incorrectEmoji =
      ':raised_hands: docs(readme): add readme to the project';
    const validation = validateMessage({ message: incorrectEmoji });
    expect(validation.valid).toBe(false);
    expect(validation.errors).toEqual([
      new ValidationError({
        message: 'invalid emoji for category docs',
        level: ValidationErrorLevel.fatal,
      }),
    ]);
  });
  it('should reject non-existent category', () => {
    const nonExistentCategory =
      ':open_book: fake(readme): add readme to the project';
    const validation = validateMessage({ message: nonExistentCategory });
    expect(validation.valid).toBe(false);
    expect(validation.errors).toEqual([
      new ValidationError({
        message: 'message is formatted incorrectly',
        level: ValidationErrorLevel.fatal,
      }),
    ]);
  });
  it('should reject empty message', () => {
    const validation = validateMessage({ message: '' });
    expect(validation.valid).toBe(false);
    expect(validation.errors).toEqual([
      new ValidationError({
        message: 'no commit message provided',
        level: ValidationErrorLevel.fatal,
      }),
    ]);
  });
  it('should reject missing scope', () => {
    const missingScope = ':open_book: docs: add readme to the project';
    const validation = validateMessage({ message: missingScope });
    expect(validation.valid).toBe(false);
    expect(validation.errors).toEqual([
      new ValidationError({
        message: 'message is formatted incorrectly',
        level: ValidationErrorLevel.fatal,
      }),
    ]);
  });
  it('should reject missing subject', () => {
    const missingSubject = ':open_book: docs(readme):';
    const validation = validateMessage({ message: missingSubject });
    expect(validation.valid).toBe(false);
    expect(validation.errors).toEqual([
      new ValidationError({
        message: 'message is formatted incorrectly',
        level: ValidationErrorLevel.fatal,
      }),
    ]);
  });
  it('should reject incorrect body', () => {
    const incorrectBody = `
      :open_book: docs(readme): add readme to the project

      the readme should be a good summary of the project.
      It should be short and concise
    `
      .split('\n')
      .map((line) => line.trim())
      .join('\n')
      .trim();
    const validation = validateMessage({ message: incorrectBody });
    expect(validation.valid).toBe(false);
    expect(validation.errors).toEqual([
      new ValidationError({
        message: 'body must begin with a capital letter',
        level: ValidationErrorLevel.fatal,
      }),
      new ValidationError({
        message:
          'body must end with a period, question mark, or exclamation mark',
        level: ValidationErrorLevel.fatal,
      }),
    ]);
  });
  it('should reject incorrect co-author', () => {
    const incorrectCoAuthor = `
      :open_book: docs(readme): add readme to the project

      The readme should be a good summary of the project.
      It should be short and concise.

      Closes #123
      Co-authored-by: Jack Smith <jack.smith@example.com>
      Co-authored-by: Jane Doe
    `
      .split('\n')
      .map((line) => line.trim())
      .join('\n')
      .trim();
    const validation = validateMessage({ message: incorrectCoAuthor });
    expect(validation.valid).toBe(false);
    expect(validation.errors).toEqual([
      new ValidationError({
        message: 'invalid format for co-author: Jane Doe',
        level: ValidationErrorLevel.fatal,
      }),
    ]);
  });
  it('should reject non-existent foorter tag', () => {
    const nonExistentFooterTag = `
      :open_book: docs(readme): add readme to the project

      The readme should be a good summary of the project.
      It should be short and concise.

      Closes #123
      Fake-tag: Jack Smith
    `
      .split('\n')
      .map((line) => line.trim())
      .join('\n')
      .trim();
    const validation = validateMessage({ message: nonExistentFooterTag });
    expect(validation.valid).toBe(false);
    expect(validation.errors).toEqual([
      new ValidationError({
        message: 'unrecognized prefix in footer line: Fake-tag: Jack Smith',
        level: ValidationErrorLevel.fatal,
      }),
    ]);
  });
});
