import type { Globals } from '../../../globals';
import type { TrackSettings } from '../../settings/TrackSettings';
import type { Item } from '../Item';
import { ItemStatus } from '../ItemStatus';
import { createRelease } from '../../queries/createRelease';
import { ItemType } from '../ItemType';
import { wasItemChecked } from '../wasItemChecked';

function state(
  trackSettings: TrackSettings,
  item: Item,
  globals: Globals,
): ItemStatus {
  if (trackSettings.release.manual) {
    // either the release is already released or the line has a checkmark in it
    if (item.status === ItemStatus.succeeded || wasItemChecked(globals, item)) {
      return ItemStatus.succeeded;
    }
    return ItemStatus.pending;
  }
  return ItemStatus.skipped;
}

export async function updateReleaseClearance(
  globals: Globals,
  item: Item,
): Promise<ItemStatus> {
  const { track } = item.metadata;
  if (!track) return ItemStatus.unknown;
  const trackSettings = globals.settings[track];
  const newState = state(trackSettings, item, globals);
  if (newState === ItemStatus.succeeded && newState !== item.status) {
    const { created } = await createRelease(globals, item);
    const createItem = globals.context.issue.itemForType(
      ItemType.releaseCreation,
      track,
    );
    if (createItem)
      createItem.status = created ? ItemStatus.succeeded : ItemStatus.failed;
  }
  return newState;
}
