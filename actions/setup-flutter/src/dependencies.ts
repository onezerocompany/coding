/**
 * @file Dependency related functions.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { exec } from '@actions/exec';
import { info } from '@actions/core';

/**
 * Installs the dependencies for the project.
 *
 * @param parameters - The functions parameters.
 * @param parameters.workingDirectory - The working directory.
 * @example await installDependencies();
 */
export async function installDependencies({
  workingDirectory,
}: {
  workingDirectory: string;
}): Promise<void> {
  info('Installing dependencies...');
  await exec('flutter', ['pub', 'get'], {
    cwd: workingDirectory,
  });
  info(' done');
}
