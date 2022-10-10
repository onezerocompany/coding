/**
 * @file Contains functions to update the status of a release clearance item.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { ReleaseTrack } from '@onezerocompany/project-manager';
import type { Globals } from '../../../globals';
import type { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';
import { wasItemChecked } from '../wasItemChecked';

/**
 * Check if the items the release clearance depends on are all done.
 *
 * @param globals - The global variables.
 * @param item - The item to check.
 * @param track - The track to check.
 * @example dependenciesDone(globals, item, 'major');
 */
export async function dependenciesDone(
  globals: Globals,
  item: Item,
  track: ReleaseTrack,
): Promise<boolean> {
  // Only continue if the track is specified in the item metadata
  const dependedItems = item.metadata.dependsOn
    .map((dependsOn) => globals.context.issue.itemForType(dependsOn, track))
    .filter((dependedItem: Item | null) => dependedItem !== null) as Item[];

  // Make sure the depended items are updated
  const updates = dependedItems.map(async (dependedItem) =>
    dependedItem.update(globals),
  );
  await Promise.all(updates);

  // Depending on other items, they should either be succeeded or skipped
  const depenciesSucceeded = dependedItems.every(
    (dependedItem) =>
      dependedItem.status === ItemStatus.succeeded ||
      dependedItem.status === ItemStatus.skipped,
  );

  return depenciesSucceeded;
}

/**
 * Update the status of a release clearance item.
 *
 * @param globals - The global variables.
 * @param item - The item to update.
 * @returns The updated item status.
 * @example updateReleaseClearance(globals, item);
 */
export async function updateReleaseClearance(
  globals: Globals,
  item: Item,
): Promise<ItemStatus> {
  // Return status if status type is definitive result
  if (item.status === ItemStatus.succeeded || item.status === ItemStatus.failed)
    return item.status;

  const { track } = item.metadata;
  if (track) {
    if (await dependenciesDone(globals, item, track)) {
      const trackSettings = globals.projectManifest.releaseTrackSettings(track);
      // In case the release is not manual, we don't need to do anything
      if (trackSettings.release.autoRelease) return ItemStatus.skipped;

      if (wasItemChecked(globals, item)) {
        // If the item was checked or was previously succeeded, we mark the item as succeeded
        return ItemStatus.succeeded;
      }
      // In all other cases, we mark the item as pending
      return ItemStatus.pending;
    }
    // The items we depend on are still pending or failed
    return ItemStatus.awaitingItem;
  }
  return ItemStatus.unknown;
}
