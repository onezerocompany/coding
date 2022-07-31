import type { Globals } from '../../../globals';
import type { Item } from '../Item';

export async function createRelease(
  globals: Globals,
  item: Item,
): Promise<void> {
  const { track } = item.metadata;
  if (!track) {
    throw new Error(`No track specified for item: ${item.id}`);
  }

  const releaseName = globals.context.issue.version.displayString({
    track,
    includeRelease: false,
    includeTrack: true,
  });

  const tag = globals.context.issue.version.displayString({
    track,
    includeRelease: false,
    includeTrack: false,
  });

  await globals.octokit.rest.repos.createRelease({
    owner: globals.context.repo.owner,
    repo: globals.context.repo.repo,
    tag_name: tag,
    target_commitish: globals.context.issue.commitish,
    name: releaseName,
  });
}
