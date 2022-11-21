/**
 * @file Cli tool for listing commits between two hashes.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { stdout } from 'process';
import { listCommits } from '../../lib/commits/listCommits';

/**
 * Prints a list of commits between two refs.
 *
 * @param beginHash - The begin ref.
 * @param endHash - The end ref.
 * @example tool('ref');
 */
export function tool(beginHash: string, endHash?: string): void {
  const commits = listCommits({ beginHash, endHash });
  for (const commit of commits) {
    stdout.write(`${commit.message.message.split('\n')[0] ?? ''}\n`);
  }
}
