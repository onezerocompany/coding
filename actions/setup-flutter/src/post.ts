/**
 * @file Post action entry point.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { existsSync } from 'fs';
import { homedir } from 'os';
import {
  debug,
  getBooleanInput,
  getInput,
  getState,
  info,
} from '@actions/core';
import { saveCache } from '@actions/cache';
import { rmRF } from '@actions/io';

/**
 * Entry function for the post action.
 *
 * @example post();
 */
async function post(): Promise<void> {
  const willCacheSdk =
    getBooleanInput('cache-sdk') && getState('should-cache-sdk') === 'true';

  const willCacheDependencies =
    getBooleanInput('cache-dependencies') &&
    getState('should-cache-dependencies') === 'true';

  const willCachePods =
    getBooleanInput('cache-pods') && getState('should-cache-pods') === 'true';

  if (!willCacheDependencies && !willCacheSdk && !willCachePods) {
    info('No cache specified, skipping...');
    return;
  }

  const sdkPath = getState('sdk-path');
  const sdkCachePath = resolve(sdkPath, '.pub-cache');

  if (willCacheDependencies) {
    info('Caching dependencies...');
    const dependenciesCacheKey = getInput('dependencies-cache-key');
    debug(` cache key: ${dependenciesCacheKey}`);
    const homeCache = resolve(homedir(), '.pub-cache');
    await saveCache([sdkCachePath, homeCache], dependenciesCacheKey);
  }

  // Remove sdk cache to avoid caching it twice
  if (existsSync(sdkCachePath)) {
    await rmRF(sdkCachePath);
  }

  if (willCacheSdk) {
    info('Caching SDK...');
    const sdkCacheKey = getState('sdk-cache-key');
    debug(` cache key: ${sdkCacheKey}`);
    await saveCache([sdkPath], sdkCacheKey);
  }

  const podsPath = getState('pods-path');
  if (willCachePods) {
    info('Caching pods...');
    const podsCacheKey = getInput('pods-cache-key');
    debug(` cache key: ${podsCacheKey}`);
    await saveCache([podsPath], podsCacheKey);
  }
}

// eslint-disable-next-line no-void
void post();
