/**
 * @file Contains a definition of a commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { CommitMessage } from '@onezerocompany/commit';

/** Represents a commit that was made on a branch. */
export interface Commit {
  /** Sha hash of the commit, can be used to uniquely identify the commit. */
  sha: string;
  /** Message that was included with the commit, used to parse what type of change the commit contains. */
  message: CommitMessage;
}
