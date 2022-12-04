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
 * @returns The comment ID.
 * @example const commentId = await createComment({ issueNumber, content });
 */
export async function createComment({
  issueNumber,
  content,
}: {
  issueNumber: number;
  content: string;
}): Promise<{
  commentId: number;
}> {
  const comment = await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: issueNumber,
    // eslint-disable-next-line id-denylist
    body: content,
  });
  return {
    commentId: comment.data.id,
  };
}
