import type { VersionTrack } from '@onezerocompany/commit';
import { icons } from './icons';
import { ItemStatus } from './ItemStatus';
import { ItemType } from './ItemType';
import { labels } from './labels';
import { updateRelease } from './update/updateRelease';

export interface ItemJSON {
  type: ItemType;
  status: ItemStatus;
  lineStatus: string;
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

  public get json(): ItemJSON {
    return {
      type: this.type,
      status: this.status,
      lineStatus: this.statusLine,
    };
  }

  public get labels(): { [key in ItemStatus]: string } {
    return labels[this.type];
  }

  public get statusLine(): string {
    return `- :${icons[this.status].code}: ${this.labels[this.status]}`;
  }

  public get status(): ItemStatus {
    return this.localStatus;
  }

  public async update(): Promise<ItemStatus> {
    switch (this.type) {
      case ItemType.release:
        this.localStatus = await updateRelease();
        break;
      default:
        throw new Error(`Unknown item type: ${this.type}`);
    }
    return this.status;
  }
}
