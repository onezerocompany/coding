import { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';

export const coverage = new Item(
  {
    [ItemStatus.succeeded]: 'Coverage is sufficient',
    [ItemStatus.failed]: 'Coverage is insufficient',
    [ItemStatus.pending]: 'Waiting for coverage',
    [ItemStatus.inProgress]: 'Coverage in progress',
    [ItemStatus.skipped]: 'Coverage was skipped',
    [ItemStatus.unknown]: 'Coverage status unknown',
  },
  async () => {
    return ItemStatus.unknown;
  },
);

export function coverageItem(threshold: number): Item {
  return new Item(
    {
      [ItemStatus.succeeded]: `Coverage is sufficient (${threshold}%)`,
      [ItemStatus.failed]: `Coverage is insufficient (${threshold}%)`,
      [ItemStatus.pending]: `Waiting for coverage`,
      [ItemStatus.inProgress]: `Coverage in progress`,
      [ItemStatus.skipped]: `Coverage was skipped`,
      [ItemStatus.unknown]: `Coverage status unknown`,
    },
    async () => {
      // read this from the pushed commit
      return ItemStatus.unknown;
    },
  );
}
