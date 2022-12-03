/**
 * @file Contains a function to generate the text for the environment comment.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ChangeLog } from '@onezerocompany/commit';
import { EnvironmentType } from '@onezerocompany/project-manager';
import { randomItem } from '../utils/randomItem';
import { environmentChangelogs } from './environmentChangelogs';
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
  let content = `<!-- environment_id:${environment.id} -->\n# ${
    environmentNames[environment.type]
  }\n`;

  if (waiting) {
    content += '```\n⏸️ Waiting for Firebase Hosting to be deployed.\n```\n\n';
  }

  if (environment.changelog.generate) {
    content += '***Changelog***\n<!-- changelog_begin -->\n```\n';
    const { domain } = environmentChangelogs[environment.type];
    content += `${
      new ChangeLog({
        commits: state.commits ?? [],
        domain,
        header: randomItem(environment.changelog.headers),
        footer: randomItem(environment.changelog.footers),
        markdown: false,
      }).text
    }\n`;
    content += '```\n<!-- changelog_end -->\n';
  }

  if (!waiting && !environment.deployed) {
    content +=
      '- [ ] Release to TestFlight Internal<!-- RELEASE_ITEM:testflight-internal -->\n';
  } else if (!waiting && environment.deployed) {
    content +=
      '✅ Released to TestFlight Internal<!-- RELEASE_ITEM:testflight-internal -->\n';
  }

  return content;
}
