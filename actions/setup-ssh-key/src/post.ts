/**
 * @file This file is the entry point for the setup-ssh-key post action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { execFileSync } from 'child_process';
import { info, setFailed } from '@actions/core';
import { tools } from './paths';

/**
 * Cleanup the ssh-agent.
 *
 * @example cleanup();
 */
async function cleanup(): Promise<void> {
  try {
    info('Stopping ssh-agent...');
    execFileSync(tools.sshAgent, ['-k']);
  } catch (cleanupError: unknown) {
    setFailed(cleanupError as string);
    process.exit(1);
  }
}

// eslint-disable-next-line no-void
void cleanup();
