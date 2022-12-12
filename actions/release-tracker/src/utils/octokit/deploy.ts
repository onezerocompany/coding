/**
 * @file Function to deploy to an environment on GitHub.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { context } from '@actions/github';
import { publishOctokit } from '../octokit';

/**
 * Function to deploy to an environment on GitHub.
 *
 * @param parameters - Parameters for the function.
 * @param parameters.environment - Environment to deploy to.
 * @param parameters.version - Version to deploy.
 * @param parameters.changelog - Changelog to deploy.
 * @example await deployToEnvironment({ environment, version });
 */
export async function deployToEnvironment({
  environment,
  version,
  changelog,
}: {
  environment: string;
  version: string;
  changelog: string;
}): Promise<void> {
  await publishOctokit.rest.repos.createDeployment({
    ...context.repo,
    ref: version,
    environment,
    required_contexts: [],
    payload: {
      changelog,
    },
  });
}
