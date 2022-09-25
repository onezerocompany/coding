/**
 * @file This file is the entry point for the pr-commit-check action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import {
  error as logError,
  getInput,
  info as logInfo,
  setOutput,
} from '@actions/core';
import { context } from '@actions/github';
import type { ValidationError } from '@onezerocompany/commit';
import { validateMessage } from '@onezerocompany/commit';
import { fetchPullRequest } from './fetchPullRequest';

const prNumber = parseInt(
  getInput('pull_request', {
    trimWhitespace: true,
  }),
  10,
);

const { repo, owner } = context.repo;

/**
 * Print context information.
 *
 * @example printContext();
 */
function printContext(): void {
  logInfo(`repository: ${repo}`);
  logInfo(`owner: ${owner}`);
  logInfo(`pr: ${prNumber}`);
}

/**
 * Main entry point of the pr-commit-check action.
 *
 * @example
 *   main();
 */
async function run(): Promise<void> {
  printContext();

  const { repository } = await fetchPullRequest(owner, repo, prNumber);

  if (repository?.pullRequest.merged === true) {
    logInfo('Pull request is already merged, skipping commit check');
    process.exit(0);
  }

  const errors: ValidationError[] = [];

  const commits =
    repository?.pullRequest.commits.nodes.map(
      (node: { commit: { message: string } }) => ({
        message: node.commit.message,
      }),
    ) ?? [];

  setOutput('commits', JSON.stringify(commits));

  const valid = commits.every((commit) => {
    const validation = validateMessage({ message: commit.message });
    errors.push(...validation.errors);
    if (validation.errors.length > 0) {
      for (const validationError of validation.errors) {
        logError(validationError.displayString);
      }
    }
    return validation.valid;
  });

  setOutput('valid', valid);
  setOutput('errors', JSON.stringify(errors));

  if (valid) process.exit(0);
  else process.exit(1);
}

// eslint-disable-next-line no-void
void run();
