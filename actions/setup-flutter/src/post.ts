/**
 * @file Post action entry point.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { existsSync } from 'fs';
import {
  error as logError,
  getBooleanInput,
  getState,
  info,
} from '@actions/core';
import { saveCache } from '@actions/cache';
import { mkdirP } from '@actions/io';
import { cachePaths } from './paths';

/**
 * Entry function for the post action.
 *
 * @example post();
 */
async function post(): Promise<void> {
  const willCache =
    getBooleanInput('cache') && getState('cache-hit') !== 'true';

  if (!willCache) {
    info('No caching needed, skipping...');
    return;
  }

  // Create any missing directories
  await Promise.all(
    cachePaths.map(async (path): Promise<void> => {
      if (!existsSync(path)) {
        return mkdirP(path);
      }
      return Promise.resolve();
    }),
  );

  const cacheKey = getState('full-cache-key');
  info('Saving cache...');
  info(` key: ${cacheKey}.`);

  try {
    await saveCache(cachePaths, cacheKey);
  } catch (cacheError: unknown) {
    logError(cacheError as string);
  }
}

// eslint-disable-next-line no-void
void post();
