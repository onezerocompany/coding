/**
 * @file Contains a function to create a release tracker issue.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import type { Context } from '../../context/Context';
import { createIssue } from '../../utils/octokit/createIssue';
import type { ReleaseState } from '../ReleaseState';

/**
 * Creates a new release tracker issue.
 *
 * @param parameters - The parameters for the action.
 * @param parameters.state - The release state.
 * @param parameters.context - The shared context.
 * @example await createTrackerIssueAction({ state });
 */
export async function createTrackerIssue({
  state,
  context,
}: {
  state: ReleaseState;
  context: Context;
}): Promise<void> {
  if (typeof state.issueTrackerNumber === 'string') {
    setFailed(
      `Cannot create a new issue tracker issue because one already exists.`,
    );
    process.exit(1);
  }

  if (typeof state.version?.displayString !== 'string') {
    setFailed('Cannot create a new issue tracker issue without a version.');
    process.exit(1);
  }

  try {
    const issueText = state.issueText({
      manifest: context.projectManifest,
    });

    const issueNumber = await createIssue({
      title: `🚀 Release ${state.version.displayString}`,
      content: issueText,
    });
    if (state.issueTrackerNumber !== issueNumber) {
      state.issueTrackerNumber = issueNumber;
    }
    if (context.currentIssueText !== issueText) {
      context.currentIssueText = issueText;
    }
  } catch {
    setFailed('Failed to create issue tracker issue.');
    process.exit(1);
  }
}
