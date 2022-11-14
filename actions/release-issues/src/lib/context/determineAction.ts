/**
 * @file Functions for determining the action to take for a release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { context as eventContext } from '@actions/github';
import { setFailed } from '@actions/core';
import type {
  IssuesEvent,
  PushEvent,
} from '@octokit/webhooks-definitions/schema';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import { Action } from '../definitions/Action';

/**
 * Determine the action to take based on the event context.
 *
 * @param options - Options for the function.
 * @param options.projectManifest - Project manifest.
 * @returns The determined action.
 * @example determineAction();
 */
export function determineAction({
  projectManifest,
}: {
  projectManifest: ProjectManifest;
}): Action {
  const { eventName } = eventContext;
  if (eventName === 'push') {
    const pushEvent = eventContext.payload as PushEvent;
    if (pushEvent.ref !== `refs/heads/${projectManifest.mainBranch}`) {
      setFailed(
        `Only pushes to the ${projectManifest.mainBranch} branch are supported`,
      );
      return Action.stop;
    }
    return Action.create;
  }

  if (eventName === 'issues') {
    const issueEvent = eventContext.payload as IssuesEvent;
    if (issueEvent.action === 'edited') {
      return Action.update;
    }
    return Action.stop;
  }

  setFailed(new Error('Unsupported event'));
  return Action.stop;
}
