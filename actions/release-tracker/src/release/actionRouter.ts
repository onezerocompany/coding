/**
 * @file Router for release actions.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info } from '@actions/core';
import { createReleaseAction } from './actions/createReleaseAction';
import { createTrackerIssueAction } from './actions/createTrackerIssueAction';
import { loadCommits } from './actions/loadCommits';
import { loadVersion } from './actions/loadVersion';
import { ReleaseAction } from './ReleaseAction';
import type { ReleaseState } from './ReleaseState';

/**
 * Function that runs a `ReleaseAction`.
 *
 * @param paramters - Parameters for the function.
 * @param paramters.action - Action to run.
 * @param paramters.state - State to apply the loaded info to.
 * @example actionRouter({ action });
 */
export async function actionRouter({
  state,
  action,
}: {
  state: ReleaseState;
  action: ReleaseAction;
}): Promise<void> {
  info(`Running next action... ${action}`);
  switch (action) {
    /** Loading version details. */
    case ReleaseAction.loadVersion:
      await loadVersion({ state });
      break;
    /** Loading commits. */
    case ReleaseAction.loadCommits:
      await loadCommits({ state });
      break;
    /** Trigger a release creation. */
    case ReleaseAction.createRelease:
      await createReleaseAction({ state });
      break;
    /** Trigger an issue creation. */
    case ReleaseAction.createTrackerIssue:
      await createTrackerIssueAction({ state });
      break;
    /** Fallback. */
    default:
      break;
  }
}
