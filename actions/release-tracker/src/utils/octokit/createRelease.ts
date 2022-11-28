/**
 * @file Contains a function to create a new release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { error as logError, info, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { octokit } from './octokit';

/**
 * Creates a release for a `ReleaseState`.
 *
 * @param releaseState - The release state to create a release for.
 * @param releaseState.changelog - The changelog to use for the release.
 * @param releaseState.version - The version to create a release for.
 * @returns The release ID.
 * @example const releaseId = await createRelease(releaseState);
 */
export async function createRelease({
  version,
  changelog,
}: {
  version: string;
  changelog: string;
}): Promise<number> {
  try {
    const release = await octokit.rest.repos.createRelease({
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag_name: version,
      name: version,
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
