/**
 * @file Function for restoring the cache.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { homedir } from 'os';
import { existsSync } from 'fs';
import { error, getInput, getState, info } from '@actions/core';
import { restoreCache } from '@actions/cache';

/**
 * Restores the cache.
 *
 * @example await cache();
 */
export async function cache(): Promise<void> {
  info('Restoring cache...');

  const sdkPath = resolve(homedir(), 'flutter', 'flutter');
  const paths = [
    sdkPath,
    resolve(homedir(), '.pub-cache'),
    getState('pods-path'),
  ];
  try {
    await restoreCache(
      paths.filter((path) => existsSync(path)),
      getInput('cache-key'),
      ['flutter-'],
    );
  } catch (cacheError: unknown) {
    error(cacheError as string);
  }
}
