/**
 * @file Contains functions to list commits.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { execSync } from 'child_process';
import { Commit } from './Commit';

/**
 * List the commits between two hashes.
 *
 * @param parameters - Parameters for the function.
 * @param parameters.beginHash - Hash of the first commit.
 * @param parameters.endHash - Hash of the last commit.
 * @returns List of commits.
 * @example listCommits({ beginHash, endHash });
 */
export function listCommits({
  beginHash,
  endHash,
}: {
  beginHash?: string | undefined;
  endHash?: string | undefined;
}): Commit[] {
  const begin = beginHash ?? '';
  const output = execSync(
    `git rev-list ${begin ? `${begin}..` : ''}${endHash ?? 'HEAD'}`,
    {
      encoding: 'utf-8',
    },
  );
  const hashes = output.trim().split('\n');
  return hashes.map((hash) => {
    const message = execSync(`git log -1 --format=%B ${hash}`, {
      encoding: 'utf-8',
    });
    return Commit.fromString({ hash, message });
  });
}
