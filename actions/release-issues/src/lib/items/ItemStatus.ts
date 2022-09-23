/**
 * @file Contains the definition of the item status.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Status of an item in a release issue. */
export enum ItemStatus {
  /** The item is successfully completed. */
  succeeded = 'succeeded',
  /** The item is waiting for user action. */
  awaitingItem = 'awaiting-item',
  /** The item has failed. */
  failed = 'failed',
  /** The item is waiting on another item to complete. */
  pending = 'pending',
  /** The item is in progress. */
  inProgress = 'in-progress',
  /** The item was skipped. */
  skipped = 'skipped',
  /** The status of the item is unknown. */
  unknown = 'unknown',
}
