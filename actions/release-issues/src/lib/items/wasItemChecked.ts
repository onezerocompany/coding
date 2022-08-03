import { debug } from '@actions/core';
import { context as githubContext } from '@actions/github';
import type { IssuesEvent } from '@octokit/webhooks-definitions/schema';
import type { Globals } from '../../globals';
import type { Item } from './Item';
import { ItemStatus } from './ItemStatus';

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
