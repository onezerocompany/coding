/**
 * @file Assign issue action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import type { Context } from '../../context/Context';
import { assignIssue as assignIssueGitHub } from '../../utils/octokit/assignIssue';
import type { ReleaseState } from '../ReleaseState';

/**
 * Assigns the issue to the user.
 *
 * @param parameters - The parameters for the action.
 * @param parameters.state - The release state.
 * @param parameters.context - The release context.
 * @example await assignIssueAction({ state });
 */
export async function assignIssue({
  state,
  context,
}: {
  state: ReleaseState;
  context: Context;
}): Promise<void> {
  if (typeof state.issueTrackerNumber !== 'number') {
    setFailed('Cannot assign issue without a tracker issue.');
    process.exit(1);
  }

  const missingAssignees = context.projectManifest.users
    .filter(
      (user) => user.assign_issue && !state.assignees.includes(user.username),
    )
    .map((user) => user.username);

  if (missingAssignees.length === 0) {
    setFailed('No users to assign issue to.');
    process.exit(1);
  }

  try {
    await assignIssueGitHub({
      issueNumber: state.issueTrackerNumber,
      assignees: missingAssignees,
    });
    for (const username of missingAssignees) {
      state.assignees.push(username);
    }
  } catch {
    setFailed('Failed to assign issue.');
    process.exit(1);
  }
}
