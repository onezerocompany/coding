/**
 * @file Contains functions for updating changelog approval status items.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { Globals } from '../../../globals';
import type { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';
import { wasItemChecked } from '../wasItemChecked';

/**
 * Update the changelog approval item.
 *
 * @param globals - The globals.
 * @param item - The item.
 * @returns The updated item status.
 * @example updateChangelogApproval(globals, item);
 */
export async function updateChangelogApproval(
  globals: Globals,
  item: Item,
): Promise<ItemStatus> {
  const { track } = item.metadata;
  if (track) {
    const trackSettings = globals.projectManifest.releaseTrackSettings(track);
    if (trackSettings.release.autoRelease) return ItemStatus.skipped;

    // Either changelog was already approved or the line has a checkmark in it
    if (item.status === ItemStatus.succeeded || wasItemChecked(globals, item)) {
      return ItemStatus.succeeded;
    }
    return ItemStatus.pending;
  }
  return ItemStatus.unknown;
}
