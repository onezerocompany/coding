/**
 * @file Index file for the setup-flutter action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { cwd } from 'process';
import { debug, getBooleanInput, getInput, isDebug } from '@actions/core';
import { applyCredentials } from './credentials';
import { setupSdk } from './setup/setup';
import { determineArch } from './setup/determineArch';
import { determinePlatform } from './setup/determinePlatform';
import { checkFlutter } from './check';
import { installDependencies } from './dependencies';

// Inputs

const workingDirectory = getInput('working_directory');
const pubCredentials = getInput('pub_credentials');

/**
 * Function that gets an action input but allows it to be undefined.
 * It will return undefined if the input is empty.
 *
 * @param name - The name of the input.
 * @returns The input value or undefined.
 * @example getOptionalInput('working_directory');
 */
function getOptionalInput(name: string): string | undefined {
  return (
    getInput(name, {
      required: false,
      // eslint-disable-next-line no-undefined
    }) || undefined
  );
}

/**
 * Main function that runs the action.
 *
 * @example run();
 */
async function run(): Promise<void> {
  const directory = resolve(cwd(), workingDirectory);
  debug(`Running in directory: ${directory}`);

  applyCredentials(pubCredentials);

  const normalized = {
    version: getOptionalInput('version') ?? 'latest',
    channel: getOptionalInput('channel') ?? 'stable',
    platform: determinePlatform({
      platform: getOptionalInput('platform'),
    }),
    arch: determineArch({
      arch: getOptionalInput('arch'),
    }),
  };

  const sdkPath = await setupSdk({ ...normalized });
  if (isDebug()) checkFlutter();

  const shouldInstallDependencies = getBooleanInput('install-dependencies');
  if (shouldInstallDependencies) {
    await installDependencies({
      workingDirectory: directory,
      recoverCache: getBooleanInput('cache-dependencies'),
      cacheKey: getInput('dependencies-cache-key'),
      sdkPath,
    });
  }
}

// eslint-disable-next-line no-void
void run();
