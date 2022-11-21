/**
 * @file Function for determining the version bump out of a list of commits.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { VersionBump, versionBumpOrder } from '../versions/VersionBump';
import type { Commit } from './Commit';

/**
 * Determines the version bump out of a list of commits.
 *
 * @param commits - The list of commits.
 * @returns The version bump.
 * @example const bump = getBumpFromCommitList(commits);
 */
export function getBumpForCommitList(commits: Commit[]): VersionBump {
  let bump = VersionBump.none;
  for (const commit of commits) {
    const commitBump = commit.message.category.versioning.bump;
    // Assign to bump if the bump is higher in the bump order
    if (versionBumpOrder.indexOf(commitBump) > versionBumpOrder.indexOf(bump)) {
      bump = commitBump;
    }
  }
  return bump;
}
