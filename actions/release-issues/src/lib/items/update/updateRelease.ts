import type { VersionTrack } from '@onezerocompany/commit';
import type { Globals } from '../../../globals';
import { ItemStatus } from '../ItemStatus';

export async function updateRelease(
  globals: Globals,
  track?: VersionTrack,
): Promise<ItemStatus> {
  return new Promise((resolve) => {
    if (!track) {
      resolve(ItemStatus.unknown);
      return;
    }
    const trackSettings = globals.settings[track];
    if (trackSettings.release.manual) {
      // check if the issue has a comment that releases the track
      if (
        globals.context.issue.comments.some(
          (comment) =>
            comment.releasesTrack.releases &&
            comment.releasesTrack.track === track,
        )
      ) {
        resolve(ItemStatus.succeeded);
      } else {
        resolve(ItemStatus.pending);
      }
    } else {
      resolve(ItemStatus.succeeded);
    }
  });
}
