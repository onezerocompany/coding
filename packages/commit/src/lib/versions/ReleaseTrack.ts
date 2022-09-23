/**
 * @file Version Track definition.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Tracks to create releases on. */
export enum ReleaseTrack {
  /** Meant for publishing to end-users. */
  stable = 'stable',
  /**
   * Meant for distribution to users that signed-up for
   * testing new features, while they are still unstable.
   */
  beta = 'beta',
  /** Meant for distribution within the development team, and select users. */
  alpha = 'alpha',
}

export const releaseTrackOrder: ReleaseTrack[] = [
  ReleaseTrack.alpha,
  ReleaseTrack.beta,
  ReleaseTrack.stable,
];
