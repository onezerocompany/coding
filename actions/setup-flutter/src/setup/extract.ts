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
 * @param inputs.extension - Archive extension.
 * @returns The path to the extracted folder.
 * @example const extractedFolder = await extract(downloadedPath);
 */
export async function extract({
  path,
  extension,
}: {
  path: string;
  extension: string;
}): Promise<string> {
  if (extension === '.zip') {
    return extractZip(path);
  } else if (extension === '.tar.xz') {
    return extractTar(path);
  }
  throw new Error(`Unsupported file extension: ${extension}`);
}
