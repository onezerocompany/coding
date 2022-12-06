/**
 * @file Contains a function that picks a random item from an array.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/**
 * Picks a random item from an array.
 *
 * @param array - Array to pick from.
 * @returns Random item from the array.
 * @example const randomItem = randomItem(['a', 'b', 'c']);
 */
export function randomItem<T>(array?: T[]): T | undefined {
  // eslint-disable-next-line no-undefined
  if (!array) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}
