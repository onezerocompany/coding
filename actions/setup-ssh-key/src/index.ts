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

  // Get PID and socket path from ssh-agent
  info('Starting ssh-agent...');
  const sshAgentOutput = execFileSync(tools.sshAgent).toString().split('\n');
  for (const line of sshAgentOutput) {
    const matches = /^(?:SSH_AUTH_SOCK|SSH_AGENT_PID)=(?:.*); export/u.exec(
      line,
    );
    if (
      matches &&
      typeof matches[1] === 'string' &&
      typeof matches[2] === 'string'
    ) {
      info(`Exporting ${matches[1]}...`);
      exportVariable(matches[1], matches[2]);
    }
  }

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
