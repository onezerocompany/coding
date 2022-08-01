import { ItemType } from './ItemType';
import { ItemStatus } from './ItemStatus';

export const labels: { [t in ItemType]: { [s in ItemStatus]: string } } = {
  [ItemType.releaseClearance]: {
    [ItemStatus.succeeded]: 'Release was cleared',
    [ItemStatus.failed]: 'Release was declined',
    [ItemStatus.pending]: 'Waiting for clearance (check the box to release)',
    [ItemStatus.inProgress]: 'Release in progress',
    [ItemStatus.skipped]: 'Release was skipped',
    [ItemStatus.unknown]: 'Release status unknown',
  },
  [ItemType.releaseCreation]: {
    [ItemStatus.succeeded]: 'Release was created successfully',
    [ItemStatus.failed]: 'Release was not created',
    [ItemStatus.pending]: 'Waiting for release creation',
    [ItemStatus.inProgress]: 'Release creation in progress',
    [ItemStatus.skipped]: 'Release creation was skipped',
    [ItemStatus.unknown]: 'Release creation status unknown',
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
