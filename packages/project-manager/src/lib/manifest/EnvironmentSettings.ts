/**
 * @file Contains an environment settings object.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { v4 as uuid } from 'uuid';
import type { ChangelogSettings } from './ChangelogSettings';
import { parseChangelogSettings } from './ChangelogSettings';
import { EnvironmentType } from './EnvironmentType';

/** Settings for an environment. */
export interface EnvironmentSettings {
  /** Identifier for the environment. */
  id: string;
  /** Type of the environment. */
  type: EnvironmentType;
  /** Environment name on GitHub. */
  github_name: string;
  /** Changelog settings. */
  changelog: ChangelogSettings;
  /** Version template. */
  version_template: string;
  /** Auto release. */
  auto_release: boolean;
  /** List of other environment ids that need to be deployed first. */
  needs: string[];
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
    id: typeof parsed['id'] === 'string' ? parsed['id'] : uuid(),
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
    auto_release:
      typeof parsed['auto_release'] === 'boolean'
        ? parsed['auto_release']
        : false,
    needs:
      Array.isArray(parsed['needs']) &&
      parsed['needs'].every((item) => typeof item === 'string')
        ? (parsed['needs'] as string[])
        : [],
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
