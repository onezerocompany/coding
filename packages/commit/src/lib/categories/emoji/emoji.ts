/**
 * @file Contains a.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import emoji from './emoji.json';

const emojis = emoji.emojis as Array<{
  emoji: string;
  shortcode: string;
}>;

/**
 * Get an emoji from the list based on a shortcode.
 *
 * @param code - The shortcode of the emoji.
 * @returns The emoji.
 * @example getEmoji('bug')
 */
export function emojiForShortcode(code: string): string {
  return emojis.find((search) => search.shortcode === code)?.emoji ?? '❓';
}

/**
 * Get an emoji from the list based on the emoji.
 *
 * @param emojiToCheck - The emoji to check.
 * @returns The shortcode.
 * @example getShortcodeForEmoji('🐛');
 */
export function shortcodeForEmoji(emojiToCheck: string): string {
  return (
    emojis.find((item) =>
      new RegExp(`^[bc${emojiToCheck}]$`, 'gu').exec(item.emoji),
    )?.shortcode ?? ':question:'
  );
}
