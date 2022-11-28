/**
 * @file Contains functions for loading versioning details.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info } from '@actions/core';
import { Version } from '@onezerocompany/commit';
import { getLastestRelease } from '../../utils/octokit/getLastestRelease';
import type { ReleaseState } from '../ReleaseState';

/**
 * Loads version info into the release state.
 *
 * @param parameters - Parameters of the function.
 * @param parameters.state - State to apply the loaded info to.
 * @example await loadVersion({ state });
 */
export async function loadVersion({
  state,
}: {
  state: ReleaseState;
}): Promise<void> {
  // Fetch the latest release from GitHub.
  const previousRelease = await getLastestRelease();
  if (typeof previousRelease?.target_commitish === 'string') {
    state.previousRef = previousRelease.target_commitish;
  }
  state.previousVersion = Version.fromString(
    previousRelease?.tag_name ?? '0.0.0',
  );
  state.version = state.previousVersion;
  info(`Previous release: ${state.previousVersion.displayString}`);
}
