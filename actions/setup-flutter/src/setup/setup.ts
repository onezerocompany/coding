/**
 * @file Function that sets up the flutter environment.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { addPath, debug, info, isDebug } from '@actions/core';
import { exec } from '@actions/exec';
import { find } from '@actions/tool-cache';
import type { FlutterArch } from './determineArch';
import type { FlutterPlatform } from './determinePlatform';
import { determineVersion } from './determineVersion';
import { fetchFromGoogle } from './fetchFromGoogle';

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

  info('Fetching Flutter SDK...');
  info(' checking cache...');
  const cacheVersion = `${resolvedVersion.version}-${resolvedVersion.channel}`;
  const cachePlatform = `${resolvedVersion.platform}-${resolvedVersion.arch}`;
  let cachedFolder = find('flutter', cacheVersion, cachePlatform);
  if (cachedFolder) {
    info(' found in cache.\n');
  } else {
    info(' not found in cache, downloading...');
    cachedFolder = await fetchFromGoogle({
      downloadUrl: resolvedVersion.downloadUrl,
      cacheVersion,
      cachePlatform,
    });
  }

  // Install flutter into profiles
  info('Installing...');
  const flutterBin = resolve(cachedFolder, 'flutter', 'bin');
  if (isDebug()) {
    // Show contents of flutter bin folder
    debug(`Adding ${flutterBin} to PATH`);
    debug(`Contents of ${flutterBin}:`);
    await exec('ls', ['-l', flutterBin]);
  }
  addPath(flutterBin);
  info(' done\n');

  // Accept licenses by piping yes to the command
  info('Accepting licenses...');
  await exec('yes | flutter doctor --android-licenses');
  info(' done\n');
}
