import { ItemType } from './ItemType';
import { ItemStatus } from './ItemStatus';
import type { ItemLabels } from './Item';

export const labels: { [key in ItemType]: ItemLabels } = {
  [ItemType.release]: {
    [ItemStatus.succeeded]: 'Release was cleared successfully',
    [ItemStatus.failed]: 'Release was declined',
    [ItemStatus.pending]: 'Waiting for release',
    [ItemStatus.inProgress]: 'Release in progress',
    [ItemStatus.skipped]: 'Release was skipped',
    [ItemStatus.unknown]: 'Release status unknown',
  },
  [ItemType.coverage]: {
    [ItemStatus.succeeded]: 'Coverage is sufficient',
    [ItemStatus.failed]: 'Coverage is insufficient',
    [ItemStatus.pending]: 'Waiting for coverage',
    [ItemStatus.inProgress]: 'Coverage in progress',
    [ItemStatus.skipped]: 'Coverage was skipped',
    [ItemStatus.unknown]: 'Coverage status unknown',
  },
  [ItemType.tests]: {
    [ItemStatus.succeeded]: 'Tests have all passed',
    [ItemStatus.failed]: 'Tests have failed',
    [ItemStatus.pending]: 'Waiting for tests',
    [ItemStatus.inProgress]: 'Tests in progress',
    [ItemStatus.skipped]: 'Tests were skipped',
    [ItemStatus.unknown]: 'Tests status unknown',
  },
};
