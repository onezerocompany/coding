/**
 * @file Dependency related functions.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { homedir } from 'os';
import { restoreCache } from '@actions/cache';
import { exec } from '@actions/exec';
import { debug, info, saveState } from '@actions/core';

/**
 * Installs the dependencies for the project.
 *
 * @param parameters - The functions parameters.
 * @param parameters.workingDirectory - The working directory.
 * @param parameters.recoverCache - Whether to restore the cache.
 * @param parameters.cacheKey - The cache key.
 * @param parameters.sdkPath - The SDK path.
 * @param parameters.recoverPods - Whether to restore the pods cache.
 * @param parameters.podsKey - The pods cache key.
 * @example await installDependencies();
 */
export async function installDependencies({
  workingDirectory,
  recoverCache,
  cacheKey,
  recoverPods,
  podsKey,
  sdkPath,
}: {
  workingDirectory: string;
  recoverCache: boolean;
  recoverPods: boolean;
  cacheKey: string;
  podsKey: string;
  sdkPath: string;
}): Promise<void> {
  if (recoverCache) {
    info('Restoring dependencies cache...');
    const sdkCache = resolve(sdkPath, '.pub-cache');
    const homeCache = resolve(homedir(), '.pub-cache');
    const restoreKey = await restoreCache([homeCache, sdkCache], cacheKey, [
      'pub-cache-',
    ]);
    debug(`Cache restored with key: ${restoreKey ?? 'none'}`);
    if (restoreKey !== cacheKey) {
      saveState('should-cache-dependencies', 'true');
    }
    info(' done');
  }

  if (recoverPods) {
    info('Restoring pods cache...');
    const podsCache = resolve(workingDirectory, 'ios/Pods');
    const restoreKey = await restoreCache([podsCache], podsKey, [
      'pods-cache-',
    ]);
    debug(`Cache restored with key: ${restoreKey ?? 'none'}`);
    if (restoreKey !== podsKey) {
      saveState('should-cache-pods', 'true');
    }
    info(' done');
  }

  info('Installing dependencies...');
  await exec('flutter', ['pub', 'get'], {
    cwd: workingDirectory,
  });
  info(' done');
}
