import { debug } from '@actions/core';
import { VersionTrack } from '@onezerocompany/commit';
import type { Globals } from '../../../globals';
import type { Item } from '../Item';

export async function createRelease(
  globals: Globals,
  item: Item,
): Promise<void> {
  const { track } = item.metadata;
  if (!track) throw new Error(`No track specified for item: ${item.id}`);

  const tag = globals.context.issue.version.displayString({
    track,
    includeRelease: false,
    includeTrack: true,
  });

  debug(
    `creating release with name ${tag} (commitish: ${globals.context.issue.commitish})`,
  );

  await globals.octokit.rest.repos.createRelease({
    owner: globals.context.repo.owner,
    repo: globals.context.repo.repo,
    prerelease: track !== VersionTrack.live,
    tag_name: tag,
    target_commitish: globals.context.issue.commitish,
    name: tag,
  });
}
