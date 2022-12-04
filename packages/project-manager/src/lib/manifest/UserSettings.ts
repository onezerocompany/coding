/**
 * @file Permission definition for a project.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Settings for an environment. */
export interface UserEnvironmentSettings {
  /** Whether the user is allowed to edit the changelog. */
  edit_changelog: boolean;
  /** Whether the user is allowed to release. */
  deploy: boolean;
  /** Type of environment. */
  id: string;
}

/** Permission for a person in relation to this project. */
export interface UserSettings {
  /** GitHub username of this person. */
  username: string;
  /** Whether to assign the release issue to this person. */
  assign_issue: boolean;
  /** List of environments and what the user is allowed to do with them. */
  environments: UserEnvironmentSettings[];
}

/**
 * Parse an object to an environment object.
 *
 * @param object - Object to parse.
 * @returns Environment object.
 * @example parseEnvironments({ 'google-play': { edit_changelog: true, release: true } });
 */
export function parseEnvironments(object: unknown): UserEnvironmentSettings[] {
  if (!Array.isArray(object)) return [];
  return (object as Array<Record<string, unknown>>).map((environment) => ({
    edit_changelog:
      typeof environment['edit_changelog'] === 'boolean'
        ? environment['edit_changelog']
        : false,
    deploy:
      typeof environment['deploy'] === 'boolean'
        ? environment['deploy']
        : false,
    id: typeof environment['id'] === 'string' ? environment['id'] : '',
  }));
}

/**
 * Converts a permission object to a permission object.
 *
 * @param object - Object to convert.
 * @returns Permission object.
 * @example parsePermission({ username: 'luca', assignIssue: true, canEditChangelog: true, canReleaseTracks: ['stable'] });
 */
export function parsePermission(object: Record<string, unknown>): UserSettings {
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
        : [],
  };
}

/**
 * Converts an array of permission objects to an array of permission objects.
 *
 * @param array - Array to convert.
 * @returns Array of permission objects.
 * @example parsePermissions([ ...permissions ]);
 */
export function parsePermissionArray(array: unknown): UserSettings[] {
  if (!Array.isArray(array)) return [];
  return array.map((item) => parsePermission(item as Record<string, unknown>));
}
