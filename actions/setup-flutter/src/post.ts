/**
 * @file Post action entry point.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { existsSync } from 'fs';
import { homedir } from 'os';
import { getBooleanInput, getInput, getState, info } from '@actions/core';
import { saveCache } from '@actions/cache';

/**
 * Entry function for the post action.
 *
 * @example post();
 */
async function post(): Promise<void> {
  const willCache =
    getBooleanInput('cache') && getState('should-cache') === 'true';

  if (!willCache) {
    info('No cache specified, skipping...');
    return;
  }

  const sdkPath = getState('sdk-path');
  const paths = [
    sdkPath,
    resolve(homedir(), '.pub-cache'),
    getState('pods-path'),
  ];

  await saveCache(
    paths.filter((path) => existsSync(path)),
    getInput('cache-key'),
  );
}

// eslint-disable-next-line no-void
void post();
