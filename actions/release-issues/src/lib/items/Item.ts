import { createHash } from 'crypto';
import type { VersionTrack } from '@onezerocompany/commit';
import { debug } from '@actions/core';
import type { Globals } from '../../globals';
import { icons } from './icons';
import { ItemStatus } from './ItemStatus';
import { ItemType } from './ItemType';
import { labels } from './labels';
import { updateReleaseClearance } from './update/updateReleaseClearance';
import { updateReleaseCreation } from './update/updateReleaseCreation';

export interface ItemJSON {
  id: string;
  type: ItemType;
  status: ItemStatus;
}

export interface ItemMetadata {
  track?: VersionTrack;
}

export class Item {
  public readonly type: ItemType;
  public metadata: ItemMetadata;
  private localStatus = ItemStatus.unknown;

  public constructor(inputs: { type: ItemType; metadata: ItemMetadata }) {
    this.type = inputs.type;
    this.metadata = inputs.metadata;
  }

  public get id(): string {
    // hash the type and metadata
    const hashContent = `${this.type}-${JSON.stringify(this.metadata)}`;
    return createHash('md5').update(hashContent).digest('hex');
  }

  public get json(): ItemJSON {
    return {
      id: this.id,
      type: this.type,
      status: this.status,
    };
  }

  public get labels(): { [key in ItemStatus]: string } {
    return labels[this.type];
  }

  public get statusLine(): string {
    return `- [ ] :${icons[this.status].code}: ${
      this.labels[this.status]
    } <!--ID ${this.id} ID-->`;
  }

  public get status(): ItemStatus {
    return this.localStatus;
  }

  public async update(globals: Globals): Promise<ItemStatus> {
    debug(`updating item: ${this.id}`);
    switch (this.type) {
      case ItemType.releaseClearance:
        this.localStatus = await updateReleaseClearance(globals, this);
        break;
      case ItemType.releaseCreation:
        this.localStatus = await updateReleaseCreation(globals, this);
        break;
      default:
        throw new Error(`Unknown item type: ${this.type}`);
    }
    return this.localStatus;
  }
}
