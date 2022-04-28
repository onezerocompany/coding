import { emojiForShortcode } from './emoji';

describe('emoji', () => {
  it('should resolve an existing emoji', () => {
    expect(emojiForShortcode(':open_book:')).toBe('📖');
  });
  it('should fallback for non-existing emoji', () => {
    expect(emojiForShortcode('+2')).toBe('?');
  });
});
