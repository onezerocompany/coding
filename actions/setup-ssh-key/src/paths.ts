/**
 * @file This file contains the paths to the tools used by the action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { homedir } from 'os';
import { resolve } from 'path';

const isWindows = process.platform === 'win32';
export const tools = {
  git: isWindows ? 'c://progra~1//git//bin//git.exe' : 'git',
  sshAdd: isWindows ? 'c://progra~1//git//usr//bin//ssh-add.exe' : 'ssh-add',
  sshAgent: isWindows
    ? 'c://progra~1//git//usr//bin//ssh-agent.exe'
    : 'ssh-agent',
};

export const sshFolder = resolve(homedir(), '.ssh');
export const sshConfig = resolve(sshFolder, 'config');
export const knownHosts = resolve(sshFolder, 'known_hosts');
