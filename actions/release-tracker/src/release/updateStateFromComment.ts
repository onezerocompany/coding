/**
 * @file Contains a function to update the state of an environment from its comment.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
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

/**
 * Update a state from a comment.
 *
 * @param context - The context to use.
 * @param context.comment - The comment to update the state from.
 * @param context.state - The state to update.
 * @example await updateEnvironment({ comment, state });
 */
export function updateStateFromComment({
  comment,
  state,
}: {
  comment: string;
  state: ReleaseState;
}): void {
  const id = environmentIdRegex.exec(comment)?.groups?.['id'];
  const environment = state.environments.find(
    (environmentItem) => environmentItem.id === id,
  );
  if (!environment) {
    setFailed(
      'Cannot update environment state from comment for which the environment cannot be found.',
    );
    process.exit(1);
  }
  if (!environment.deployed) {
    const checkmark = releaseItemRegex.exec(comment)?.groups?.['checkmark'];
    if (checkmark === '[x]' || checkmark === '✅') {
      // Update 'deployed' state on environment with id
      environment.deployed = true;
    }
  }
}
