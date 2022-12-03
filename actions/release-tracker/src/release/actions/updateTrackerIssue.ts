/**
 * @file Contains a function to update the content of a release tracker issue.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import type { Context } from '../../context/Context';
import { updateIssue } from '../../utils/octokit/updateIssue';
import type { ReleaseState } from '../ReleaseState';

/**
 * Creates a new release tracker issue.
 *
 * @param parameters - The parameters for the action.
 * @param parameters.state - The release state.
 * @param parameters.context - The GitHub context.
 * @example await createTrackerIssueAction({ state });
 */
export async function updateTrackerIssue({
  state,
  context,
}: {
  state: ReleaseState;
  context: Context;
}): Promise<void> {
  if (typeof state.version?.displayString !== 'string') {
    setFailed('Cannot update the tracker issue without a version.');
    process.exit(1);
  }

  if (typeof state.issueTrackerNumber !== 'number') {
    setFailed('Cannot update the tracker issue without an issue number.');
    process.exit(1);
  }

  try {
    const issueText = state.issueText({
      manifest: context.projectManifest,
    });
    await updateIssue({
      issueNumber: state.issueTrackerNumber,
      title: `🚀 Release ${state.version.displayString}`,
      content: issueText,
    });
    if (context.currentIssueText !== issueText) {
      context.currentIssueText = issueText;
    }
  } catch {
    setFailed('Failed to create issue tracker issue.');
    process.exit(1);
  }
}
