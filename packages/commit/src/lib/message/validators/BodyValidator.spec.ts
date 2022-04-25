import { BodyValidator } from './BodyValidator';

describe('body validator', () => {
  it('should accept valid body', () => {
    const testBody = `This is a longer message body.
    This is a second line.`;
    const validator = new BodyValidator(testBody);
    expect(validator.valid).toBe(true);
    expect(validator.errors).toEqual([]);
  });
  it('should decline body without a leading capital letter', () => {
    const testBody = `this is a longer message body.
    This is a second line.`;
    const validator = new BodyValidator(testBody);
    expect(validator.valid).toBe(
      '❗️ fatal - body must begin with a capital letter',
    );
    expect(validator.errors).toEqual([
      {
        level: 'fatal',
        message: 'body must begin with a capital letter',
      },
    ]);
  });
  it('should decline body without a trailing period, question mark, or exclamation mark', () => {
    const testBody = `This is a longer message body.
    This is a second line`;
    const validator = new BodyValidator(testBody);
    expect(validator.valid).toBe(
      '❗️ fatal - body must end with a period, question mark, or exclamation mark',
    );
    expect(validator.errors).toEqual([
      {
        level: 'fatal',
        message:
          'body must end with a period, question mark, or exclamation mark',
      },
    ]);
  });
  it('should normalize correctly', () => {
    const testBody = `
      This is a longer message body.


      # this is a comment
    This is a second line.   `;
    const validator = new BodyValidator(testBody);
    expect(validator.normalized).toBe(
      `This is a longer message body.
      
      This is a second line.`
        .split('\n')
        .map((line) => line.trim())
        .join('\n')
        .trim(),
    );
    expect(validator.errors).toEqual([]);
    expect(validator.valid).toBe(true);
    expect(validator.parsed).toBe(validator.normalized);
  });
});
