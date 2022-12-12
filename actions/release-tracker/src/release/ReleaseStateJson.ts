/**
 * @file Contains the release state JSON definition.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { VersionJSON } from '@onezerocompany/commit';
import type { CommitMessageJSON } from '@onezerocompany/commit/dist/lib/message/CommitMessage';
import type { ReleaseEnvironmentJson } from './ReleaseEnvironment';

/** JSON definition of release state. */
export interface ReleaseStateJson {
  /** Environments. */
  environments: ReleaseEnvironmentJson[];
  /** ID of the release object. */
  release_id?: number | undefined;
  /** ID of the related issue tracker. */
  issue_tracker_number?: number | undefined;
  /** Tracker label id. */
  tracker_label_id?: number | undefined;
  /** Version number of release. */
  version?: VersionJSON | undefined;
  /** List of commits. */
  commits?:
    | Array<{
        /** Hash of the commit. */
        hash: string;
        /** Commit message. */
        message: CommitMessageJSON;
      }>
    | undefined;
}
