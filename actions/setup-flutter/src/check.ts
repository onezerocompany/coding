/**
 * @file Function for checking if flutter is installed correctly.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { execSync } from 'child_process';
import { info } from '@actions/core';

/**
 * Runs flutter doctor and throws an error if it fails.
 *
 * @throws
 * @example runFlutterDoctor();
 */
export function checkFlutter(): void {
  info('Checking Flutter installation...');
  try {
    execSync('flutter doctor -v', { stdio: 'inherit' });
  } catch {
    throw new Error('Flutter is not installed');
  }
}
