/**
 * @file Function to create a release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { ChangeLog, ChangeLogType } from '@onezerocompany/commit';
import { createRelease } from '../../utils/octokit/createRelease';
import type { ReleaseState } from '../ReleaseState';

/**
 * Creates a release for the current action.
 *
 * @param parameters - The parameters for the action.
 * @param parameters.state - The release state to create a release for.
 * @example await this.createRelease()
 */
export async function createReleaseAction({
  state,
}: {
  state: ReleaseState;
}): Promise<void> {
  if (!(Array.isArray(state.commits) && state.commits.length > 0)) {
    setFailed('Cannot create a release without commits.');
    process.exit(1);
  }

  if (typeof state.version?.displayString !== 'string') {
    setFailed('Cannot create a release without a version.');
    process.exit(1);
  }

  const changelog = new ChangeLog({
    type: ChangeLogType.internal,
    markdown: true,
    commits: state.commits,
  }).text;

  // Create release.
  const releaseId = await createRelease({
    version: state.version.displayString,
    changelog,
  });
  if (state.releaseId !== releaseId) {
    state.releaseId = releaseId;
  }
}
