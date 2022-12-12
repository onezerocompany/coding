/**
 * @file Contains the function to get the paths of all the release files.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { sync as glob } from 'glob';
import { getOptionalInput } from '../utils/getOptionalInput';

/** Definition of a release file. */
export interface ReleaseFile {
  /** Whether the file is attached to the release. */
  attached: boolean;
  /** The path of the file. */
  path: string;
}

/**
 * Function that reads the optional input "files" (new-line delimited) and resolves the glob patterns.
 * If no input is provided, it returns an empty array. If the input is provided,
 * it returns an array of paths and throws an error when the glob pattern does not
 * match any files or a file is not found. The.
 *
 * @returns The paths of the release files.
 * @example getReleaseFiles();
 */
export function loadReleaseFiles(): Array<{ attached: boolean; path: string }> {
  const files = getOptionalInput('files');
  if (files === null) return [];
  return files
    .split(/\r?\n/u)
    .map((pattern) => pattern.trim())
    .filter((pattern) => pattern)
    .reduce<string[]>((acc, pattern) => {
      const resolvedFiles = glob(pattern);
      if (resolvedFiles.length === 0) {
        setFailed(`No files found for glob pattern: ${pattern}`);
        process.exit(1);
      }
      return [...acc, ...resolvedFiles];
    }, [])
    .map((path) => ({ attached: false, path }));
}
