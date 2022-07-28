import { debug } from '@actions/core';
import { context as githubContext } from '@actions/github';
import type { IssuesEvent } from '@octokit/webhooks-definitions/schema';
import type { Globals } from '../../globals';
import type { Item } from './Item';
import { ItemStatus } from './ItemStatus';

export function itemChecked(globals: Globals, item: Item): boolean {
  if (
    githubContext.eventName === 'issues' &&
    githubContext.action === 'edited'
  ) {
    const issueEvent = githubContext.payload as IssuesEvent;

    const previousCleared =
      globals.context.issue.sections
        .flatMap((section) => section.items)
        .find((sectionItem) => sectionItem.id === item.id)?.status ===
      ItemStatus.succeeded;

    const currentCleared =
      issueEvent.issue.body
        .split('\n')
        .find((line) => line.includes(`<!--ID ${item.id} ID-->`))
        ?.includes('- [x]') === true;

    debug(`Previous cleared: ${previousCleared ? 'true' : 'false'}`);
    debug(`Current cleared: ${currentCleared ? 'true' : 'false'}`);

    if (!previousCleared && currentCleared) {
      return true;
    }
  }
  return false;
}
