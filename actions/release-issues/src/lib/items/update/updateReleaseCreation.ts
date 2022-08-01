import type { Globals } from '../../../globals';
import type { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';
import { ItemType } from '../ItemType';

const query = `
  query release(
    $owner:String!,
    $repo:String!,
    $tag:String!
  ) {
    repository(
      owner:$owner,
      name:$repo
    ) {
      release(tagName:$tag) {
        name
        tagName
        isDraft
      }
    }
  }
`;

interface QueryResponse {
  repository?: {
    release?: {
      name: string;
      tagName: string;
      isDraft: boolean;
    };
  };
}

async function releaseExists(globals: Globals, tag: string): Promise<boolean> {
  try {
    const { repository }: QueryResponse = await globals.graphql(query, {
      owner: globals.context.repo.owner,
      repo: globals.context.repo.repo,
      tag,
    });
    if (
      repository?.release?.name === tag &&
      repository.release.tagName === tag &&
      !repository.release.isDraft
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function updateReleaseCreation(
  globals: Globals,
  item: Item,
): Promise<ItemStatus> {
  const { track } = item.metadata;
  if (!track) return ItemStatus.unknown;

  const clearanceItem = globals.context.issue.itemForType(
    ItemType.releaseClearance,
    track,
  );

  if (
    item.status !== ItemStatus.succeeded ||
    clearanceItem?.status !== ItemStatus.succeeded
  ) {
    const tag = globals.context.issue.version.displayString({
      track,
      includeRelease: false,
      includeTrack: true,
    });

    if (await releaseExists(globals, tag)) {
      return ItemStatus.succeeded;
    }

    return ItemStatus.pending;
  }
  return item.status;
}
