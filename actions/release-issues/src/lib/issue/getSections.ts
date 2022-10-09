/**
 * @file Contains functions to get the sections for a release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { ReleaseTrack } from '@onezerocompany/project-manager';
import { releaseTracks } from '@onezerocompany/project-manager';
import type { Globals } from '../../globals';
import { toTitleCase } from '../../utils/titlecase';
import { Item } from '../items/Item';
import { ItemType } from '../items/ItemType';
import type { ItemSection } from './Issue';

/**
 * Returns a list of items for a release track.
 *
 * @param track - The release track to get items for.
 * @returns A list of items for the release track.
 * @example const items = getItems(ReleaseTrack.stable);
 */
function releasingItems(track: ReleaseTrack): Item[] {
  return [
    new Item({
      type: ItemType.changelogApproved,
      metadata: {
        track,
        dependsOn: [],
      },
    }),
    new Item({
      type: ItemType.releaseClearance,
      metadata: {
        track,
        dependsOn: [ItemType.changelogApproved],
      },
    }),
    new Item({
      type: ItemType.releaseCreation,
      metadata: {
        track,
        dependsOn: [ItemType.releaseClearance],
      },
    }),
  ];
}

/**
 * Returns a list of sections that contain items.
 *
 * @param globals - Global variables.
 * @returns A list of sections that contain items.
 * @example const sections = getSections(globals);
 */
export function getSections(globals: Globals): ItemSection[] {
  const { projectManifest } = globals;
  const sections: ItemSection[] = [];
  for (const track of releaseTracks) {
    const items: Item[] = [];
    const trackSettings = projectManifest.releaseTrackSettings(track);
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
