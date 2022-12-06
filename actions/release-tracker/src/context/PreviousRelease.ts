/**
 * @file Contains the previous release definition.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { Version } from '@onezerocompany/commit';

/** Definition of a previous release. */
export interface PreviousRelease {
  /** Hash of the release. */
  sha?: string | undefined;
  /** Version number of the release. */
  version?: Version | undefined;
}
