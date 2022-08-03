import { ItemStatus } from './ItemStatus';
import { ItemType } from './ItemType';

export const labels: { [t in ItemType]: { [s in ItemStatus]: string } } = {
  [ItemType.changelogApproved]: {
    [ItemStatus.succeeded]: 'Changelog approved',
    [ItemStatus.failed]: 'Failed changelog approval',
    [ItemStatus.pending]: 'Changelog waiting for approval',
    [ItemStatus.awaitingItem]: 'Changelog approval waiting on other item',
    [ItemStatus.inProgress]: 'Changelog approval in progress',
    [ItemStatus.skipped]: 'Skipped changelog approval',
    [ItemStatus.unknown]: 'Changelog approval unknown',
  },
  [ItemType.releaseClearance]: {
    [ItemStatus.succeeded]: 'Release was cleared',
    [ItemStatus.failed]: 'Release was declined',
    [ItemStatus.pending]: 'Waiting for clearance (check the box to release)',
    [ItemStatus.awaitingItem]: 'Waiting for changelog to be approved',
    [ItemStatus.inProgress]: 'Release in progress',
    [ItemStatus.skipped]: 'Release clearance was skipped',
    [ItemStatus.unknown]: 'Release status unknown',
  },
  [ItemType.releaseCreation]: {
    [ItemStatus.succeeded]: 'Release was created successfully',
    [ItemStatus.failed]: 'Release was not created',
    [ItemStatus.pending]: 'Waiting for release creation',
    [ItemStatus.awaitingItem]: 'Waiting for release clearance',
    [ItemStatus.inProgress]: 'Release creation in progress',
    [ItemStatus.skipped]: 'Release creation was skipped',
    [ItemStatus.unknown]: 'Release creation status unknown',
  },
  [ItemType.coverage]: {
    [ItemStatus.succeeded]: 'Coverage is sufficient',
    [ItemStatus.failed]: 'Coverage is insufficient',
    [ItemStatus.pending]: 'Waiting for coverage',
    [ItemStatus.awaitingItem]: 'Waiting for tests to pass',
    [ItemStatus.inProgress]: 'Coverage in progress',
    [ItemStatus.skipped]: 'Coverage was skipped',
    [ItemStatus.unknown]: 'Coverage status unknown',
  },
  [ItemType.tests]: {
    [ItemStatus.succeeded]: 'Tests have all passed',
    [ItemStatus.failed]: 'Tests have failed',
    [ItemStatus.pending]: 'Waiting for tests',
    [ItemStatus.awaitingItem]: 'Waiting for another checklist item to complete',
    [ItemStatus.inProgress]: 'Tests in progress',
    [ItemStatus.skipped]: 'Tests were skipped',
    [ItemStatus.unknown]: 'Tests status unknown',
  },
};
