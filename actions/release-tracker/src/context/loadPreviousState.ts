/**
 * @file Function to load the previous state of the release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { context } from '@actions/github';
import type { IssuesEvent } from '@octokit/webhooks-definitions/schema';
import { ReleaseState } from '../release/ReleaseState';
import { getContentBetweenTags } from '../utils/getContentBetweenTags';

/**
 * Loads the previous state of the release from the GitHub context.
 *
 * @returns The previous state of the release.
 * @example const previousState = loadPreviousState();
 */
export function loadPreviousState(): ReleaseState | null {
  if (context.eventName !== 'issues') {
    const event = context.payload as IssuesEvent;

    if (
      event.action !== 'edited' ||
      event.issue.body === event.changes.body?.from
    ) {
      return null;
    }

    const content = getContentBetweenTags(
      '<!-- JSON BEGIN',
      'JSON END -->',
      event.issue.body,
    );

    return ReleaseState.fromJson(content);
  }
  return null;
}
