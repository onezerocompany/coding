/**
 * @file Permission definition for a project.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { ReleaseTrack } from './ReleaseTrack';

/** Permission for a person in relation to this project. */
export interface PermissionSettings {
  /** GitHub username of this person. */
  username: string;
  /** Whether to assign the release issue to this person. */
  assignIssue: boolean;
  /** Whether this person can edit changelogs. */
  canEditChangelog: boolean;
  /** Person can release the specified tracks. */
  canReleaseTracks: ReleaseTrack[];
}

/**
 * Converts a permission object to a permission object.
 *
 * @param object - Object to convert.
 * @returns Permission object.
 * @example parsePermission({ username: 'luca', assignIssue: true, canEditChangelog: true, canReleaseTracks: ['stable'] });
 */
export function parsePermission(
  object: Record<string, unknown>,
): PermissionSettings {
  /*
   * Read values from object
   * if value is undefined, use default value
   * if value is not of correct type, use default value
   */
  return {
    username: typeof object['username'] === 'string' ? object['username'] : '',
    assignIssue:
      typeof object['assignIssue'] === 'boolean'
        ? object['assignIssue']
        : false,
    canEditChangelog:
      typeof object['canEditChangelog'] === 'boolean'
        ? object['canEditChangelog']
        : false,
    canReleaseTracks: Array.isArray(object['canReleaseTracks'])
      ? (object['canReleaseTracks'] as ReleaseTrack[])
      : ([] as ReleaseTrack[]),
  };
}

/**
 * Converts an array of permission objects to an array of permission objects.
 *
 * @param array - Array to convert.
 * @returns Array of permission objects.
 * @example parsePermissions([{ username: 'luca', assignIssue: true, canEditChangelog: true, canReleaseTracks: ['stable'] }]);
 */
export function parsePermissionArray(array: unknown): PermissionSettings[] {
  if (!Array.isArray(array)) return [];
  return array.map((item) => parsePermission(item as Record<string, unknown>));
}
