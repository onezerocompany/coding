/**
 * @file Function for calling the GitHub API to attach a file to a release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { readFileSync } from 'fs';
import { basename, extname } from 'path';
import { context } from '@actions/github';
import AdmZip from 'adm-zip';
import { octokit } from '../octokit';

/**
 * Returns the data of a file or folder.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.path - The path to the file or folder.
 * @example const fileData = await fileData({ path });
 */
async function readFileData({
  path,
}: {
  path: string;
}): Promise<{ fileData: string; isZip: boolean }> {
  const fileName = basename(path);
  const fileExtension = extname(path);
  const isFolder = !fileExtension;

  if (isFolder) {
    const zip = new AdmZip();
    zip.addLocalFolder(path, fileName);
    return {
      fileData: zip.toBuffer().toString('base64'),
      isZip: true,
    };
  }
  return {
    fileData: readFileSync(path, 'base64'),
    isZip: false,
  };
}

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
  const fileName = basename(path);
  const { fileData, isZip } = await readFileData({ path });
  const { data: attachResult } = await octokit.rest.repos.uploadReleaseAsset({
    ...context.repo,
    release_id: releaseId,
    name: isZip ? `${fileName}.zip` : fileName,
    // eslint-disable-next-line id-denylist
    data: fileData,
  });
  return attachResult.id;
}
