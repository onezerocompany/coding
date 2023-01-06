/**
 * @file Contains a function to start the SSH agent and returns the PID and socket path.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { execFileSync } from 'child_process';
import { info } from '@actions/core';
import { tools } from './paths';

/*
 * Regex for reading the output of ssh-agent
 * output:
 *   SSH_AUTH_SOCK=/tmp/ssh-XXXXXXXX/agent.XXXXX; export SSH_AUTH_SOCK;
 *   SSH_AGENT_PID=XXXXX; export SSH_AGENT_PID;
 *   echo Agent pid XXXXX;
 */
const sshAgentRegex = /(?<key>SSH_AUTH_SOCK|SSH_AGENT_PID)=(?<value>\S+);/gu;

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
  const sshAgentOutput = execFileSync(tools.sshAgent).toString();
  const matches = [...sshAgentOutput.matchAll(sshAgentRegex)];
  const env = matches.reduce<Record<string, string>>((acc, match) => {
    const { key, value } = match.groups ?? {};
    if (typeof key === 'string' && typeof value === 'string') {
      return { ...acc, [key]: value };
    }
    return acc;
  }, {});
  return {
    pid: env['SSH_AGENT_PID'],
    socket: env['SSH_AUTH_SOCK'],
  };
}
