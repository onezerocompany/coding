/**
 * @file Post action entry point.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { existsSync } from 'fs';
import { getBooleanInput, getInput, getState, info } from '@actions/core';
import { saveCache } from '@actions/cache';
import { rmRF } from '@actions/io';

/**
 * Entry function for the post action.
 *
 * @example post();
 */
async function post(): Promise<void> {
  const cacheDependencies = getBooleanInput('cache-dependencies');
  const cacheSdk = getBooleanInput('cache-sdk');

  if (!cacheDependencies && !cacheSdk) {
    info('No cache specified, skipping...');
    return;
  }

  const sdkPath = getState('sdk-path');
  const sdkCachePath = resolve(sdkPath, '.pub-cache');

  if (cacheDependencies) {
    info('Caching dependencies...');
    const dependenciesCacheKey = getInput('dependencies-cache-key');
    await saveCache([sdkCachePath, '~/.pub-cache'], dependenciesCacheKey);
  }

  // Remove sdk cache to avoid caching it twice
  if (existsSync(sdkCachePath)) {
    await rmRF(sdkCachePath);
  }

  if (cacheSdk) {
    info('Caching SDK...');
    const sdkCacheKey = getState('sdk-cache-key');
    await saveCache([sdkPath], sdkCacheKey);
  }
}

// eslint-disable-next-line no-void
void post();
