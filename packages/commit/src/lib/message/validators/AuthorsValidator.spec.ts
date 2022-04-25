import { AuthorsValidator } from './AuthorsValidator';

describe('authors validator', () => {
  it('should accept valid authors', () => {
    const testAuthors =
      'John Doe <john.doe@example.com>, Jane Doe <jane.doe@example.com>';
    const validator = new AuthorsValidator(testAuthors);
    expect(validator.valid).toBe(true);
    expect(validator.errors).toEqual([]);
    expect(validator.parsed).toEqual([
      'John Doe <john.doe@example.com>',
      'Jane Doe <jane.doe@example.com>',
    ]);
  });
  it('should decline authors without a name', () => {
    const testAuthors = '<jane.doe@example.com>';
    const validator = new AuthorsValidator(testAuthors);
    expect(validator.valid).toBe(
      '❗️ fatal - invalid format for co-author: <jane.doe@example.com>',
    );
  });
  it('should accept empty authors', () => {
    const testAuthors = '';
    const validator = new AuthorsValidator(testAuthors);
    expect(validator.valid).toBe(true);
    expect(validator.errors).toEqual([]);
    expect(validator.parsed).toEqual([]);
  });
  it('should decline authors without an email', () => {
    const testAuthors = 'John Doe';
    const validator = new AuthorsValidator(testAuthors);
    expect(validator.valid).toBe(
      '❗️ fatal - invalid format for co-author: John Doe',
    );
  });
});
