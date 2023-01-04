/**
 * @file Checks whether the correct version of the SDK is already installed.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { info, setOutput } from '@actions/core';
import { flutterPath } from '../paths';
import type { VersionDetails } from './resolveVersionDetails';

/**
 * Function that checks the install.
 *
 * @param input - Object containing the input parameters.
 * @param input.version - The version of the SDK to install.
 * @param input.channel - The channel of the SDK to install.
 * @returns Whether the SDK is already installed.
 * @example checkInstall({
 *   version: '2.5.3',
 *   channel: 'stable',
 * });
 */
export function checkInstall({ version, channel }: VersionDetails): boolean {
  // Check if the sdk is already intalled
  if (existsSync(flutterPath)) {
    const check = `Flutter ${version} • channel ${channel}`;
    const currentVersion = execSync(`${flutterPath} --version`).toString();
    info(`Current version:\n${currentVersion}`);
    if (currentVersion.includes(check)) {
      setOutput('cache-hit', 'true');
      return true;
    }
  }
  return false;
}
