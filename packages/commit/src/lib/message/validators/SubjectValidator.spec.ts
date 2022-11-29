import { SubjectValidator } from './SubjectValidator';

describe('subject validator', () => {
  it('should return valid for a valid subject', () => {
    const subjectValidator = new SubjectValidator({
      subject: 'add readme to the project',
      maxLength: 48,
    });
    expect(subjectValidator.valid).toBe(true);
  });
  it('should report error for too short subject', () => {
    const subjectValidator = new SubjectValidator({
      subject: 'a',
      maxLength: 48,
    });
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
    const subjectValidator = new SubjectValidator({
      subject: 'a'.repeat(tooLongAmount),
      maxLength: 48,
    });
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
    const subjectValidator = new SubjectValidator({
      subject: 'this is a test subject (test)',
      maxLength: 48,
    });
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
    const subjectValidator = new SubjectValidator({
      subject: 'this is a test subject: test',
      maxLength: 48,
    });
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
    const subjectValidator = new SubjectValidator({
      subject: 'This is an incorrect subject',
      maxLength: 48,
    });
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
    const subjectValidator = new SubjectValidator({
      subject: 'this is an incorrect subject.',
      maxLength: 48,
    });
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
  it('should report error when using non alphanumeric characters', () => {
    const subjectValidator = new SubjectValidator({
      subject: 'this, is an incorrect subject!',
      maxLength: 48,
    });
    expect(subjectValidator.valid).toBe(
      '❗️ fatal - subject must only contain alphanumeric characters',
    );
    expect(subjectValidator.errors).toEqual([
      {
        level: 'fatal',
        message: 'subject must only contain alphanumeric characters',
      },
    ]);
  });
  it('normalize should return lowercase without a dot at the end and no double whitespaces', () => {
    const subjectValidator = new SubjectValidator({
      subject: 'This is an,    incorrect subject.',
      maxLength: 48,
    });
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
