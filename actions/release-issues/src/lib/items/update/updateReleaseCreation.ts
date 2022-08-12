import type { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';

export async function updateReleaseCreation(
  // globals: Globals,
  item: Item,
): Promise<ItemStatus> {
  if (item.status === ItemStatus.succeeded) {
    return item.status;
  }

  return ItemStatus.unknown;
}
