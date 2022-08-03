import { debug, setFailed } from '@actions/core';
import { VersionTrack } from '@onezerocompany/commit';
import type { Globals } from '../../globals';
import type { Item } from '../items/Item';

async function apiCall(
  globals: Globals,
  track: VersionTrack,
  tag: string,
): Promise<void> {
  await globals.octokit.rest.repos.createRelease({
    owner: globals.context.repo.owner,
    repo: globals.context.repo.repo,
    prerelease: track !== VersionTrack.live,
    tag_name: tag,
    target_commitish: globals.context.issue.commitish,
    name: tag,
  });
}

export async function createRelease(
  globals: Globals,
  item: Item,
): Promise<{ created: boolean }> {
  const { track } = item.metadata;
  if (track) {
    const tag = globals.context.issue.version.displayString({
      track,
      includeRelease: false,
      includeTrack: true,
    });

    debug(
      `creating release with name ${tag} (commitish: ${globals.context.issue.commitish})`,
    );

    try {
      await apiCall(globals, track, tag);
      return { created: true };
    } catch (createError: unknown) {
      setFailed(`Failed to create release: ${createError as string}`);
      return { created: false };
    }
  } else {
    setFailed('No track specified for release creation');
    return { created: false };
  }
}
