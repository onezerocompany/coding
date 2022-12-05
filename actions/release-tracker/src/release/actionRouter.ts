/**
 * @file Router for release actions.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info, setFailed } from '@actions/core';
import type { Context } from '../context/Context';
import {
  attachTrackerLabel,
  createEnvironmentComment,
  createRelease,
  createTrackerIssue,
  loadCommits,
  loadVersion,
  updateTrackerIssue,
} from './actions';
import { deploy } from './actions/deploy';
import { updateEnvironmentComment } from './actions/updateEnvironmentComment';
import { ReleaseAction } from './ReleaseAction';
import type { ReleaseState } from './ReleaseState';

/**
 * Function that runs a `ReleaseAction`.
 *
 * @param parameters - Parameters for the function.
 * @param parameters.action - Action to run.
 * @param parameters.state - State to apply the loaded info to.
 * @param parameters.context - The shared context.
 * @example actionRouter({ action });
 */
// eslint-disable-next-line max-lines-per-function
export async function actionRouter({
  state,
  action,
  context,
}: {
  action: ReleaseAction;
  state: ReleaseState;
  context: Context;
}): Promise<void> {
  info(`Running next action... ${action}`);
  switch (action) {
    /** Loading version details. */
    case ReleaseAction.loadVersion:
      await loadVersion({ state, context });
      break;
    /** Loading commits. */
    case ReleaseAction.loadCommits:
      await loadCommits({ state, context });
      break;
    /** Trigger a release creation. */
    case ReleaseAction.createRelease:
      await createRelease({ state, context });
      break;
    /** Trigger an issue creation. */
    case ReleaseAction.createTrackerIssue:
      await createTrackerIssue({
        state,
        context,
      });
      break;
    /** Create environment comment. */
    case ReleaseAction.createEnvironmentComment:
      await createEnvironmentComment({
        state,
      });
      break;
    /** Attaching the label to the issue. */
    case ReleaseAction.attachTrackerLabel:
      await attachTrackerLabel({
        state,
      });
      break;
    /** Update the issue.  */
    case ReleaseAction.updateIssue:
      await updateTrackerIssue({
        state,
        context,
      });
      break;
    /** Update an environment comment. */
    case ReleaseAction.updateEnvironmentComment:
      await updateEnvironmentComment({
        state,
      });
      break;
    /** Deploy environments. */
    case ReleaseAction.deploy:
      await deploy({
        state,
      });
      break;
    /** Fallback when action is not known. */
    default:
      setFailed(`Unknown action: ${action}`);
      process.exit(1);
  }
}
