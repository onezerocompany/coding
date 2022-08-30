import { VersionBump, versionBumpOrder } from '@onezerocompany/commit';
import type { Commit } from '../definitions';

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
