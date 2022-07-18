import { ItemStatus } from '../ItemStatus';

export async function updateRelease(): Promise<ItemStatus> {
  return new Promise((resolve) => {
    resolve(ItemStatus.unknown);
  });
}
