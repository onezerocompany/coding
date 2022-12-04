/**
 * @file Contains a function to update the state of an environment from its comment.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { debug, info, setFailed } from '@actions/core';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import type { ReleaseState } from './ReleaseState';

/*
 * Regex for extracting the id from the following:
 * <!-- environment_id:2a1cf3df-d5ee-48d1-9435-0db42ae86008 -->
 */
const environmentIdRegex = /<!-- environment_id:(?<id>[a-f0-9-]+) -->/gu;

/*
 * Regex for extracting the checkmark or emoji from the following:
 * - [ ] Release to TestFlight Internal<!-- release_item -->
 * - [x] Release to TestFlight Internal<!-- release_item -->
 * ✅ Released to TestFlight Internal<!-- release_item -->
 */
const releaseItemRegex =
  /(?<checkmark>\[x\]|\[ \]|\u2705) (?<name>.+?)<!-- release_item -->/gu;

/*
 * Regex for extracting the changelog from the following:
 * <!-- changelog_begin -->
 * ```
 * - Added a new feature
 * - Fixed a bug
 * ```
 * <!-- changelog_end -->
 */
const changelogRegex =
  /<!-- changelog_begin -->\n```\n(?<changelog>(?:.*(?:[\n\r]))*)```\n<!-- changelog_end -->/gu;

/**
 * Update a state from a comment.
 *
 * @param context - The context to use.
 * @param context.comment - The comment to update the state from.
 * @param context.state - The state to update.
 * @param context.manifest - The manifest of the project.
 * @param context.username - The username of the user who created the comment.
 * @example await updateEnvironment({ comment, state });
 */
export function updateStateFromComment({
  comment,
  state,
  manifest,
  username,
}: {
  comment: string;
  state: ReleaseState;
  manifest: ProjectManifest;
  username: string;
}): void {
  info('Updating state from comment...');

  const id = environmentIdRegex.exec(comment)?.groups?.['id'];
  debug(`environment id: ${id ?? '-'}`);
  const environment = state.environments.find(
    (environmentItem) => environmentItem.id === id,
  );
  if (!environment) {
    setFailed(
      'Cannot update environment state from comment for which the environment cannot be found.',
    );
    process.exit(1);
  }

  const userSettings = manifest.users.find(
    (item) => item.username === username,
  );

  const userEnvironmentSettings = userSettings?.environments.find(
    (item) => item.type === environment.type,
  );

  debug(`user settings: ${JSON.stringify(userEnvironmentSettings)}`);

  const userAllowedDeploy = userEnvironmentSettings?.deploy === true;

  if (!environment.deployed && userAllowedDeploy) {
    const checkmark = releaseItemRegex.exec(comment)?.groups?.['checkmark'];
    if (checkmark === '[x]' || checkmark === '✅') {
      // Update 'deployed' state on environment with id
      environment.deployed = true;
    }
  }

  const userAllowedChangelogEdit =
    userEnvironmentSettings?.edit_changelog === true;
  debug(
    `user allowed changelog edit: ${userAllowedChangelogEdit ? 'yes' : 'no'}`,
  );

  if (userAllowedChangelogEdit) {
    const changelog = changelogRegex.exec(comment)?.groups?.['changelog'];
    debug(`new changelog: ${changelog ?? '-'}`);
    if (typeof changelog === 'string') {
      environment.changelogText = changelog;
    }
  }
}
