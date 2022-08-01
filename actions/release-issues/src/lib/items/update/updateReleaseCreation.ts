import type { Globals } from '../../../globals';
import type { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';

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

export async function updateReleaseCreation(
  globals: Globals,
  item: Item,
): Promise<ItemStatus> {
  if (item.status !== ItemStatus.succeeded) {
    const { track } = item.metadata;
    if (!track) return ItemStatus.unknown;

    const tag = globals.context.issue.version.displayString({
      track,
      includeRelease: false,
      includeTrack: true,
    });

    const { repository }: QueryResponse = await globals.graphql({
      query,
    });
    if (
      repository?.release?.name === tag &&
      repository.release.tagName === tag &&
      !repository.release.isDraft
    ) {
      return ItemStatus.succeeded;
    }
    return ItemStatus.pending;
  }
  return item.status;
}
