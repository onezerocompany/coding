/**
 * @file Permission definition for a project.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { EnvironmentType } from './EnvironmentType';

/** Settings for an environment. */
export interface UserEnvironmentSettings {
  /** Whether the user is allowed to edit the changelog. */
  edit_changelog: boolean;
  /** Whether the user is allowed to release. */
  release: boolean;
}

/** Permission for a person in relation to this project. */
export interface PermissionSettings {
  /** GitHub username of this person. */
  username: string;
  /** Whether to assign the release issue to this person. */
  assign_issue: boolean;
  /** List of environments and what the user is allowed to do with them. */
  environments: Record<EnvironmentType, UserEnvironmentSettings>;
}

/**
 * Parse an object to an environment object.
 *
 * @param object - Object to parse.
 * @returns Environment object.
 * @example parseEnvironments({ 'google-play': { edit_changelog: true, release: true } });
 */
export function parseEnvironments(
  object: unknown,
): Record<EnvironmentType, UserEnvironmentSettings> {
  const objectMap = object as Record<string, unknown>;
  const environments = {} as Record<EnvironmentType, UserEnvironmentSettings>;
  for (const environment of Object.keys(objectMap)) {
    const environmentSettings = objectMap[environment];
    if (typeof environmentSettings === 'object') {
      const environmentSettingsMap = environmentSettings as Record<
        string,
        unknown
      >;
      if (
        Object.values(EnvironmentType).includes(environment as EnvironmentType)
      ) {
        environments[environment as EnvironmentType] = {
          edit_changelog:
            typeof environmentSettingsMap['edit_changelog'] === 'boolean'
              ? environmentSettingsMap['edit_changelog']
              : false,
          release:
            typeof environmentSettingsMap['release'] === 'boolean'
              ? environmentSettingsMap['release']
              : false,
        };
      }
    }
  }
  return environments;
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
    assign_issue:
      typeof object['assign_issue'] === 'boolean'
        ? object['assign_issue']
        : false,
    environments:
      typeof object['environments'] === 'object'
        ? parseEnvironments(object['environments'])
        : ({} as Record<EnvironmentType, UserEnvironmentSettings>),
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
