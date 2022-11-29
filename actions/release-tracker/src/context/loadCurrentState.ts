/**
 * @file Load the current release from an issue.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { context } from '@actions/github';
import type { IssuesEvent } from '@octokit/webhooks-definitions/schema';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import { DeploymentStatus } from '../release/DeploymentStatus';
import { ReleaseState } from '../release/ReleaseState';
import { getContentBetweenTags } from '../utils/getContentBetweenTags';

/**
 * Load the current release from an issue.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.manifest - The manifest of the project.
 * @returns The current release.
 * @example const release = loadCurrentRelease();
 */
export function loadCurrentState({
  manifest,
}: {
  manifest: ProjectManifest;
}): ReleaseState {
  let state = new ReleaseState();
  if (context.eventName === 'push') {
    state.environments = manifest.environments.map((environment) => ({
      github_name: environment.github_name,
      deployed: false,
      type: environment.type,
      status: DeploymentStatus.pending,
      changelog: {
        generate: environment.changelog.generate,
        headers: environment.changelog.headers,
        footers: environment.changelog.footers,
      },
    }));
  }
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
