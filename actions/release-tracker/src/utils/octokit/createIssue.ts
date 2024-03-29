/**
 * @file Contains a function that creates an issue for a release.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { error as logError, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { octokit } from '../octokit';

/**
 * Creates an issue on GitHub.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.title - The title of the issue.
 * @param parameters.content - The content of the issue.
 * @returns The issue number.
 * @example const issueNumber = await createIssue({ state });
 */
export async function createIssue({
  title,
  content,
}: {
  title: string;
  content: string;
}): Promise<number> {
  try {
    const issue = await octokit.rest.issues.create({
      ...context.repo,
      title,
      // eslint-disable-next-line id-denylist
      body: content,
    });
    return issue.data.number;
  } catch (createError: unknown) {
    logError(createError as string);
    setFailed('Failed to create the release.');
    process.exit(1);
  }
}
