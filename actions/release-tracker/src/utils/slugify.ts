/**
 * @file Functions to slugify strings.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/**
 * Slugifies a string.
 *
 * @param value - The value to slugify.
 * @returns The slugified string.
 * @example slugify('Hello World!') // hello-world
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/(?:^-|-$)+/gu, '');
}
