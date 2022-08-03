import type { Globals } from '../../../globals';
import type { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';
import { wasItemChecked } from '../wasItemChecked';

export async function updateChangelogApproval(
  globals: Globals,
  item: Item,
): Promise<ItemStatus> {
  const { track } = item.metadata;
  if (track) {
    const trackSettings = globals.settings[track];
    if (!trackSettings.release.manual) return ItemStatus.skipped;

    // either changelog was already approved or the line has a checkmark in it
    if (item.status === ItemStatus.succeeded || wasItemChecked(globals, item)) {
      return ItemStatus.succeeded;
    }
    return ItemStatus.pending;
  }
  return ItemStatus.unknown;
}
