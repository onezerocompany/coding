/**
 * @file Release label attach action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { context } from '@actions/github';
import { octokit } from '../../utils/octokit';
import type { ReleaseState } from '../ReleaseState';

/**
 * Attaches a 'release-tracker' label to the issue tracker.
 *
 * @param parameters - Parameters of the function.
 * @param parameters.state - The release state.
 * @example await attachTrackerLabel({state})
 */
export async function attachTrackerLabel({
  state,
}: {
  state: ReleaseState;
}): Promise<void> {
  if (typeof state.issueTrackerNumber !== 'number') {
    throw new Error(
      'Cannot attach tracker label without an existing tracker issue.',
    );
  }

  /*
   * Find a label with the name 'release-tracker' and attach it to the issue.
   * if not found, create it.
   */

  const labelName = 'release-tracker';
  let labelId: number | null = null;

  try {
    const label = await octokit.rest.issues.getLabel({
      ...context.repo,
      name: labelName,
    });
    labelId = label.data.id;
  } catch {
    try {
      const label = await octokit.rest.issues.createLabel({
        ...context.repo,
        name: labelName,
        color: 'bcf5db',
      });
      labelId = label.data.id;
    } catch {
      setFailed(`Failed to create '${labelName}' label`);
      process.exit(1);
    }
  }

  if (typeof labelId !== 'number') {
    setFailed(`Failed to find '${labelName}' label`);
    process.exit(1);
  }

  await octokit.rest.issues.addLabels({
    ...context.repo,
    issue_number: state.issueTrackerNumber,
    labels: [labelName],
  });

  if (state.trackerLabelId !== labelId) {
    state.trackerLabelId = labelId;
  }
}
