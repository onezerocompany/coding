/**
 * @file Actions a release can take.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Possible actions a release can take. */
export enum ReleaseAction {
  /** No action is required. */
  none = 'none',
  /** The release should be created. */
  createRelease = 'createRelease',
  /** The issue should be created. */
  createTrackerIssue = 'createIssue',
}
