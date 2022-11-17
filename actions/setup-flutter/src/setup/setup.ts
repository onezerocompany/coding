/**
 * @file Function that sets up the flutter environment.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { homedir } from 'os';
import { addPath, debug, info, isDebug } from '@actions/core';
import { exec } from '@actions/exec';
import { restoreCache } from '@actions/cache';
import type { FlutterArch } from './determineArch';
import type { FlutterPlatform } from './determinePlatform';
import { determineVersion } from './determineVersion';
import { fetchFromGoogle } from './fetchFromGoogle';

/**
 * Function that fetches the Flutter SDK from either the cache or from Google.
 *
 * @param input - Object containing the input parameters.
 * @param input.version - The version of the SDK to fetch.
 * @param input.channel - The channel of the SDK to fetch.
 * @param input.platform - The platform of the SDK to fetch.
 * @param input.arch - The architecture of the SDK to fetch.
 * @param input.downloadUrl - The URL to download the SDK from.
 * @example await setupFlutter({
 *   version: '2.5.3',
 *   channel: 'stable',
 *   platform: 'linux',
 *   arch: 'x64',
 * });
 */
async function fetchSdk({
  version,
  channel,
  platform,
  arch,
  downloadUrl,
}: {
  version: string;
  channel: string;
  platform: FlutterPlatform;
  arch: FlutterArch;
  downloadUrl: string;
}): Promise<{
  sdkPath: string;
}> {
  info('Fetching Flutter SDK...');
  info(' checking cache...');
  const destinationFolder = resolve(homedir(), 'flutter');
  const cacheVersion = `${version}-${channel}`;
  const cachePlatform = `${platform}-${arch}`;
  const cacheKey = `flutter-${cacheVersion}-${cachePlatform}`;
  const restoredCache = await restoreCache([destinationFolder], cacheKey);
  if (restoredCache ?? '') {
    info(' found in cache.\n');
    return {
      sdkPath: resolve(destinationFolder, 'flutter'),
    };
  }
  info(' not found in cache, downloading...');
  await fetchFromGoogle({
    downloadUrl,
    destinationFolder,
    cacheKey,
  });
  return {
    sdkPath: resolve(destinationFolder, 'flutter'),
  };
}

/**
 * Extracts the Flutter SDK in the correct location and adds it to the PATH.
 *
 * @param input - Object containing the input parameters.
 * @param input.version - The version of the SDK to download.
 * @param input.channel - The channel of the SDK to download.
 * @param input.platform - The platform to download the SDK for.
 * @param input.arch - The architecture to download the SDK for.
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
}: {
  version: string;
  channel: string;
  platform: FlutterPlatform;
  arch: FlutterArch;
}): Promise<void> {
  // Download the sdk

  info('Resolving version to install...');
  info(` specified: ${version}`);
  const resolvedVersion = await determineVersion({
    version,
    channel,
    platform,
    arch,
  });
  info(
    ` resolved to: ${resolvedVersion.version} (${resolvedVersion.channel}) for ${resolvedVersion.platform} (${resolvedVersion.arch})`,
  );

  const { sdkPath } = await fetchSdk({
    ...resolvedVersion,
  });

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
}
