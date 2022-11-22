/**
 * @file Contains a function to create a new release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { error as logError, info, setFailed } from '@actions/core';
import { context } from '@actions/github';
import type { ReleaseState } from '../../release/ReleaseState';
import { octokit } from './octokit';

/**
 * Creates a release for a `ReleaseState`.
 *
 * @param releaseState - The release state to create a release for.
 * @param releaseState.releaseState - The release state.
 * @param releaseState.changelog - The changelog to use for the release.
 * @returns The release ID.
 * @example const releaseId = await createRelease(releaseState);
 */
export async function createRelease({
  releaseState,
  changelog,
}: {
  releaseState: ReleaseState;
  changelog: string;
}): Promise<number> {
  if (typeof releaseState.releaseId === 'number') {
    setFailed('Cannot create a release when it already exists.');
    process.exit(1);
  }

  if (typeof releaseState.version?.displayString !== 'string') {
    setFailed('Cannot create a release without a defined version.');
    process.exit(1);
  }

  try {
    const release = await octokit.rest.repos.createRelease({
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag_name: releaseState.version.displayString,
      name: context.ref,
      // eslint-disable-next-line id-denylist
      body: changelog,
      latest: true,
    });
    info('Created release.');
    return release.data.id;
  } catch (createError: unknown) {
    logError(createError as string);
    setFailed('Failed to create the release.');
    process.exit(1);
  }
}
