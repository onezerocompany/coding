/**
 * @file Contains a.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import emoji from './emoji.json';

/**
 * Get an emoji from the list based on a shortcode.
 *
 * @param code - The shortcode of the emoji.
 * @returns The emoji.
 * @example getEmoji('bug')
 */
export function emojiForShortcode(code: string): string {
  const result = emoji.emojis.find((search) => search.shortname === code);
  return result?.emoji ?? '?';
}
