/**
 * @file Contains a function to disable Flutter analytics.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info } from '@actions/core';
import { exec } from '@actions/exec';
import { flutterPath } from '../paths';

/**
 * Disables Flutter analytics.
 *
 * @returns A promise that resolves when analytics are disabled.
 * @example await disableAnalytics();
 */
export async function disableAnalytics(): Promise<void> {
  info('Disabling analytics...');
  await exec(flutterPath, ['config', '--no-analytics']);
  info(' analytics disabled.');
}
