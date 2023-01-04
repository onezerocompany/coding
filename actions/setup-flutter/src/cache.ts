/**
 * @file Function for restoring the cache.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import {
  error as logError,
  getInput,
  info,
  saveState,
  setOutput,
} from '@actions/core';
import { restoreCache } from '@actions/cache';
import { cachePaths } from './paths';

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

  const userKey = getInput('cache-key');
  const cacheKey = `${userKey}-${version}-${channel}`;
  saveState('full-cache-key', cacheKey);

  info(` cache key: ${cacheKey}.`);

  try {
    if (
      typeof (await restoreCache(cachePaths, cacheKey, [
        'flutter-',
        userKey,
      ])) === 'string'
    ) {
      info(' cache restored successfully.');
      saveState('cache-hit', 'true');
      setOutput('cache-hit', 'true');
    } else {
      info(' cache not found.');
      saveState('cache-hit', 'false');
      setOutput('cache-hit', 'false');
    }
  } catch (cacheError: unknown) {
    logError(cacheError as string);
    saveState('cache-hit', 'false');
    setOutput('cache-hit', 'false');
  }
}
