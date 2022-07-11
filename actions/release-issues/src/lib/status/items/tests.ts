import type { Track } from '../../settings/Track';
import { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';

export const tests = new Item(
  {
    [ItemStatus.succeeded]: 'Tests have passed',
    [ItemStatus.failed]: 'Tests have failed',
    [ItemStatus.pending]: 'Waiting for tests',
    [ItemStatus.inProgress]: 'Tests in progress',
    [ItemStatus.skipped]: 'Tests were skipped',
    [ItemStatus.unknown]: 'Tests status unknown',
  },
  async () => {
    return ItemStatus.unknown;
  },
);

export function testsItem(track: Track) {
  return new Item(
    {
      [ItemStatus.succeeded]: `Tests have passed (${track})`,
      [ItemStatus.failed]: `Tests have failed (${track})`,
      [ItemStatus.pending]: `Waiting for tests (${track})`,
      [ItemStatus.inProgress]: `Tests in progress (${track})`,
      [ItemStatus.skipped]: `Tests were skipped (${track})`,
      [ItemStatus.unknown]: `Tests status unknown (${track})`,
    },
    async () => {
      // read from the pushed commit
      return ItemStatus.unknown;
    },
  );
}
