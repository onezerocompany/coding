import type { Context } from '../Context';
import { Track } from '../settings/Track';
import type { Item } from './Item';

export class Status {
  sections: {
    title: string;
    items: Item[];
  }[];

  constructor(context: Context) {
    const sections = [];
    for (const track of Object.values(Track)) {
      const trackSettings = context.settings[track];
      if (!trackSettings.enabled) continue;
      const section = {
        title: track,
        items: [],
      };
      if (trackSettings.release.manual) {
        section.items.push();
      }
      sections.push(section);
    }
    this.sections = sections;
  }
}
