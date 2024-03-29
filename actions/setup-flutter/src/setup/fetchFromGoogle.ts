/**
 * @file Contains a function to fetch the Flutter SDK from Google.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { basename } from 'path';
import { info, saveState } from '@actions/core';
import { downloadTool } from '@actions/tool-cache';
import { extract } from './extract';

/**
 * Fetch the Flutter SDK from Google's servers.
 *
 * @param input - Object containing the input parameters.
 * @param input.downloadUrl - The URL to download the SDK from.
 * @param input.destinationFolder - The folder to extract the SDK to.
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
  destinationFolder,
}: {
  downloadUrl: string;
  destinationFolder: string;
}): Promise<void> {
  info(`Downloading...`);
  const downloadedPath = await downloadTool(downloadUrl);
  info(' done\n');

  // Decompress the file
  info('Decompressing...');
  const filename = basename(downloadUrl);
  await extract({
    path: downloadedPath,
    filename,
    destinationFolder,
  });
  info(' done\n');
  saveState('should-cache-sdk', 'true');
}
