/**
 * @file Load the current release from an issue.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { context as githubContext } from '@actions/github';
import type { IssueCommentEvent } from '@octokit/webhooks-definitions/schema';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import { ReleaseEnvironment } from '../release/ReleaseEnvironment';
import { ReleaseState } from '../release/ReleaseState';
import { updateStateFromComment } from '../release/updateStateFromComment';
import type { Context } from './Context';

/**
 * Creates a new release state.
 *
 * @param parameters - The parameters.
 * @param parameters.manifest - The project manifest.
 * @returns The release state.
 * @example const state = createReleaseState({ manifest });
 */
function newReleaseState({
  manifest,
}: {
  manifest: ProjectManifest;
}): ReleaseState {
  const newState = new ReleaseState();
  newState.environments = manifest.environments.map(
    (environment) =>
      new ReleaseEnvironment({
        id: environment.id,
        needs: environment.needs,
        githubName: environment.github_name,
        deployed: false,
        type: environment.type,
        changelog: {
          generate: environment.changelog.generate,
          headers: environment.changelog.headers,
          footers: environment.changelog.footers,
        },
      }),
  );
  return newState;
}

/**
 * Load the current release from an issue.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.manifest - The manifest of the project.
 * @param parameters.previousState - The previous state of the release.
 * @param parameters.context - The GitHub context.
 * @returns The current release.
 * @example const release = loadCurrentRelease();
 */
export function loadCurrentState({
  manifest,
  previousState,
}: {
  manifest: ProjectManifest;
  previousState: ReleaseState | null;
  context: Context;
}): {
  state: ReleaseState;
  currentCommentText: string | null;
  currentCommentId: number | null;
} {
  let currentCommentText: string | null = null;
  let currentCommentId: number | null = null;
  const state =
    previousState === null ? null : ReleaseState.fromJson(previousState.json);
  if (state === null) {
    return {
      state: newReleaseState({ manifest }),
      currentCommentText,
      currentCommentId,
    };
  }

  if (githubContext.eventName === 'issue_comment') {
    const event = githubContext.payload as IssueCommentEvent;
    const didUpdate =
      event.action === 'edited' &&
      event.comment.body !== event.changes.body?.from;
    if (didUpdate) {
      // Update the state based on the comment
      currentCommentText = event.comment.body;
      currentCommentId = event.comment.id;
      updateStateFromComment({
        state,
        comment: event.comment.body,
        manifest,
        username: event.sender.login,
      });
    }
  }

  return { state, currentCommentText, currentCommentId };
}
