/**
 * @file Defines the VersionBump enum.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Kinds of bumps that can be done to a version number. */
export enum VersionBump {
  /** No bump to any digit. */
  none = 'none',
  /** Bumps patch (third) digit (0.0.^). */
  patch = 'patch',
  /** Bumps minor (second) digit (0.^.0). */
  minor = 'minor',
  /** Bumps major (first) digit (^.0.0). */
  major = 'major',
}

/** Order of the version bumps, in order least impact to most impact. */
export const versionBumpOrder = [
  VersionBump.none,
  VersionBump.patch,
  VersionBump.minor,
  VersionBump.major,
];
