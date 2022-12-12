/**
 * @file Actions to attach a file to a release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { attachReleaseFile } from '../../utils/octokit/attachReleaseFile';
import type { ReleaseState } from '../ReleaseState';

/**
 * Attaches a file to a release.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.state - The state.
 * @returns The next action to take.
 * @example await attachFile();
 */
export async function attachFile({
  state,
}: {
  state: ReleaseState;
}): Promise<void> {
  // Make sure the release ID is set
  if (typeof state.releaseId !== 'number') {
    setFailed('No release ID set, but the action was called.');
    process.exit(1);
  }

  // Find the next file to attach
  const file = state.files.find((item) => !item.attached);
  if (!file) {
    setFailed('No file to attach found, but the action was called.');
    process.exit(1);
  }

  // Attach the file
  try {
    await attachReleaseFile({
      path: file.path,
      releaseId: state.releaseId,
    });
    file.attached = true;
  } catch (attachError: unknown) {
    if (attachError instanceof Error) {
      setFailed(`Failed to attach file ${file.path}: ${attachError.message}`);
    } else {
      setFailed(`Failed to attach file ${file.path}`);
    }
    process.exit(1);
  }
}
