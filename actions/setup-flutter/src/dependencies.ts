/**
 * @file Dependency related functions.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { restoreCache } from '@actions/cache';
import { exec } from '@actions/exec';
import { info } from '@actions/core';

/**
 * Installs the dependencies for the project.
 *
 * @param parameters - The functions parameters.
 * @param parameters.workingDirectory - The working directory.
 * @param parameters.recoverCache - Whether to restore the cache.
 * @param parameters.cacheKey - The cache key.
 * @param parameters.sdkPath - The SDK path.
 * @example await installDependencies();
 */
export async function installDependencies({
  workingDirectory,
  recoverCache,
  cacheKey,
  sdkPath,
}: {
  workingDirectory: string;
  recoverCache: boolean;
  cacheKey: string;
  sdkPath: string;
}): Promise<void> {
  if (recoverCache) {
    info('Restoring dependencies cache...');
    const sdkCache = resolve(sdkPath, '.pub-cache');
    await restoreCache(['~/.pub-cache', sdkCache], cacheKey);
    info(' done');
  }

  info('Installing dependencies...');
  await exec('flutter', ['pub', 'get'], {
    cwd: workingDirectory,
  });
  info(' done');
}
