import { toTitleCase } from './titlecase';

describe('title case', () => {
  it('should work with empty string', () => {
    expect(toTitleCase('')).toBe('');
  });
  it('should work with single word', () => {
    expect(toTitleCase('foo')).toBe('Foo');
  });
  it('should work with multiple words', () => {
    expect(toTitleCase('foo bar')).toBe('Foo Bar');
  });
  it('should work with multiple words with punctuation', () => {
    expect(toTitleCase('foo bar.')).toBe('Foo Bar.');
  });
});
