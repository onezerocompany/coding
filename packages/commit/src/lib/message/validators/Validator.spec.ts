import { Validator } from './Validator';

describe('general validator', () => {
  it('should return valid if the string is not empty', () => {
    const validator = new Validator('hello');
    expect(validator.valid).toBe(true);
    expect(validator.errors).toHaveLength(0);
  });
  it('should report invalid when the string is empty', () => {
    const validator = new Validator('');
    expect(validator.valid).toBe('❗️ fatal - content must not be empty');
    expect(validator.errors).toHaveLength(1);
  });
  it('should trim the string on normalized', () => {
    const validator = new Validator(' hello ');
    expect(validator.normalized).toBe('hello');
  });
  it('should also trim the string on parsed', () => {
    const validator = new Validator(' hello ');
    expect(validator.parsed).toBe('hello');
  });
});
