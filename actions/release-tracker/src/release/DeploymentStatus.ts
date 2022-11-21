/**
 * @file Defines a deployment status.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Status of the deployment. */
export enum DeploymentStatus {
  /** The deployment is pending. */
  pending = 'pending',
  /** The deployment is in progress. */
  inProgress = 'in_progress',
  /** The deployment was successful. */
  success = 'success',
  /** The deployment failed. */
  failure = 'failure',
  /** The deployment was cancelled. */
  cancelled = 'cancelled',
}
