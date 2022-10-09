/**
 * @file Release track definition.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Release tracks. */
export enum ReleaseTrack {
  /** Stable track meant for releasing to the public. */
  stable = 'stable',
  /** Beta track meant for releasing to users that signed-up for testing semi-stable new features. */
  beta = 'beta',
  /** Alpha track meant for internal review. */
  alpha = 'alpha',
}

export const releaseTracks = Object.values(ReleaseTrack);
