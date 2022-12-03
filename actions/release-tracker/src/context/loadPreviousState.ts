/**
 * @file Function to load the previous state of the release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { context } from '@actions/github';
import type {
  IssueCommentEvent,
  IssuesEvent,
} from '@octokit/webhooks-definitions/schema';
import { ReleaseState } from '../release/ReleaseState';
import { getContentBetweenTags } from '../utils/getContentBetweenTags';

/**
 * Loads the previous state of the release from the GitHub context.
 *
 * @returns The previous state of the release.
 * @example const previousState = loadPreviousState();
 */
export function loadPreviousState(): {
  state: ReleaseState | null;
  currentIssueText: string;
} {
  let content = '';
  if (context.eventName === 'issues') {
    content = (context.payload as IssuesEvent).issue.body;
  }
  if (context.eventName === 'issue_comment') {
    content = (context.payload as IssueCommentEvent).issue.body;
  }

  if (content.includes('<!-- JSON BEGIN') && content.includes('JSON END -->')) {
    const json = getContentBetweenTags(
      '<!-- JSON BEGIN',
      'JSON END -->',
      content,
    );
    return {
      state: ReleaseState.fromJson(json),
      currentIssueText: content,
    };
  }
  return {
    state: null,
    currentIssueText: content,
  };
}
