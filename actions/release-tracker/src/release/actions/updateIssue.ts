/**
 * @file Contains an action to update the issue content.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { context } from '@actions/github';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import { octokit } from '../../utils/octokit/octokit';
import type { ReleaseState } from '../ReleaseState';

/**
 * Updates the issue content.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.state - The release state.
 * @param parameters.manifest - The project manifest.
 * @example await updateIssueAction({ state });
 */
export async function updateIssueAction({
  state,
  manifest,
}: {
  state: ReleaseState;
  manifest: ProjectManifest;
}): Promise<void> {
  if (typeof state.issueTrackerNumber !== 'number') {
    setFailed('Cannot update issue without an existing tracker issue.');
    process.exit(1);
  }

  try {
    await octokit.rest.issues.update({
      ...context.repo,
      issue_number: state.issueTrackerNumber,
      // eslint-disable-next-line id-denylist
      body: state.issueText({ manifest }),
    });
    state.lastSavedJson = state.json;
  } catch {
    setFailed('Failed to update issue content');
    process.exit(1);
  }
}
