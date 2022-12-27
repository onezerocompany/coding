/**
 * @file Contains a function to load commits into a release state.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info, setOutput } from '@actions/core';
import {
  getBumpForCommitList,
  listCommits,
  Version,
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
  const previousVersion =
    context.previousRelease.version ??
    new Version({
      major: 0,
      minor: 0,
      patch: 0,
    });

  // Fetch commits since last release ref.
  state.commits = listCommits({
    beginHash: context.previousRelease.sha,
  });
  info(
    `Found ${state.commits.length} commits since ${
      context.previousRelease.sha ?? '-'
    }.`,
  );
  for (const commit of state.commits) {
    info(`- ${commit.message.mainLine}`);
  }

  // Determine the next version.
  const bump = getBumpForCommitList(state.commits);
  setOutput('bump', bump);

  if (bump === VersionBump.none) {
    info('No version bump required.');
    process.exit(0);
  }

  state.version = previousVersion.bump(bump);
  setOutput('version', state.version.displayString);
  info(`Next version: ${state.version.displayString} (bumped: ${bump})`);
}
