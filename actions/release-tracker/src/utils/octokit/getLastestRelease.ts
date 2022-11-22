/**
 * @file Contains a function to get the latest release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info, setFailed, error as logError } from '@actions/core';
import { context } from '@actions/github';
import { octokit } from './octokit';

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
  info('Fetching latest release...');
  try {
    const release = await octokit.rest.repos.getLatestRelease({
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    info(` Found release ${release.data.tag_name}`);

    return {
      tag_name: release.data.tag_name,
      node_id: release.data.node_id,
    };
  } catch (fetchError: unknown) {
    logError(fetchError as string);
    setFailed('Failed to fetch the latest release.');
    process.exit(1);
  }
}
