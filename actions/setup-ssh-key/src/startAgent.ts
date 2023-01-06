/**
 * @file Contains a function to start the SSH agent and returns the PID and socket path.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { execFileSync } from 'child_process';
import { info } from '@actions/core';
import { tools } from './paths';

/**
 * Starts the SSH agent and returns the PID and socket path.
 *
 * @returns The PID and socket path.
 * @example startAgent();
 */
export function startAgent(): {
  pid: string | undefined;
  socket: string | undefined;
} {
  info('Starting the SSH agent...');
  const sshAgentOutput = execFileSync(tools.sshAgent).toString().split('\n');
  // Read the output of ssh-agent using regex and extract the PID and socket path
  const pid = sshAgentOutput[0]?.match(/SSH_AGENT_PID=(?:\d+)/u)?.[1];
  const socket = sshAgentOutput[1]?.match(/SSH_AUTH_SOCK=(?:\S+)/u)?.[1];
  info(` PID: ${pid ?? '-'}.`);
  info(` Socket: ${socket ?? '-'}.`);
  return { pid, socket };
}
