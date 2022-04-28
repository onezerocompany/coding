import { ScopeValidator } from './ScopeValidator';
import { ValidationErrorLevel } from './ValidationError';

describe('scope validator', () => {
  it('should report an error if the scope is too short', () => {
    const minScopeLength = 3;
    const scope = 'a'.repeat(minScopeLength - 1);
    const scopeValidator = new ScopeValidator(scope);
    expect(scopeValidator.valid).toBe(
      `❗️ fatal - scope must be at least ${minScopeLength} characters`,
    );
    expect(scopeValidator.errors).toEqual([
      {
        level: ValidationErrorLevel.fatal,
        message: `scope must be at least ${minScopeLength} characters`,
      },
    ]);
  });
  it('should report an error if the scope is too long', () => {
    const maxScopeLength = 20;
    const scope = 'a'.repeat(maxScopeLength + 1);
    const scopeValidator = new ScopeValidator(scope);
    expect(scopeValidator.valid).toBe(
      `❗️ fatal - scope must be at most ${maxScopeLength} characters`,
    );
    expect(scopeValidator.errors).toEqual([
      {
        level: ValidationErrorLevel.fatal,
        message: `scope must be at most ${maxScopeLength} characters`,
      },
    ]);
  });
  it('should report an error if the scope is not lowercase', () => {
    const scope = 'IncorrectScope';
    const scopeValidator = new ScopeValidator(scope);
    expect(scopeValidator.valid).toBe(
      '❗️ fatal - scope must be all lowercase',
    );
    expect(scopeValidator.errors).toEqual([
      {
        level: ValidationErrorLevel.fatal,
        message: 'scope must be all lowercase',
      },
    ]);
  });
  it('should report an error if the scope contains illegal characters', () => {
    const scope = 'incorrect/scope.';
    const scopeValidator = new ScopeValidator(scope);
    expect(scopeValidator.valid).toBe(
      '❗️ fatal - scope can only contain forward slashes and dashes',
    );
    expect(scopeValidator.errors).toEqual([
      {
        level: ValidationErrorLevel.fatal,
        message: 'scope can only contain forward slashes and dashes',
      },
    ]);
  });
  it('should report an error for whitespaces', () => {
    const scope = 'incorrect scope';
    const scopeValidator = new ScopeValidator(scope);
    expect(scopeValidator.valid).toBe(
      '❗️ fatal - scope cannot contain whitespace',
    );
    expect(scopeValidator.errors).toEqual([
      {
        level: ValidationErrorLevel.fatal,
        message: 'scope cannot contain whitespace',
      },
    ]);
  });
  it('should report an error if the scope contains numberes', () => {
    const scope = 'incorrect/1';
    const scopeValidator = new ScopeValidator(scope);
    expect(scopeValidator.valid).toBe(
      '❗️ fatal - scope cannot contain numbers',
    );
    expect(scopeValidator.errors).toEqual([
      {
        level: ValidationErrorLevel.fatal,
        message: 'scope cannot contain numbers',
      },
    ]);
  });
  it('should normalize correctly', () => {
    const scope = 'incorrect  /Scope';
    const scopeValidator = new ScopeValidator(scope);
    expect(scopeValidator.normalized).toBe('incorrect/scope');
    expect(scopeValidator.parsed).toBe(scopeValidator.normalized);
    expect(scopeValidator.valid).toBe(
      '❗️ fatal - scope must be all lowercase, ❗️ fatal - scope cannot contain whitespace',
    );
    expect(scopeValidator.errors).toEqual([
      {
        level: ValidationErrorLevel.fatal,
        message: 'scope must be all lowercase',
      },
      {
        level: ValidationErrorLevel.fatal,
        message: 'scope cannot contain whitespace',
      },
    ]);
  });
});
