/**
 * @file Contains an environment settings object.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { ChangelogSettings } from './ChangelogSettings';
import { parseChangelogSettings } from './ChangelogSettings';
import { EnvironmentType } from './EnvironmentType';

/** Settings for an environment. */
export interface EnvironmentSettings {
  /** Identifier of the environment. */
  id: string;
  /** Type of the environment. */
  type: EnvironmentType;
  /** Environment name on GitHub. */
  github_name: string;
  /** Changelog settings. */
  changelog: ChangelogSettings;
  /** Version template. */
  version_template: string;
}

/**
 * Parse an object to an EnvironmentSettings object.
 *
 * @param settings - Object to parse.
 * @returns EnvironmentSettings object.
 * @example parseEnvironmentSettings({ changelog: { generate: true, template: '...', filename: '...', headers: [], footers: [] }, version_template: '${major}.${minor}.${patch}' });
 */
export function parseEnvironmentSettings(
  settings: unknown,
): EnvironmentSettings {
  const parsed = settings as Record<string, unknown>;
  return {
    id: typeof parsed['id'] === 'string' ? parsed['id'] : '',
    type:
      typeof parsed['type'] === 'string' &&
      Object.values(EnvironmentType).includes(parsed['type'] as EnvironmentType)
        ? (parsed['type'] as EnvironmentType)
        : EnvironmentType.firebaseHosting,
    github_name:
      typeof parsed['github_name'] === 'string' ? parsed['github_name'] : '',
    changelog: parseChangelogSettings(parsed['changelog']),
    version_template:
      typeof parsed['version_template'] === 'string'
        ? parsed['version_template']
        : '{major}.{minor}.{patch}',
  };
}

/**
 * Parse an array of environment settings.
 *
 * @param settings - Array to parse.
 * @returns Array of EnvironmentSettings objects.
 * @example parseEnvironmentSettings([...array]);
 */
export function parseEnvironmentSettingsArray(
  settings: unknown,
): EnvironmentSettings[] {
  if (Array.isArray(settings)) {
    return settings.map((setting) => parseEnvironmentSettings(setting));
  }
  return [];
}
