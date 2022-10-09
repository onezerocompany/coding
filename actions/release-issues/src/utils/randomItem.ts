/**
 * @file Contains functions for getting random items from an array.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/**
 * Fetches a random item from an array of items.
 *
 * @param array - The array to fetch a random item from.
 * @returns A random item from the array.
 * @example randomItem([1, 2, 3, 4, 5]);
 */
export function randomItem(array: string[]): string {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex] ?? '';
}
