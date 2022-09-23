/**
 * @file Contains functions to load the issue from the context.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { IssuesEvent } from '@octokit/webhooks-definitions/schema';
import { context as githubContext } from '@actions/github';
import type { IssueJSON } from '../issue/Issue';
import { Issue } from '../issue/Issue';
import { getContentBetweenTags } from '../../utils/getContentBetweenTags';

/**
 * Loads the issue from the GitHub Actions context.
 *
 * @returns An issue object.
 * @throws In case the event is not supported.
 * @example loadIssueFromContext();
 */
export function loadIssueFromContext(): Issue {
  if (githubContext.eventName !== 'issues') {
    throw new Error('This action can only be used in an issue event');
  }

  const event = githubContext.payload as IssuesEvent;
  if (
    event.action !== 'edited' ||
    event.issue.body === event.changes.body?.from
  ) {
    throw new Error('This action can only be used on an edited issue');
  }

  const jsonContent = getContentBetweenTags(
    '<!-- JSON BEGIN',
    'JSON END -->',
    event.issue.body,
  );

  const json = JSON.parse(jsonContent) as IssueJSON;
  return Issue.fromJson({
    number: githubContext.issue.number,
    json,
  });
}
