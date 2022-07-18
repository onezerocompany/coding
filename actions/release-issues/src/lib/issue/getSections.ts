import type { Globals } from '../../globals';
import { toTitleCase } from '../../utils/titlecase';
import { Item } from '../items/Item';
import { ItemType } from '../items/ItemType';
import { Track } from '../settings/Track';
import { TrackSettings } from '../settings/TrackSettings';
import type { ItemSection } from './Issue';

export function getSections(globals: Globals): ItemSection[] {
  const { settings } = globals;
  const sections: ItemSection[] = [];
  for (const track of Object.values(Track)) {
    const items: Item[] = [];
    const trackSettings = new TrackSettings({
      track,
      json: settings[track],
    });
    if (trackSettings.enabled) {
      items.push(
        new Item({
          type: ItemType.release,
          metadata: {
            track,
          },
        }),
      );
    }
    sections.push({
      title: toTitleCase(track),
      items,
    });
  }
  return sections;
}
