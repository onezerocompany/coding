/**
 * @file Setup functionality for the setup-flutter action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { platform, homedir } from 'os';
import { createWriteStream, rmSync } from 'fs';
import { get } from 'https';
import { execSync } from 'child_process';
import { addPath } from '@actions/core';

/**
 * Detects the current platform the action is running on.
 *
 * @returns The platform the action is running on.
 * @throws If the platform is not supported (unknown).
 * @example
 *   const platform = currentPlatform();
 *   // Returns: 'macos'
 */
function currentPlatform(): string {
  switch (platform()) {
    /** Apple macOS. */
    case 'darwin':
      return 'macos';
    /** Microsoft Windows. */
    case 'win32':
      return 'windows';
    /** Linux. */
    case 'linux':
      return 'linux';
    /** Any others are unsupported. */
    default:
      throw new Error(`Unsupported platform: ${platform()}`);
  }
}

/**
 * Function to determine the correct download URL for the Flutter SDK.
 *
 * @param input - Object containing the input parameters.
 * @param input.platform - The platform to download the SDK for.
 * @param input.version - The version of the SDK to download.
 * @param input.channel - The channel of the SDK to download.
 * @returns The download URL for the Flutter SDK.
 * @example
 * const url = urlForVersion({ platform: 'macos', version: '2.5.3', channel: 'stable' });
 * // Returns 'https://(truncated)/stable/macos/flutter_macos_2.5.3-stable.zip'
 */
function urlForVersion(input: {
  platform: string;
  version: string;
  channel: string;
}): {
  url: string;
  file: string;
} {
  const base = 'https://storage.googleapis.com/flutter_infra_release/releases';
  const ext = input.platform === 'linux' ? 'tar.xz' : 'zip';
  const folder = `${input.channel}/${input.platform}`;
  return {
    url: `${base}/${folder}/flutter_${input.platform}_${input.version}-${input.channel}.${ext}`,
    file: `${homedir()}/flutter_${input.platform}_${input.version}-${
      input.channel
    }.${ext}`,
  };
}

/**
 * Downloads the Flutter SDK.
 *
 * @param input - Object containing the input parameters.
 * @param input.url - The download URL for the Flutter SDK.
 * @param input.file - The file path to download the SDK to.
 * @returns Promise that resolves when the download is complete, or rejects if the download fails.
 * @example
 * downloadFile({
 *   url: 'https://(truncated)/stable/macos/flutter_macos_2.5.3-stable.zip',
 *   file: '/Users/runner/flutter_macos_2.5.3-stable.zip',
 * })
 */
async function downloadFile(input: {
  url: string;
  file: string;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(input.file);
    stream.on('finish', resolve);
    stream.on('error', reject);
    get(input.url, (fileResponse) => {
      fileResponse.pipe(stream);
    }).on('error', reject);
  });
}

/**
 * Extracts the Flutter SDK in the correct location and adds it to the PATH.
 *
 * @param input - Object containing the input parameters.
 * @param input.version - The version of the SDK to download.
 * @param input.channel - The channel of the SDK to download.
 * @example
 * setup({
 *   version: '2.5.3',
 *   channel: 'stable',
 * })
 */
export async function setup(input: {
  version: string;
  channel: string;
}): Promise<void> {
  // Download the sdk

  const download = urlForVersion({ ...input, platform: currentPlatform() });
  process.stdout.write(`Downloading ${download.url}...`);
  await downloadFile(download);
  process.stdout.write(' done\n');

  // Decompress the file
  process.stdout.write('Decompressing...');
  if (download.file.endsWith('.zip')) {
    execSync(`unzip ${download.file} -d ${homedir()}`, { stdio: 'ignore' });
  } else if (download.file.endsWith('.tar.xz')) {
    execSync(`tar -xf ${download.file} -C ${homedir()}`, { stdio: 'ignore' });
  } else {
    throw new Error(`Unsupported file extension: ${download.file}`);
  }
  process.stdout.write(' done\n');

  // Remove the downloaded file
  process.stdout.write('Cleaning up...');
  rmSync(download.file);
  process.stdout.write(' done\n');

  // Install flutter into profiles
  addPath(`${homedir()}/flutter/bin`);
}
