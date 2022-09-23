/**
 * @file Contains a list of actions that can be performed by 'release-issues'.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Type of action to execute based on the event context. */
export enum Action {
  /** A new issue should be created. */
  create = 'create',
  /** An existing issue should be updated. */
  update = 'update',
  /** The action should not do anything. */
  stop = 'stop',
}
