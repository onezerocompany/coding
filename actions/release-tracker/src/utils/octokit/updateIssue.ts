/**
 * @file Contains a function that updates the issue for a release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { error as logError, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { octokit } from '../octokit';

/**
 * Updates an issue on GitHub.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.title - The title of the issue.
 * @param parameters.content - The content of the issue.
 * @param parameters.issueNumber - The issue number.
 * @returns The issue number.
 * @example const issueNumber = await createIssue({ state });
 */
export async function updateIssue({
  issueNumber,
  title,
  content,
}: {
  issueNumber: number;
  title: string;
  content: string;
}): Promise<number> {
  try {
    const issue = await octokit.rest.issues.update({
      ...context.repo,
      issue_number: issueNumber,
      title,
      // eslint-disable-next-line id-denylist
      body: content,
    });
    return issue.data.number;
  } catch (updateError: unknown) {
    logError(updateError as string);
    setFailed('Failed to create the release.');
    process.exit(1);
  }
}
