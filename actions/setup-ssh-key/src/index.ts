/**
 * @file This file is the entry point for the setup-ssh-key action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { execFileSync } from 'child_process';
import { mkdirP } from '@actions/io';
import { exportVariable, getInput, info, setFailed } from '@actions/core';
import { sshFolder, tools } from './paths';
import { setupGitHubKeys } from './setupGitHubKeys';
import { configureKeys } from './configureKeys';
import { startAgent } from './startAgent';

/**
 * The main entry point for the action.
 *
 * @example main();
 */
async function main(): Promise<void> {
  // Get the private key from the inputs
  const privateKey = getInput('ssh-key');
  if (!privateKey) {
    setFailed('No private key provided');
    return;
  }

  // Create the .ssh folder
  info('Creating .ssh folder...');
  await mkdirP(sshFolder);

  // Add GitHub.com keys to known_hosts
  await setupGitHubKeys();

  // Start the SSH agent and export the socket path
  const { socket, pid } = startAgent();
  exportVariable('SSH_AUTH_SOCK', socket);
  exportVariable('SSH_AGENT_PID', pid);

  // Add the private key to the agent
  info('Adding private key to the agent...');
  privateKey.split(/(?=-----BEGIN)/u).forEach((key) => {
    execFileSync(tools.sshAdd, ['-'], { input: `${key.trim()}\n` });
  });

  // Configure the SSH config
  await configureKeys();
}

try {
  // eslint-disable-next-line no-void
  void main();
} catch (setupError: unknown) {
  setFailed(setupError as string);
  process.exit(1);
}
