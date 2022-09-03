import { debug, setFailed } from '@actions/core';
import { VersionTrack } from '@onezerocompany/commit';
import type { Globals } from '../../globals';
import type { Item } from '../items/Item';

function releaseJson(
  globals: Globals,
  track: VersionTrack,
  tag: string,
): string {
  return JSON.stringify(
    {
      tag,
      track,
      changelog: globals.context.issue.changelogs[track],
      commits: globals.context.issue.commits.map((commit) => ({
        sha: commit.sha,
        message: commit.message.message,
      })),
      publish: false,
    },
    null,
    0,
  );
}

async function apiCall(
  globals: Globals,
  track: VersionTrack,
  tag: string,
): Promise<void> {
  const { data: releaseData } = await globals.octokit.rest.repos.createRelease({
    owner: globals.context.repo.owner,
    repo: globals.context.repo.repo,
    prerelease: track !== VersionTrack.live,
    tag_name: tag,
    target_commitish: globals.context.issue.commitish,
    name: tag,
    generate_release_notes: false,
    // eslint-disable-next-line id-denylist
    body: globals.context.issue.changelogs[track],
  });

  // create an asset with the release json
  await globals.octokit.rest.repos.uploadReleaseAsset({
    owner: globals.context.repo.owner,
    repo: globals.context.repo.repo,
    release_id: releaseData.id,
    name: 'release-manifest.json',
    // eslint-disable-next-line id-denylist
    data: releaseJson(globals, track, tag),
  });

  // create an asset with the changelog
  await globals.octokit.rest.repos.uploadReleaseAsset({
    owner: globals.context.repo.owner,
    repo: globals.context.repo.repo,
    release_id: releaseData.id,
    name: 'CHANGELOG.md',
    // eslint-disable-next-line id-denylist
    data: globals.context.issue.changelogs[track],
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
