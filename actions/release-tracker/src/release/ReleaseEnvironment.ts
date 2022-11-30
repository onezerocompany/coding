/**
 * @file Release environment class.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { EnvironmentType } from '@onezerocompany/project-manager';
import { DeploymentStatus } from './DeploymentStatus';

/** Release environment. */
export class ReleaseEnvironment {
  /** Environment ID. */
  public github_name?: string;
  /** Whether the environment should be deployed. */
  public deployed = false;
  /** Status of the deployment. */
  public status = DeploymentStatus.pending;
  /** Environment type. */
  public type?: EnvironmentType;
  /** Issue comment id. */
  public issueCommentId?: number;
  /** Changelog related settings. */
  public changelog?: {
    /** Whether to include the changelog in the release. */
    generate: boolean;
    /** Headers to put above the changelog. */
    headers: string[];
    /** Footers to put below the changelog. */
    footers: string[];
  };
}

/**
 * Converts an array of unknown objects to a ReleaseEnvironment array.
 *
 * @param environments - The array of unknown objects to convert.
 * @returns The ReleaseEnvironment array.
 * @example const environments = parseReleaseEnvironmentsArray(environments);
 */
export function parseReleaseEnvironmentsArray(
  environments: unknown[],
): ReleaseEnvironment[] {
  return environments.map((environment) => {
    const releaseEnvironment = new ReleaseEnvironment();
    const parsed = environment as Record<string, unknown>;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { github_name, deployed, status } = parsed;
    if (typeof github_name === 'string')
      releaseEnvironment.github_name = github_name;
    if (typeof deployed === 'boolean') releaseEnvironment.deployed = deployed;
    if (typeof status === 'string')
      releaseEnvironment.status = status as DeploymentStatus;
    return releaseEnvironment;
  });
}
