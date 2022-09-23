/**
 * @file Utility function to convert a string to title case.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/**
 * Converts a string to title case.
 *
 * @param str - The string to titlecase.
 * @returns The titlecased string.
 * @example toTitleCase('foo bar') // Foo Bar
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/gu,
    (txt: string): string =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}
