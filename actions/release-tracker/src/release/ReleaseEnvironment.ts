/**
 * @file Release environment class.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { DeploymentStatus } from './DeploymentStatus';

/** Environment to release to. */

/** Release environment. */
export class ReleaseEnvironment {
  /** Environment ID. */
  public environmentId?: string;
  /** Whether the environment should be deployed. */
  public deployed = false;
  /** Status of the deployment. */
  public status = DeploymentStatus.pending;
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
    const { environmentId, deployed, status } = parsed;
    if (typeof environmentId === 'string')
      releaseEnvironment.environmentId = environmentId;
    if (typeof deployed === 'boolean') releaseEnvironment.deployed = deployed;
    if (typeof status === 'string')
      releaseEnvironment.status = status as DeploymentStatus;
    return releaseEnvironment;
  });
}
