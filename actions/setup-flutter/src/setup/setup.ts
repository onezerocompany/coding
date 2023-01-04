/**
 * @file Function that sets up the flutter environment.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { homedir } from 'os';
import { addPath, debug, info, isDebug, setOutput } from '@actions/core';
import { exec } from '@actions/exec';
import { binPath, sdkPath } from '../paths';
import { fetchFromGoogle } from './fetchFromGoogle';
import type { FlutterSDKDetails } from './resolveVersionDetails';
import { checkInstall } from './checkInstall';

/**
 * Function that fetches the Flutter SDK from either the cache or from Google.
 *
 * @param input - Object containing the input parameters.
 * @param input.downloadUrl - The URL to download the SDK from.
 * @example await setupFlutter({
 *   version: '2.5.3',
 *   channel: 'stable',
 *   platform: 'linux',
 *   arch: 'x64',
 * });
 */
async function fetchSdk({
  downloadUrl,
}: {
  downloadUrl: string;
}): Promise<void> {
  info('Fetching Flutter SDK...');
  await fetchFromGoogle({
    downloadUrl,
    destinationFolder: sdkPath,
  });
  setOutput('cache-hit', 'false');
}

/** Inputs for the setup. */
export interface SetupInputs extends FlutterSDKDetails {
  /** The URL to download the SDK from. */
  downloadUrl: string;
}

/**
 * Extracts the Flutter SDK in the correct location and adds it to the PATH.
 *
 * @param input - Object containing the input parameters.
 * @param input.version - The version of the SDK to download.
 * @param input.channel - The channel of the SDK to download.
 * @param input.platform - The platform to download the SDK for.
 * @param input.arch - The architecture to download the SDK for.
 * @param input.downloadUrl - The URL to download the SDK from.
 * @example
 * setup({
 *   version: 'latest',
 *   channel: 'stable',
 * })
 * @example
 * setup({
 *   version: '2.5.3',
 *   channel: 'stable',
 * })
 */
export async function setupSdk({
  version,
  channel,
  platform,
  arch,
  downloadUrl,
}: SetupInputs): Promise<string> {
  // Download the sdk

  const versionDetails = {
    version,
    channel,
    platform,
    arch,
    downloadUrl,
  };

  if (checkInstall(versionDetails)) {
    info('Flutter SDK already installed');
    return resolve(homedir(), 'flutter');
  }

  await fetchSdk({ downloadUrl });

  // Install flutter into profiles
  info('Installing...');
  if (isDebug()) {
    // Show contents of flutter bin folder
    debug(`Adding ${binPath} to PATH`);
    debug(`Contents of ${binPath}:`);
    await exec('ls', ['-l', binPath]);
  }
  addPath(binPath);
  info(' done\n');

  return sdkPath;
}
