/**
 * @file Functions for determining the bump type for a release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { VersionBump, versionBumpOrder } from '@onezerocompany/commit';
import type { Commit } from '../definitions';

/**
 * Determine the version bump based on a list of commits.
 *
 * @param commits - List of commits.
 * @returns The determined version bump.
 * @example determineBump(commits);
 */
export function determineBump(commits: Commit[]): VersionBump {
  let bump = VersionBump.none;
  for (const commit of commits) {
    const commitBump = commit.message.category.versioning.bump;
    if (versionBumpOrder.indexOf(commitBump) > versionBumpOrder.indexOf(bump)) {
      bump = commitBump;
    }
  }
  return bump;
}
