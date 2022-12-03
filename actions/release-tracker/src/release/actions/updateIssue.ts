/**
 * @file Contains an action to update the issue content.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { context as githubContext } from '@actions/github';
import type { Context } from '../../context/Context';
import { octokit } from '../../utils/octokit';
import type { ReleaseState } from '../ReleaseState';

/**
 * Updates the issue content.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.state - The release state.
 * @param parameters.context - The action context.
 * @example await updateIssueAction({ state });
 */
export async function updateIssue({
  state,
  context,
}: {
  state: ReleaseState;
  context: Context;
}): Promise<void> {
  if (typeof state.issueTrackerNumber !== 'number') {
    setFailed('Cannot update issue without an existing tracker issue.');
    process.exit(1);
  }

  try {
    const issueText = state.issueText({ manifest: context.projectManifest });
    await octokit.rest.issues.update({
      ...githubContext.repo,
      issue_number: state.issueTrackerNumber,
      // eslint-disable-next-line id-denylist
      body: issueText,
    });
    if (context.currentIssueText !== issueText) {
      context.currentIssueText = issueText;
    }
  } catch {
    setFailed('Failed to update issue content');
    process.exit(1);
  }
}
