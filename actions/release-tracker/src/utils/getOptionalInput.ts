/**
 * @file Get an optional input.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { getInput } from '@actions/core';

/**
 * Gets an action input that is optional.
 *
 * @param name - The name of the input.
 * @returns The value of the input, or the default value if the input is not set.
 * @example const token = getOptionalInput('token');
 */
export function getOptionalInput(name: string): string | null {
  const input = getInput(name);
  return input === '' ? null : input;
}
