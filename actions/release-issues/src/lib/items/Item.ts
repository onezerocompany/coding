/**
 * @file
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { createHash } from 'crypto';
import { debug } from '@actions/core';
import type { ReleaseTrack } from '@onezerocompany/project-manager';
import type { Globals } from '../../globals';
import { icons } from './icons';
import { ItemStatus } from './ItemStatus';
import { ItemType } from './ItemType';
import { labels } from './labels';
import {
  updateChangelogApproval,
  updateReleaseClearance,
  updateReleaseCreation,
} from './update';

/** JSON representation of the item. */
export interface ItemJSON {
  /** Unqiue identifier for the item. */
  id: string;
  /** Type of the item. */
  type: ItemType;
  /** Status of the item. */
  status: ItemStatus;
}

/** Metadata related to the item. */
export interface ItemMetadata {
  /** Version track this item belongs to. */
  track?: ReleaseTrack;
  /** Which other items this item depends upon. */
  dependsOn: ItemType[];
}

/** Item for keeping track of a stage in the release flow. */
export class Item {
  /** Which type of item this is. */
  public readonly type: ItemType;

  /** Metadata for this item, containing information needed to update the status. */
  public metadata: ItemMetadata;

  /** Current status of the item. */
  public status = ItemStatus.unknown;

  /**
   * Creates a new item.
   *
   * @param inputs - The inputs to create the item with.
   * @param inputs.type - The type of the item.
   * @param inputs.metadata - The metadata of the item.
   * @example
   *   const item = new Item({
   *     type: ItemType.releaseClearance,
   *     metadata: {
   *       track: 'major',
   *       dependsOn: [ItemType.changelogApproved],
   *     },
   *     status: ItemStatus.unknown,
   *   });
   */
  public constructor(inputs: { type: ItemType; metadata: ItemMetadata }) {
    this.type = inputs.type;
    this.metadata = inputs.metadata;
  }

  /**
   * Hash of the item contents to uniquely identify the item accross runs of the action.
   *
   * @returns The hash of the item contents.
   */
  public get id(): string {
    // Hash the type and metadata

    const hashContent = `${this.type}-${JSON.stringify(this.metadata)}`;
    return createHash('md5').update(hashContent).digest('hex');
  }

  /**
   * Outputs the item as a JSON object.
   *
   * @returns The item as a JSON object.
   */
  public get json(): ItemJSON {
    return {
      id: this.id,
      type: this.type,
      status: this.status,
    };
  }

  /**
   * Get the labels for this item.
   *
   * @returns The labels for this item.
   */
  public get labels(): { [key in ItemStatus]: string } {
    return labels[this.type];
  }

  /**
   * String representation of the item, to be used in the issue body.
   *
   * @returns The string representation of the item.
   */
  public get statusLine(): string {
    return `- [ ] :${icons[this.status].code}: ${
      this.labels[this.status]
    } <!--ID ${this.id} ID-->`;
  }

  /**
   * Update the item status.
   *
   * @param globals - The global variables.
   * @example
   *   await item.updateStatus(globals);
   */
  public async update(globals: Globals): Promise<ItemStatus> {
    debug(`updating item: ${this.id}`);
    switch (this.type) {
      /** Update status of a changelog approval item. */
      case ItemType.changelogApproved:
        this.status = await updateChangelogApproval(globals, this);
        break;
      /** Update status of a release clearance item. */
      case ItemType.releaseClearance:
        this.status = await updateReleaseClearance(globals, this);
        break;
      /** Update status of a release creation item. */
      case ItemType.releaseCreation:
        this.status = ItemStatus.unknown;
        this.status = await updateReleaseCreation(globals, this);
        break;
      /** Any other item cannot be updated. */
      default:
        throw new Error(`Unknown item type`);
    }
    return this.status;
  }
}
