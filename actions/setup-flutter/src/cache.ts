/**
 * @file Function for restoring the cache.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { homedir } from 'os';
import {
  error as logError,
  getInput,
  getState,
  info,
  saveState,
  setOutput,
} from '@actions/core';
import { restoreCache } from '@actions/cache';

/**
 * Restores the cache.
 *
 * @param parameters - Object containing the input parameters.
 * @param parameters.version - The version of the SDK to install.
 * @param parameters.channel - The channel of the SDK to install.
 * @example await cache();
 */
export async function cache({
  version,
  channel,
}: {
  version: string;
  channel: string;
}): Promise<void> {
  info('Restoring cache...');

  const sdkPath = resolve(homedir(), 'flutter', 'flutter');
  const paths = [
    sdkPath,
    resolve(homedir(), '.pub-cache'),
    getState('pods-path'),
  ];

  const userKey = getInput('cache-key');
  const cacheKey = `${userKey}-${version}-${channel}`;

  try {
    if (
      typeof (await restoreCache(paths, cacheKey, ['flutter-', userKey])) ===
      'string'
    ) {
      info('Cache restored successfully.');
      saveState('cache-hit', 'true');
      setOutput('cache-hit', 'true');
    } else {
      info('Cache not found.');
      saveState('cache-hit', 'false');
      setOutput('cache-hit', 'false');
    }
  } catch (cacheError: unknown) {
    logError(cacheError as string);
    saveState('cache-hit', 'false');
    setOutput('cache-hit', 'false');
  }
}
