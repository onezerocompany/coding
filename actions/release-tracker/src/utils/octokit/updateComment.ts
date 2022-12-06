/**
 * @file Function for creating a comment on an issue.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { context } from '@actions/github';
import { octokit } from '../octokit';

/**
 * Function for creating a comment on an issue.
 *
 * @param parameters - Parameters for the function.
 * @param parameters.issueNumber - Issue number to create the comment on.
 * @param parameters.content - Content of the comment.
 * @param parameters.commentId - Comment ID to update.
 * @returns The comment ID.
 * @example const commentId = await createComment({ issueNumber, content });
 */
export async function updateComment({
  issueNumber,
  commentId,
  content,
}: {
  issueNumber: number;
  commentId: number;
  content: string;
}): Promise<void> {
  await octokit.rest.issues.updateComment({
    ...context.repo,
    issue_number: issueNumber,
    comment_id: commentId,
    // eslint-disable-next-line id-denylist
    body: content,
  });
}
