/**
 * @file Function to load the previous state of the release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { debug, info } from '@actions/core';
import { context } from '@actions/github';
import type {
  IssueCommentEvent,
  IssuesEvent,
} from '@octokit/webhooks-definitions/schema';
import type { ReleaseStateJson } from '../release/ReleaseState';
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
  info('Loading previous state of the release...');
  info(`event: ${context.eventName}`);

  let content = '';
  if (context.eventName === 'issues') {
    content = (context.payload as IssuesEvent).issue.body;
  }
  if (context.eventName === 'issue_comment') {
    content = (context.payload as IssueCommentEvent).issue.body;
  }

  debug(`Loaded issue content:\n${content}`);

  if (content.includes('<!-- JSON BEGIN') && content.includes('JSON END -->')) {
    const base64 = getContentBetweenTags(
      '<!-- JSON BEGIN',
      'JSON END -->',
      content,
    );
    const json = Buffer.from(base64, 'base64').toString('utf8');
    debug(`Loaded JSON:\n${json}`);
    return {
      state: ReleaseState.fromJson(JSON.parse(json) as ReleaseStateJson),
      currentIssueText: content,
    };
  }
  return {
    state: null,
    currentIssueText: content,
  };
}
