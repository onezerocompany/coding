import { ItemStatus } from './ItemStatus';

export class Item {
  // labels for each item status
  labels: { [key in ItemStatus]: string };

  // update function
  private readonly update: () => Promise<ItemStatus>;

  // status
  private _status = ItemStatus.unknown;
  public get status(): ItemStatus {
    return this._status;
  }

  async updateStatus() {
    const newStatus = await this.update();
    if (this.status !== newStatus) {
      this._status = newStatus;
    }
  }

  constructor(
    labels: { [key in ItemStatus]: string },
    update: () => Promise<ItemStatus>,
  ) {
    this.labels = labels;
    this.update = update;
    this.updateStatus();
  }
}
