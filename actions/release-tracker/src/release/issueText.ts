/**
 * @file Contains a function to generate issue text.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ChangeLog, ChangeLogType } from '@onezerocompany/commit';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import { EnvironmentType } from '@onezerocompany/project-manager';
import { slugify } from '../utils/slugify';
import type { ReleaseState } from './ReleaseState';

const environmentNames: Record<EnvironmentType, string> = {
  [EnvironmentType.appleAppStore]: 'App Store',
  [EnvironmentType.appleTestFlightExternal]: 'TestFlight (External)',
  [EnvironmentType.appleTestFlightInternal]: 'TestFlight (Internal)',
  [EnvironmentType.firebaseHosting]: 'Firebase Hosting',
  [EnvironmentType.githubContainerRegistry]: 'GitHub Container Registry',
  [EnvironmentType.githubNpmRegistry]: 'GitHub NPM Registry',
  [EnvironmentType.googlePlay]: 'Google Play',
  [EnvironmentType.googlePlayTestingClosed]: 'Google Play Testing (Closed)',
  [EnvironmentType.googlePlayTestingExternal]: 'Google Play Testing (External)',
  [EnvironmentType.googlePlayTestingInternal]: 'Google Play Testing (Internal)',
};

/**
 * Generates a textual representation of a Release State.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.state - The release state.
 * @param parameters.manifest - The manifest of the project.
 * @returns The textual representation of the release state.
 * @example const text = issueText({ state });
 */
export function issueText({
  state,
  manifest,
}: {
  state: ReleaseState;
  manifest: ProjectManifest;
}): string {
  let content = '## Release Details\n\n';
  content +=
    '###### Edit the changelogs below and tick the checkboxes to release to each individual environment.\n\n';

  content += `${
    new ChangeLog({
      type: ChangeLogType.internal,
      commits: state.commits ?? [],
      markdown: true,
    }).text
  }\n\n`;

  for (const environment of state.environments) {
    content += '---\n\n';
    content += `<!-- section_begin:${slugify(
      environment.github_name ?? 'unknown',
    )} -->\n`;
    content += `### ${
      environmentNames[environment.type ?? EnvironmentType.firebaseHosting]
    }\n\n`;
    content += '<!-- changelog_begin -->\n```\n';
    content += `${
      new ChangeLog({
        type: ChangeLogType.external,
        markdown: false,
        commits: state.commits ?? [],
      }).text
    }\n`;
    content += '```\n<!-- changelog_end -->\n';
    content += '<!-- release_item_start -->\n';
    content += `- [ ] Release to ${environment.github_name ?? 'unknown'}\n`;
    content += '<!-- release_item_end -->\n';
    content += `<!-- section_end:${slugify(
      environment.github_name ?? 'unknown',
    )} -->\n\n`;
  }

  content += '---\n\n';

  const version = state.version?.displayString ?? '0.0.1';
  content += `Created from release: [${version}](${manifest.release.release_url.replace(
    '{{release}}',
    version,
  )})`;

  return content;
}
