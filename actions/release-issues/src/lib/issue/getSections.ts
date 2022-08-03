import type { VersionTrack } from '@onezerocompany/commit';
import { orderedTracks } from '@onezerocompany/commit';
import type { Globals } from '../../globals';
import { toTitleCase } from '../../utils/titlecase';
import { Item } from '../items/Item';
import { ItemType } from '../items/ItemType';
import { TrackSettings } from '../settings/TrackSettings';
import type { ItemSection } from './Issue';

function releasingItems(track: VersionTrack): Item[] {
  return [
    new Item({
      type: ItemType.changelogApproved,
      metadata: {
        track,
      },
    }),
    new Item({
      type: ItemType.releaseClearance,
      metadata: {
        track,
      },
    }),
    new Item({
      type: ItemType.releaseCreation,
      metadata: {
        track,
      },
    }),
  ];
}

export function getSections(globals: Globals): ItemSection[] {
  const { settings } = globals;
  const sections: ItemSection[] = [];
  for (const track of orderedTracks) {
    const items: Item[] = [];
    const trackSettings = new TrackSettings({
      forTrack: track,
      json: settings[track],
    });
    if (trackSettings.enabled) {
      items.push(...releasingItems(track));
      sections.push({
        title: toTitleCase(track),
        items,
        track,
      });
    }
  }
  return sections;
}
