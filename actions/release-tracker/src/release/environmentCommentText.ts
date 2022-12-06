/**
 * @file Contains a function to generate the text for the environment comment.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { EnvironmentType } from '@onezerocompany/project-manager';
import type { ReleaseEnvironment } from './ReleaseEnvironment';
import type { ReleaseState } from './ReleaseState';

/** Environment to release to. */
const environmentNames: Record<EnvironmentType, string> = {
  [EnvironmentType.appleAppStore]: 'App Store',
  [EnvironmentType.appleTestFlightExternal]: 'External TestFlight',
  [EnvironmentType.appleTestFlightInternal]: 'Internal TestFlight',
  [EnvironmentType.firebaseHosting]: 'Firebase Hosting',
  [EnvironmentType.githubContainerRegistry]: 'GitHub Container Registry',
  [EnvironmentType.githubNpmRegistry]: 'GitHub NPM Registry',
  [EnvironmentType.googlePlay]: 'Google Play',
  [EnvironmentType.googlePlayTestingClosed]: 'Closed Google Play Testing',
  [EnvironmentType.googlePlayTestingExternal]: 'External Google Play Testing',
  [EnvironmentType.googlePlayTestingInternal]: 'Internal Google Play Testing',
};

/**
 * Generates the text for the environment comment.
 *
 * @param parameters - Parameters for the function.
 * @param parameters.environment - Environment to create the text for.
 * @param parameters.state - Release state.
 * @returns Text for the environment comment.
 * @example const text = environmentCommentText({ environment, state });
 */
export function environmentCommentText({
  environment,
  state,
}: {
  environment: ReleaseEnvironment;
  state: ReleaseState;
}): string {
  const waiting = environment.waiting({ state });
  const name = environmentNames[environment.type];
  let content = `<!-- environment_id:${environment.id} -->\n# ${name}\n`;

  if (waiting) {
    content += '```\n⏸️ Waiting for Firebase Hosting to be deployed.\n```\n\n';
  }

  if (environment.changelog.generate) {
    content += '***Changelog***\n<!-- changelog_begin -->\n```\n';
    content += `${environment.changelogText}\n`;
    content += '```\n<!-- changelog_end -->\n';
  }

  if (!waiting && !environment.deployed) {
    content += `- [ ] Release to ${name}<!-- release_item -->\n`;
  } else if (!waiting && environment.deployed) {
    content += `✅ Released to ${name}<!-- release_item -->\n`;
  }

  return content;
}
