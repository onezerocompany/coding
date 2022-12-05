/**
 * @file Action to create release environment comments.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info, setFailed } from '@actions/core';
import { updateComment } from '../../utils/octokit/updateComment';
import type { ReleaseState } from '../ReleaseState';

/**
 * Create the comments for the release environments.
 *
 * @param parameters - Parameters of the function.
 * @param parameters.state - The release state.
 * @example await createEnvironmentComments({state});
 */
export async function updateEnvironmentComment({
  state,
}: {
  state: ReleaseState;
}): Promise<void> {
  if (typeof state.issueTrackerNumber !== 'number') {
    setFailed('Cannot update environment comments without an issue.');
    process.exit(1);
  }

  const [environment] = state.environments.filter(
    (environmentItem) =>
      environmentItem.commentText({ state }) !== environmentItem.commentContent,
  );

  if (typeof environment === 'undefined') {
    setFailed('Cannot update environment comments without an environment.');
    process.exit(1);
  }

  info(
    `Updating comment for ${environment.id} on issue #${state.issueTrackerNumber}.`,
  );

  if (typeof environment.issueCommentId !== 'number') {
    setFailed(
      `Cannot update environment comment for ${environment.id} without a comment ID.`,
    );
    process.exit(1);
  }

  try {
    const content = environment.commentText({ state });
    await updateComment({
      content,
      issueNumber: state.issueTrackerNumber,
      commentId: environment.issueCommentId,
    });
    environment.commentContent = content;
  } catch (createError: unknown) {
    setFailed(
      createError instanceof Error
        ? createError.message
        : `Failed to create issue comment for environment: ${environment.id}`,
    );
    process.exit(1);
  }
}
