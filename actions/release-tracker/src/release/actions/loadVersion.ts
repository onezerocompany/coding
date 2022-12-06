/**
 * @file Contains functions for loading versioning details.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info } from '@actions/core';
import { Version } from '@onezerocompany/commit';
import type { Context } from '../../context/Context';
import { getLastestRelease } from '../../utils/octokit/getLastestRelease';
import type { ReleaseState } from '../ReleaseState';

/**
 * Loads version info into the release state.
 *
 * @param parameters - Parameters of the function.
 * @param parameters.state - State to apply the loaded info to.
 * @param parameters.context - The shared context.
 * @example await loadVersion({ state });
 */
export async function loadVersion({
  state,
  context,
}: {
  state: ReleaseState;
  context: Context;
}): Promise<void> {
  // Fetch the latest release from GitHub.
  const githubRelease = await getLastestRelease();
  if (typeof githubRelease?.sha === 'string') {
    context.previousRelease.sha = githubRelease.sha;
  }

  const version = Version.fromString(githubRelease?.tag_name ?? '0.0.0');
  context.previousRelease.version = version;

  state.version = version;

  info(
    `Previous release: ${version.displayString} (${
      githubRelease?.sha ?? 'unknown'
    })`,
  );
}
