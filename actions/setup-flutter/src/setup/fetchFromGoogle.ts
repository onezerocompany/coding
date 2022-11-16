/**
 * @file Contains a function to fetch the Flutter SDK from Google.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { basename } from 'path';
import { rmSync } from 'fs';
import { info } from '@actions/core';
import { cacheDir, downloadTool } from '@actions/tool-cache';
import { extract } from './extract';

/**
 * Fetch the Flutter SDK from Google's servers.
 *
 * @param input - Object containing the input parameters.
 * @param input.downloadUrl - The URL to download the SDK from.
 * @param input.cacheVersion - The version to use for caching.
 * @param input.cachePlatform - The platform to use for caching.
 * @returns The path to the extracted folder.
 * @example
 * fetchFromGoogle({
 *   downloadUrl: 'https://storage.googleapis.com/flutter_infra/releases/stable/linux/flutter_linux_2.5.3-stable.tar.xz',
 *   cacheVersion: '2.5.3',
 *   cachePlatform: 'linux',
 * });
 */
export async function fetchFromGoogle({
  downloadUrl,
  cacheVersion,
  cachePlatform,
}: {
  downloadUrl: string;
  cacheVersion: string;
  cachePlatform: string;
}): Promise<string> {
  info(`Downloading...`);
  const downloadedPath = await downloadTool(downloadUrl);
  info(' done\n');

  // Decompress the file
  info('Decompressing...');
  const filename = basename(downloadUrl);
  const extractedFolder = await extract({
    path: downloadedPath,
    filename,
  });
  info(' done\n');

  // Cache the folder
  info('Caching...');
  const cachedFolder = await cacheDir(
    extractedFolder,
    'flutter',
    cacheVersion,
    cachePlatform,
  );
  info(' done\n');

  // Remove the downloaded file
  info('Cleaning up download...');
  rmSync(downloadedPath);
  info(' done\n');

  return cachedFolder;
}
