/**
 * @file Router for release actions.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info } from '@actions/core';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import { attachTrackerLabelAction } from './actions/attachTrackerLabel';
import { createEnvironmentComment } from './actions/createEnvironmentComment';
import { createReleaseAction } from './actions/createReleaseAction';
import { createTrackerIssueAction } from './actions/createTrackerIssueAction';
import { loadCommits } from './actions/loadCommits';
import { loadVersion } from './actions/loadVersion';
import { ReleaseAction } from './ReleaseAction';
import type { ReleaseState } from './ReleaseState';

/**
 * Function that runs a `ReleaseAction`.
 *
 * @param parameters - Parameters for the function.
 * @param parameters.action - Action to run.
 * @param parameters.state - State to apply the loaded info to.
 * @param parameters.manifest - The project manifest.
 * @example actionRouter({ action });
 */
export async function actionRouter({
  state,
  action,
  manifest,
}: {
  state: ReleaseState;
  action: ReleaseAction;
  manifest: ProjectManifest;
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
      await createTrackerIssueAction({
        state,
        manifest,
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
      await attachTrackerLabelAction({
        state,
      });
      break;
    /** Fallback. */
    default:
      break;
  }
}
