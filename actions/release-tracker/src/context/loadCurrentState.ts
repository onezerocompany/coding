/**
 * @file Load the current release from an issue.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { context } from '@actions/github';
import type { IssuesEvent } from '@octokit/webhooks-definitions/schema';
import { ReleaseState } from '../release/ReleaseState';
import { getContentBetweenTags } from '../utils/getContentBetweenTags';

/**
 * Load the current release from an issue.
 *
 * @returns The current release.
 * @example const release = loadCurrentRelease();
 */
export function loadCurrentState(): ReleaseState {
  let state = new ReleaseState();
  if (context.eventName === 'issues') {
    const event = context.payload as IssuesEvent;
    if (typeof event.issue.body === 'string') {
      const content = getContentBetweenTags(
        '<!-- JSON BEGIN',
        'JSON END -->',
        event.issue.body,
      );
      const jsonState = ReleaseState.fromJson(content);
      if (jsonState !== null) {
        state = jsonState;
      }
    }
  }
  return state;
}
