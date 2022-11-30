/**
 * @file Contains a function to load commits into a release state.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info, setFailed } from '@actions/core';
import { getBumpForCommitList, listCommits } from '@onezerocompany/commit';
import type { ReleaseState } from '../ReleaseState';

/**
 * Loads commits into a release state.
 *
 * @param parameters - Parameters of the function.
 * @param parameters.state - State to apply the loaded info to.
 * @example await loadCommits();
 */
export async function loadCommits({
  state,
}: {
  state: ReleaseState;
}): Promise<void> {
  if (typeof state.previousSha !== 'string') {
    setFailed('Previous reference not set.');
    process.exit(1);
  }

  if (typeof state.previousVersion?.displayString !== 'string') {
    setFailed('Previous version not set.');
    process.exit(1);
  }

  // Fetch commits since last release ref.
  state.commits = listCommits({
    beginHash: state.previousSha,
  });
  info(`Found ${state.commits.length} commits since ${state.previousSha}.`);
  for (const commit of state.commits) {
    info(`- ${commit.message.mainLine}`);
  }

  // Determine the next version.
  state.bump = getBumpForCommitList(state.commits);
  state.version = state.previousVersion.bump(state.bump);
  info(`Next version: ${state.version.displayString} (bumped: ${state.bump})`);
}