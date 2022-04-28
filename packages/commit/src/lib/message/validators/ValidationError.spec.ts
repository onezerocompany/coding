import { ValidationError, ValidationErrorLevel } from './ValidationError';

describe('validation error', () => {
  it('should return correct displayString for inputs', () => {
    const correctError = new ValidationError({
      level: ValidationErrorLevel.fatal,
      message: 'something went wrong',
    });
    expect(correctError.displayString).toBe('❗️ fatal - something went wrong');
  });
});
