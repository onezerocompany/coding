/**
 * @file Contains the function to set the outputs for the action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setOutput } from '@actions/core';
import type { ReleaseState } from '../release/ReleaseState';

/**
 * Sets the outputs for the action.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.release - The release state.
 * @example setOutputs({ release });
 */
export function setOutputs({ release }: { release: ReleaseState }): void {
  setOutput('release-id', release.releaseId);
  setOutput('issue-id', release.issueTrackerNumber);
  setOutput('json', release.json);
}
