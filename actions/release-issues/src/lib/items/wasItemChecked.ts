/**
 * @file Contains the function to check if an item was checked.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { debug } from '@actions/core';
import { context as githubContext } from '@actions/github';
import type { IssuesEvent } from '@octokit/webhooks-definitions/schema';
import type { Globals } from '../../globals';
import type { Item } from './Item';
import { ItemStatus } from './ItemStatus';

/**
 * Checks if the item was already checked in a previous run.
 *
 * @param globals - The global variables.
 * @param item - The item to check.
 * @returns Whether the item was already checked.
 * @example wasItemChecked(globals, item);
 */
export function wasItemChecked(globals: Globals, item: Item): boolean {
  if (githubContext.eventName === 'issues') {
    const issueEvent = githubContext.payload as IssuesEvent;

    const previousCleared =
      globals.context.issue.itemForId(item.id)?.status === ItemStatus.succeeded;

    const currentCleared =
      issueEvent.issue.body
        .split('\n')
        .find((line) => line.includes(`<!--ID ${item.id} ID-->`))
        ?.includes('- [x]') === true;

    debug(`Previous cleared: ${previousCleared ? 'true' : 'false'}`);
    debug(`Current cleared: ${currentCleared ? 'true' : 'false'}`);

    if (!previousCleared && currentCleared) return true;
  }
  return false;
}
