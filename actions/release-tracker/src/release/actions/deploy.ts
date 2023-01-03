/**
 * @file Deploy action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { deployToEnvironment } from '../../utils/octokit/deploy';
import type { ReleaseState } from '../ReleaseState';

/**
 * Performs a deploy of an environment.
 *
 * @param parameters - The parameters for the function.
 * @param parameters.state - The environment to deploy.
 * @example await deploy({ state });
 */
export async function deploy({
  state,
}: {
  state: ReleaseState;
}): Promise<void> {
  const environment = state.environments.find(
    (item) => item.deployed && !item.didDeploy,
  );

  if (typeof environment === 'undefined') {
    setFailed('No environment to deploy.');
    process.exit(1);
  }

  if (typeof state.version?.displayString !== 'string') {
    setFailed('Cannot deploy without a version.');
    process.exit(1);
  }

  if (typeof state.buildNumber !== 'number') {
    setFailed('Cannot deploy without a build number.');
    process.exit(1);
  }

  try {
    await deployToEnvironment({
      environment: environment.githubName,
      version: state.version.displayString,
      changelog: environment.changelogText,
      buildNumber: state.buildNumber,
    });
    environment.didDeploy = true;
  } catch (deployError: unknown) {
    if (deployError instanceof Error) {
      setFailed(deployError.message);
    } else {
      setFailed(`Failed to deploy to ${environment.githubName}.`);
    }
    process.exit(1);
  }
}
