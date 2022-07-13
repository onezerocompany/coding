import { toTitleCase } from '../../utils/titlecase';
import { Item } from '../items/Item';
import { ItemType } from '../items/ItemType';
import type { Settings } from '../settings/Settings';
import { Track } from '../settings/Track';
import { TrackSettings } from '../settings/TrackSettings';
import type { ItemSection } from './Issue';

export function sectionsForSettings(settings: Settings): ItemSection[] {
  let sections: ItemSection[] = [];
  for (const track of Object.values(Track)) {
    let items: Item[] = [];
    const trackSettings = new TrackSettings({
      track,
      json: settings,
    });
    if (trackSettings.enabled) {
      if (trackSettings.release) {
        items.push(
          new Item({
            type: ItemType.release,
            metadata: {
              track: track,
            },
          }),
        );
      }
    }
    sections.push({
      title: toTitleCase(track),
      items,
    });
  }
  return sections;
}
