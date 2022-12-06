/**
 * @file Action to create release environment comments.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info, setFailed } from '@actions/core';
import { createComment } from '../../utils/octokit/createComment';
import type { ReleaseState } from '../ReleaseState';

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
  if (typeof state.issueTrackerNumber !== 'number') {
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

  info(
    `Creating comment for ${environment.id} on issue #${state.issueTrackerNumber}.`,
  );

  // Generate the changelog
  environment.changelogText = environment.originalChangelogText({ state });

  try {
    const content = environment.commentText({ state });
    const { commentId } = await createComment({
      issueNumber: state.issueTrackerNumber,
      content,
    });
    environment.issueCommentId = commentId;
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
