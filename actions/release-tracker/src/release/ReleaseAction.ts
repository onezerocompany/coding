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
  /** Load commits for this release. */
  loadCommits = 'loadCommits',
  /** Load version. */
  loadVersion = 'loadVersion',
  /** Attach the tracker label. */
  attachTrackerLabel = 'attachTrackerLabel',
  /** Create environment comment. */
  createEnvironmentComment = 'createEnvironmentComment',
  /** Update issue. */
  updateIssue = 'updateIssue',
  /** Update environment comment. */
  updateEnvironmentComment = 'updateEnvironmentComment',
  /** Perform the deploy itself. */
  deploy = 'deploy',
  /** Assign issue to user. */
  assignIssue = 'assignIssue',
  /** Attaching a file to the release. */
  attachFile = 'attachFile',
}
