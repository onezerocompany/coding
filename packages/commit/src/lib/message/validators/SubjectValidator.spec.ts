import { SubjectValidator } from './SubjectValidator';

describe('subject validator', () => {
  it('should return valid for a valid subject', () => {
    const subjectValidator = new SubjectValidator('add readme to the project');
    expect(subjectValidator.valid).toBe(true);
  });
  it('should report error for too short subject', () => {
    const subjectValidator = new SubjectValidator('a');
    expect(subjectValidator.valid).toBe(
      '❗️ fatal - subject must be at least 10 characters',
    );
    expect(subjectValidator.errors).toEqual([
      {
        level: 'fatal',
        message: 'subject must be at least 10 characters',
      },
    ]);
  });
  it('should report error for too long subject', () => {
    const tooLongAmount = 49;
    const subjectValidator = new SubjectValidator('a'.repeat(tooLongAmount));
    expect(subjectValidator.valid).toBe(
      '❗️ fatal - subject must be at most 48 characters',
    );
    expect(subjectValidator.errors).toEqual([
      {
        level: 'fatal',
        message: 'subject must be at most 48 characters',
      },
    ]);
  });
  it('should report error when using brackets', () => {
    const subjectValidator = new SubjectValidator(
      'this is a test subject (test)',
    );
    expect(subjectValidator.valid).toBe(
      '❗️ fatal - subject must not contain parantheses or colons',
    );
    expect(subjectValidator.errors).toEqual([
      {
        level: 'fatal',
        message: 'subject must not contain parantheses or colons',
      },
    ]);
  });
  it('should report error when using colon', () => {
    const subjectValidator = new SubjectValidator(
      'this is a test subject: test',
    );
    expect(subjectValidator.valid).toBe(
      '❗️ fatal - subject must not contain parantheses or colons',
    );
    expect(subjectValidator.errors).toEqual([
      {
        level: 'fatal',
        message: 'subject must not contain parantheses or colons',
      },
    ]);
  });
  it('should report error for uppercase in subject', () => {
    const subjectValidator = new SubjectValidator(
      'This is an incorrect subject',
    );
    expect(subjectValidator.valid).toBe(
      '❗️ fatal - subject must be all lowercase',
    );
    expect(subjectValidator.errors).toEqual([
      {
        level: 'fatal',
        message: 'subject must be all lowercase',
      },
    ]);
  });
  it('should report error for ending with dot', () => {
    const subjectValidator = new SubjectValidator(
      'this is an incorrect subject.',
    );
    expect(subjectValidator.valid).toBe(
      '❗️ fatal - subject must not end with a dot',
    );
    expect(subjectValidator.errors).toEqual([
      {
        level: 'fatal',
        message: 'subject must not end with a dot',
      },
    ]);
  });
  it('normalize should return lowercase without a dot at the end and no double whitespaces', () => {
    const subjectValidator = new SubjectValidator(
      'This is an    incorrect subject.',
    );
    expect(subjectValidator.normalized).toBe('this is an incorrect subject');
    expect(subjectValidator.parsed).toBe(subjectValidator.normalized);
    expect(subjectValidator.valid).toBe(
      '❗️ fatal - subject must be all lowercase, ❗️ fatal - subject must not end with a dot',
    );
    expect(subjectValidator.errors).toEqual([
      {
        level: 'fatal',
        message: 'subject must be all lowercase',
      },
      {
        level: 'fatal',
        message: 'subject must not end with a dot',
      },
    ]);
  });
});
