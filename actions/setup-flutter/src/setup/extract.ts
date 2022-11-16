/**
 * @file Contains a function to extract the Flutter SDK.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { extractTar, extractZip } from '@actions/tool-cache';

/**
 * Extracts the Flutter SDK using the tool-cache library.
 *
 * @param inputs - Function inputs.
 * @param inputs.path - Path to the archive.
 * @param inputs.filename - Name of the archive.
 * @returns The path to the extracted folder.
 * @example const extractedFolder = await extract(downloadedPath);
 */
export async function extract({
  path,
  filename,
}: {
  path: string;
  filename: string;
}): Promise<string> {
  if (filename.endsWith('.zip')) {
    return extractZip(path);
  } else if (filename.endsWith('.tar.xz')) {
    // eslint-disable-next-line no-undefined
    return extractTar(path, undefined, 'x');
  }
  throw new Error(`Unsupported file for: ${filename}`);
}
