import type { Track } from '../settings/Track';
import { icons } from './icons';
import { ItemStatus } from './ItemStatus';
import { ItemType } from './ItemType';
import { labels } from './labels';
import { updateRelease } from './update/updateRelease';

export type ItemLabels = { [key in ItemStatus]: string };

export interface ItemJSON {
  type: ItemType;
  status: ItemStatus;
  lineStatus: string;
}

export interface ItemMetadata {
  track?: Track;
}

export class Item {
  public readonly type: ItemType;
  public metadata: ItemMetadata;

  public get json(): ItemJSON {
    return {
      type: this.type,
      status: this.status,
      lineStatus: this.statusLine,
    };
  }

  public get labels(): ItemLabels {
    return labels[this.type];
  }

  public get statusLine(): string {
    return `- ${icons[this.status]} ${this.labels[this.status]}`;
  }

  // status
  private _status = ItemStatus.unknown;
  public get status(): ItemStatus {
    return this._status;
  }

  async update(): Promise<ItemStatus> {
    switch (this.type) {
      case ItemType.release:
        this._status = await updateRelease();
        break;
      default:
        throw new Error(`Unknown item type: ${this.type}`);
    }
    return this.status;
  }

  constructor(inputs: { type: ItemType; metadata: ItemMetadata }) {
    this.type = inputs.type;
    this.metadata = inputs.metadata;
  }
}
