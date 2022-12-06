/**
 * @file Function to assign an issue to a user on GitHub.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { context } from '@actions/github';
import { octokit } from '../octokit';

/**
 * Assigns an issue to a user.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.issueNumber - The issue number.
 * @param parameters.assignees - The users to assign the issue to.
 * @example await assignIssue({ issueNumber: '1', assignee: 'luca' });
 */
export async function assignIssue({
  issueNumber,
  assignees,
}: {
  issueNumber: number;
  assignees: string[];
}): Promise<void> {
  await octokit.rest.issues.addAssignees({
    ...context.repo,
    issue_number: issueNumber,
    assignees,
  });
}
