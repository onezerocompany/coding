/**
 * @file Contains a function that determines if a value is defined.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/**
 * Determines if a value is defined.
 *
 * @param value - The value to check.
 * @returns Whether the value is defined.
 * @example isDefined('foo'); // true
 */
export function isDefined<T>(value: T | undefined): value is T {
  if (typeof value === 'undefined') return false;
  if (value === null) return false;
  return true;
}
