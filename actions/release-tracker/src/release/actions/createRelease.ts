/**
 * @file Function to create a release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { ChangeLog, ChangelogDomain } from '@onezerocompany/commit';
import type { Context } from '../../context/Context';
import { createRelease as githubCreateRelease } from '../../utils/octokit/createRelease';
import type { ReleaseState } from '../ReleaseState';

/**
 * Creates a release for the current action.
 *
 * @param parameters - The parameters for the action.
 * @param parameters.state - The release state to create a release for.
 * @param parameters.context - The context of the action.
 * @example await this.createRelease()
 */
export async function createRelease({
  state,
  context,
}: {
  state: ReleaseState;
  context: Context;
}): Promise<void> {
  if (!(Array.isArray(state.commits) && state.commits.length > 0)) {
    setFailed('Cannot create a release without commits.');
    process.exit(1);
  }

  if (typeof state.version?.displayString !== 'string') {
    setFailed('Cannot create a release without a version.');
    process.exit(1);
  }

  /*
   * If there is only one commit and its hash is the same as the previous release, then we are
   * releasing the same commit again, so we don't need to create a new release
   */
  if (
    state.commits.length === 1 &&
    state.commits[0]?.hash === context.previousRelease.sha
  ) {
    setFailed('Cannot create a release for the same commit.');
    process.exit(1);
  }

  const changelog = new ChangeLog({
    domain: ChangelogDomain.internal,
    markdown: true,
    commits: state.commits,
  }).text;

  // Create release.
  const releaseId = await githubCreateRelease({
    version: state.version.displayString,
    changelog,
  });
  if (state.releaseId !== releaseId) {
    state.releaseId = releaseId;
  }
}
