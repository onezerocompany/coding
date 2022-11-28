/**
 * @file
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { createIssue } from '../../utils/octokit/createIssue';
import type { ReleaseState } from '../ReleaseState';

/**
 * Creates a new release tracker issue.
 *
 * @param parameters - The parameters for the action.
 * @param parameters.state - The release state.
 * @example await createTrackerIssueAction({ state });
 */
export async function createTrackerIssueAction({
  state,
}: {
  state: ReleaseState;
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

  await createIssue({
    title: `🚀 Release ${state.version.displayString}`,
    content: `This issue is used to track the release of version ${state.version.displayString}.`,
  });
}
