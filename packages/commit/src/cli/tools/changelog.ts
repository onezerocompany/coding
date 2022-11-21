/**
 * @file Cli tool for listing commits between two hashes.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { stdout } from 'process';
import { ChangeLogType } from '../../lib/categories/categories';
import { ChangeLog } from '../../lib/changelogs/ChangeLog';
import { listCommits } from '../../lib/commits/listCommits';

/**
 * Prints a changelog to stdout based on a begin and end ref.
 *
 * @param beginHash - The begin ref.
 * @param endHash - The end ref.
 * @param options - The options for the changelog.
 * @param options.markdown - Whether to print the changelog in markdown format.
 * @param options.type - The type of changelog to print.
 * @example tool('ref');
 */
export function tool(
  beginHash: string,
  endHash?: string,
  options?: {
    markdown?: boolean;
    type?: string;
  },
): void {
  const commits = listCommits({ beginHash, endHash });
  stdout.write(
    new ChangeLog({
      markdown: options?.markdown ?? false,
      type:
        options?.type === 'internal'
          ? ChangeLogType.internal
          : ChangeLogType.external,
      commits,
    }).text,
  );
}
