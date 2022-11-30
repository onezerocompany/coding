/**
 * @file Action to create release environment comments.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { context } from '@actions/github';
import { ChangeLog, ChangelogDomain } from '@onezerocompany/commit';
import { EnvironmentType } from '@onezerocompany/project-manager';
import { octokit } from '../../utils/octokit/octokit';
import { slugify } from '../../utils/slugify';
import type { ReleaseState } from '../ReleaseState';

/** Environment to release to. */
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
 * Create the comments for the release environments.
 *
 * @param parameters - Parameters of the function.
 * @param parameters.state - The release state.
 * @example await createEnvironmentComments({state});
 */
export async function createEnvironmentComment({
  state,
}: {
  state: ReleaseState;
}): Promise<void> {
  if (typeof state.issueTrackerId !== 'number') {
    setFailed('Cannot create environment comments without an issue.');
    process.exit(1);
  }

  const [environment] = state.environments.filter(
    (environmentItem) => typeof environmentItem.issueCommentId !== 'number',
  );

  if (typeof environment === 'undefined') {
    setFailed('Cannot create environment comments without an environment.');
    process.exit(1);
  }

  let content = '';
  const sectionId = slugify(environment.github_name ?? 'unknown');
  content += '---\n\n';
  content += `## ${
    environmentNames[environment.type ?? EnvironmentType.firebaseHosting]
  }\n\n`;

  if (environment.changelog?.generate === true) {
    content += `<!-- CHANGELOG_BEGIN:${sectionId} -->\n\`\`\`\n`;
    content += `${
      new ChangeLog({
        type: ChangelogDomain.external,
        markdown: false,
        commits: state.commits ?? [],
      }).text
    }\n`;
    content += `\`\`\`\n<!-- CHANGELOG_END:${sectionId} -->\n`;
  }

  content += `- [ ] Release to ${
    environment.github_name ?? 'unknown'
  }<!-- RELEASE_ITEM:${sectionId} -->\n\n`;

  try {
    const comment = await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: state.issueTrackerId,
      // eslint-disable-next-line id-denylist
      body: content,
    });
    environment.issueCommentId = comment.data.id;
  } catch {
    setFailed(`Failed to create environment comment`);
    process.exit(1);
  }
}
