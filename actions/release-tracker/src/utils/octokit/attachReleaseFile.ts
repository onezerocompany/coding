/**
 * @file Function for calling the GitHub API to attach a file to a release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { readFileSync } from 'fs';
import { basename } from 'path';
import { context } from '@actions/github';
import { octokit } from '../octokit';

/**
 * Attaches a file to a release.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.releaseId - The ID of the release to attach the file to.
 * @param parameters.path - The path to the file to attach.
 * @returns The attachment ID.
 * @example await attachFile({ file, releaseId });
 */
export async function attachReleaseFile({
  path,
  releaseId,
}: {
  path: string;
  releaseId: number;
}): Promise<number> {
  const fileData = readFileSync(path).toString();
  const { data: attachResult } = await octokit.rest.repos.uploadReleaseAsset({
    ...context.repo,
    release_id: releaseId,
    name: basename(path),
    // eslint-disable-next-line id-denylist
    data: fileData,
  });
  return attachResult.id;
}
