import type { IssueCommentEvent } from '@octokit/webhooks-definitions/schema';
import { context as githubContext } from '@actions/github';
import type { IssueJSON } from '../issue/Issue';
import { Issue } from '../issue/Issue';
import { getContentBetweenTags } from '../../utils/getContentBetweenTags';

export function loadIssueFromContext(): Issue {
  if (githubContext.eventName !== 'issue_comment') {
    throw new Error('This action can only be used in an issue comment context');
  }

  const event = githubContext.payload as IssueCommentEvent;
  const jsonContent = getContentBetweenTags(
    '<!-- JSON BEGIN',
    'JSON END -->',
  )(event.issue.body);
  const json = JSON.parse(jsonContent) as IssueJSON;
  return Issue.fromJson({
    number: githubContext.issue.number,
    json,
  });
}
