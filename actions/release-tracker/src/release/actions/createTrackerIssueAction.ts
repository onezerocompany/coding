/**
 * @file
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import { createIssue } from '../../utils/octokit/createIssue';
import type { ReleaseState } from '../ReleaseState';

/**
 * Creates a new release tracker issue.
 *
 * @param parameters - The parameters for the action.
 * @param parameters.state - The release state.
 * @param parameters.manifest - The project manifest.
 * @example await createTrackerIssueAction({ state });
 */
export async function createTrackerIssueAction({
  state,
  manifest,
}: {
  state: ReleaseState;
  manifest: ProjectManifest;
}): Promise<void> {
  if (typeof state.issueTrackerId === 'string') {
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
    const issueId = await createIssue({
      title: `🚀 Release ${state.version.displayString}`,
      content: state.issueText({
        manifest,
      }),
    });
    if (state.issueTrackerId !== issueId) {
      state.issueTrackerId = issueId;
      state.lastSavedJson = state.json;
    }
  } catch {
    setFailed('Failed to create issue tracker issue.');
    process.exit(1);
  }
}
