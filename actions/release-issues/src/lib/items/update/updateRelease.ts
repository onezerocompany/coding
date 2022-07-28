import type { Globals } from '../../../globals';
import type { Item } from '../Item';
import { itemChecked } from '../itemChecked';
import { ItemStatus } from '../ItemStatus';

export async function updateRelease(
  globals: Globals,
  item: Item,
): Promise<ItemStatus> {
  return new Promise((resolve) => {
    const { track } = item.metadata;
    if (!track) {
      resolve(ItemStatus.unknown);
      return;
    }
    const trackSettings = globals.settings[track];
    if (trackSettings.release.manual) {
      // either the release is already released or the line has a checkmark in it
      if (item.status === ItemStatus.succeeded) {
        resolve(ItemStatus.succeeded);
      } else if (itemChecked(globals, item)) {
        resolve(ItemStatus.succeeded);
      } else {
        resolve(ItemStatus.pending);
      }
    } else {
      resolve(ItemStatus.succeeded);
    }
  });
}
