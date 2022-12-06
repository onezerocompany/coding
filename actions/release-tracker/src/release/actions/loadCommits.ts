/**
 * @file Contains a function to load commits into a release state.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info, setFailed } from '@actions/core';
import {
  getBumpForCommitList,
  listCommits,
  VersionBump,
} from '@onezerocompany/commit';
import type { Context } from '../../context/Context';
import type { ReleaseState } from '../ReleaseState';

/**
 * Loads commits into a release state.
 *
 * @param parameters - Parameters of the function.
 * @param parameters.state - State to apply the loaded info to.
 * @param parameters.context - The shared context.
 * @example await loadCommits();
 */
export async function loadCommits({
  state,
  context,
}: {
  state: ReleaseState;
  context: Context;
}): Promise<void> {
  if (typeof context.previousRelease.sha !== 'string') {
    setFailed('Previous reference not set.');
    process.exit(1);
  }

  if (typeof context.previousRelease.version?.displayString !== 'string') {
    setFailed('Previous version not set.');
    process.exit(1);
  }

  // Fetch commits since last release ref.
  state.commits = listCommits({
    beginHash: context.previousRelease.sha,
  });
  info(
    `Found ${state.commits.length} commits since ${context.previousRelease.sha}.`,
  );
  for (const commit of state.commits) {
    info(`- ${commit.message.mainLine}`);
  }

  // Determine the next version.
  const bump = getBumpForCommitList(state.commits);

  if (bump === VersionBump.none) {
    info('No version bump required.');
    process.exit(0);
  }

  state.version = context.previousRelease.version.bump(bump);
  info(`Next version: ${state.version.displayString} (bumped: ${bump})`);
}
