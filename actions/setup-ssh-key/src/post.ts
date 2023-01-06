/**
 * @file This file is the entry point for the setup-ssh-key post action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info, setFailed } from '@actions/core';
import { exec } from '@actions/exec';

/**
 * Cleanup the ssh-agent.
 *
 * @example cleanup();
 */
async function cleanup(): Promise<void> {
  try {
    info('Stopping ssh-agent...');
    await exec('ssh-agent', ['-k']);
  } catch (cleanupError: unknown) {
    setFailed(cleanupError as string);
    process.exit(1);
  }
}

// eslint-disable-next-line no-void
void cleanup();
