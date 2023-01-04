/**
 * @file Function that sets up the flutter environment.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { homedir } from 'os';
import {
  addPath,
  debug,
  info,
  isDebug,
  setOutput,
  saveState,
} from '@actions/core';
import { exec } from '@actions/exec';
import { fetchFromGoogle } from './fetchFromGoogle';
import type { FlutterSDKDetails } from './resolveVersionDetails';
import { alreadyInstalled } from './checkInstall';

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
async function fetchSdk({ downloadUrl }: { downloadUrl: string }): Promise<{
  sdkPath: string;
}> {
  info('Fetching Flutter SDK...');
  const destinationFolder = resolve(homedir(), 'flutter');
  info(' not found in cache, downloading...');
  await fetchFromGoogle({
    downloadUrl,
    destinationFolder,
  });
  setOutput('cache-hit', 'false');
  return {
    sdkPath: resolve(destinationFolder, 'flutter'),
  };
}

/** Inputs for the setup. */
export interface SetupInputs extends FlutterSDKDetails {
  /** The directory to install the pods in. */
  podsDirectory: string;
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
 * @param input.podsDirectory - The directory to install the pods in.
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
  podsDirectory,
}: SetupInputs): Promise<string> {
  // Download the sdk

  const versionDetails = {
    version,
    channel,
    platform,
    arch,
    downloadUrl,
  };

  if (alreadyInstalled(versionDetails)) {
    info('Flutter SDK already installed');
    return resolve(homedir(), 'flutter');
  }

  const { sdkPath } = await fetchSdk({ downloadUrl });

  // Install flutter into profiles
  info('Installing...');
  const flutterBin = resolve(sdkPath, 'bin');
  if (isDebug()) {
    // Show contents of flutter bin folder
    debug(`Adding ${flutterBin} to PATH`);
    debug(`Contents of ${flutterBin}:`);
    await exec('ls', ['-l', flutterBin]);
  }
  addPath(flutterBin);
  info(' done\n');

  setOutput('sdk-path', sdkPath);
  saveState('sdk-path', sdkPath);
  saveState('pods-path', podsDirectory);
  setOutput('flutter-bin-path', resolve(flutterBin, 'flutter'));

  return sdkPath;
}
