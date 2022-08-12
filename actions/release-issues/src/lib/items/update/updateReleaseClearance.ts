import type { Globals } from '../../../globals';
import type { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';
import { wasItemChecked } from '../wasItemChecked';

export async function updateReleaseClearance(
  globals: Globals,
  item: Item,
): Promise<ItemStatus> {
  const { track } = item.metadata;
  if (track) {
    // only continue if the track is specified in the item metadata
    const dependedItems = item.metadata.dependsOn.map((dependsOn) =>
      globals.context.issue.itemForType(dependsOn, track),
    );

    // depending on other items, they should either be succeeded or skipped
    const depenciesSucceeded = dependedItems.every(
      (dependedItem) =>
        dependedItem?.status === ItemStatus.succeeded ||
        dependedItem?.status === ItemStatus.skipped,
    );

    if (depenciesSucceeded) {
      const trackSettings = globals.settings[track];
      // in case the release is not manual, we don't need to do anything
      if (!trackSettings.release.manual) return ItemStatus.skipped;

      if (
        item.status === ItemStatus.succeeded ||
        wasItemChecked(globals, item)
      ) {
        // if the item was checked or was previously succeeded, we mark the item as succeeded
        return ItemStatus.succeeded;
      }
      // in all other cases, we mark the item as pending
      return ItemStatus.pending;
    }
    // the items we depend on are still pending or failed
    return ItemStatus.awaitingItem;
  }
  return ItemStatus.unknown;
}
