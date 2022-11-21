/**
 * @file Contains interfaces to octokit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { context, getOctokit } from '@actions/github';
import type { ReleaseState } from '../release/ReleaseState';
import { getOptionalInput } from './getOptionalInput';

const token = getOptionalInput('token') ?? process.env['GITHUB_TOKEN'];
if (typeof token !== 'string') {
  throw new Error('No GitHub token provided.');
}
export const octokit = getOctokit(token);
export const { graphql } = octokit;

/**
 * Fetches the latest release for the current repo.
 *
 * @returns The latest release, or null if there is no release.
 * @example const release = await getLastestRelease();
 */
export async function getLastestRelease(): Promise<{
  node_id: string;
  tag_name: string;
}> {
  const release = await octokit.rest.repos.getLatestRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
  });
  return {
    tag_name: release.data.tag_name,
    node_id: release.data.node_id,
  };
}

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
  if (
    typeof releaseState.releaseId === 'string' ||
    typeof releaseState.version !== 'string'
  ) {
    throw new Error(
      'Cannot create a release for a release state that already has a release ID or no version.',
    );
  }

  const release = await octokit.rest.repos.createRelease({
    owner: context.repo.owner,
    repo: context.repo.repo,
    tag_name: releaseState.version,
    name: context.ref,
    // eslint-disable-next-line id-denylist
    body: changelog,
    latest: true,
  });
  return release.data.id;
}
