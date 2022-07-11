import type { Issue } from '../Issue';
import type { Track } from '../../settings/Track';
import { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';

export function releaseItem(issue: Issue, track: Track): Item {
  return new Item(
    {
      [ItemStatus.succeeded]: 'Cleared to create a release',
      [ItemStatus.failed]: 'Not cleared for release',
      [ItemStatus.pending]: 'Waiting for release clearance',
      [ItemStatus.inProgress]: 'Release clearance in progress',
      [ItemStatus.skipped]: 'Release clearance was skipped',
      [ItemStatus.unknown]: 'Release clearance status unknown',
    },
    async () => {
      // check if the issue has a comment that mentions releasing the track by a user that is allowed in the settings
      const released = issue.comments.some(
        (comment) => comment.releasesTrack === track,
      );
      if (released) {
        return ItemStatus.succeeded;
      }
      return ItemStatus.failed;
    },
  );
}
