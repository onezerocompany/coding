/**
 * @file This file contains the logic to configure the SSH keys.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { execFileSync } from 'child_process';
import { writeFileSync, appendFileSync } from 'fs';
import { createHash } from 'crypto';
import { resolve } from 'path';
import { info } from '@actions/core';
import { sshConfig, sshFolder, tools } from './paths';

/**
 * Configure the SSH keys.
 *
 * @example configureKeys();
 */
export async function configureKeys(): Promise<void> {
  // Configure keys
  info('Configuring keys...');
  const addedKeys = execFileSync(tools.sshAdd, ['-L'])
    .toString()
    .trim()
    .split(/\r?\n/u);

  for (const key of addedKeys) {
    info(` - ${key}`);
    const parts = /\bgithub\.com[:/](?:[_.a-z0-9-]+\/[_.a-z0-9-]+)/iu.exec(key);
    if (!parts || parts.length === 0) return;

    const hash = createHash('sha256').update(key).digest('hex');
    const repo = (parts[1] ?? '').replace(/\.git$/u, '');
    const keyPath = resolve(sshFolder, `key-${hash}`);
    writeFileSync(keyPath, `${key}\n`, { mode: 0o600 });

    execFileSync(tools.git, [
      'config',
      '--global',
      '--replace-all',
      `url."git@key-${hash}.github.com:${repo}".insteadOf`,
      `https://github.com/${repo}`,
    ]);

    execFileSync(tools.git, [
      'config',
      '--global',
      '--add',
      `url."git@key-${hash}.github.com:${repo}".insteadOf`,
      `git@github.com:${repo}`,
    ]);

    execFileSync(tools.git, [
      'config',
      '--global',
      '--add',
      `url."git@key-${hash}.github.com:${repo}".insteadOf`,
      `ssh://git@github.com/${repo}`,
    ]);

    const keyConfig =
      `\nHost key-${hash}.github.com\n` +
      `  HostName github.com\n` +
      `  IdentityFile ${keyPath}\n` +
      `  IdentitiesOnly yes\n`;

    appendFileSync(sshConfig, keyConfig);

    info(` - ${keyPath}`);
  }
}
