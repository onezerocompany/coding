import emoji from './emoji.json';

export function emojiForShortcode(code: string): string {
  const result = emoji.emojis.find((search) => search.shortname === code);
  return result?.emoji ?? '?';
}
