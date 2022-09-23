/**
 * @file Contains functions to update release creation items.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { Globals } from '../../../globals';
import { createRelease, releaseExists } from '../../queries';
import type { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';

/**
 * Updates the status of a release creation item.
 *
 * @param globals - Global variables.
 * @param item - Item to update.
 * @example
 *   await updateReleaseCreation(globals, item);
 */
export async function updateReleaseCreation(
  globals: Globals,
  item: Item,
): Promise<ItemStatus> {
  if (item.status === ItemStatus.succeeded) return item.status;

  const { track } = item.metadata;
  if (!track) return item.status;

  for (const dependedItem of item.metadata.dependsOn) {
    const status = globals.context.issue.itemForType(
      dependedItem,
      track,
    )?.status;
    if (status !== ItemStatus.succeeded && status !== ItemStatus.skipped) {
      return ItemStatus.awaitingItem;
    }
  }

  // Check if the version exists with an api request
  if (await releaseExists(globals, item)) return ItemStatus.succeeded;

  // Create the release
  const { created } = await createRelease(globals, item);
  if (created) return ItemStatus.succeeded;

  return ItemStatus.pending;
}
