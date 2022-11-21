import { emojiForShortcode, shortcodeForEmoji } from './emoji';

describe('emoji', () => {
  it('should resolve an existing shortcode', () => {
    expect(emojiForShortcode(':open_book:')).toBe('📖');
  });
  it('should fallback for non-existing shortcode', () => {
    expect(emojiForShortcode('+2')).toBe('❓');
  });
  it('should resolve an existing emoji', () => {
    expect(shortcodeForEmoji('⭐️')).toBe(':star:');
    expect(shortcodeForEmoji('😁')).toBe(':grin:');
  });
  it('should fallback for a non-existing emoji', () => {
    expect(shortcodeForEmoji('x')).toBe(':question:');
  });
});
