/**
 * @file Contains a list of labels to be used in the release action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

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
};
