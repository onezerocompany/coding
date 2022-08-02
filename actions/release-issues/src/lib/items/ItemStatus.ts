// status of an item in a release
export enum ItemStatus {
  // the item is successfully completed
  succeeded = 'succeeded',
  // the item is waiting for user action
  awaitingItem = 'awaiting-item',
  // the item has failed
  failed = 'failed',
  // the item is waiting on another item to complete
  pending = 'pending',
  // the item is in progress
  inProgress = 'in-progress',
  // the item was skipped
  skipped = 'skipped',
  // the status of the item is unknown
  unknown = 'unknown',
}
