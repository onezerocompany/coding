/**
 * @file Definition of the ChangelogSettings.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Settings for creating a changelog. */
export enum ChangelogType {
  /** Changelog meant for distributing to the App Store or Google Play. */
  store = 'store',
  /** Changelog meant for Testflight or Google Play Testing. */
  externalTesting = 'external-testing',
  /** Changelog meant for internal teams. */
  internalTesting = 'internal-testing',
  /** Changelog meant for GitHub releases. */
  github = 'github',
}

/** Changelog settings. */
export interface ChangelogSettings {
  /** Whether to generate a changelog. */
  generate: boolean;
  /** Template for the changelog. */
  type: ChangelogType;
  /** Headers to add to the top of the changelog. */
  headers: string[];
  /** Footers to add to the bototm of the changelog. */
  footers: string[];
}

/**
 * Parse an object to a ChangelogSettings object.
 *
 * @param settings - Object to parse.
 * @returns ChangelogSettings object.
 * @example parseChangelogSettings({ generate: true, type: 'store', filename: 'CHANGELOG.md', headers: [], footers: [] });
 */
export function parseChangelogSettings(settings: unknown): ChangelogSettings {
  if (
    typeof settings === 'object' &&
    settings !== null &&
    !Array.isArray(settings)
  ) {
    const parsed = settings as Record<string, unknown>;
    return {
      generate:
        typeof parsed['generate'] === 'boolean' ? parsed['generate'] : false,
      type:
        typeof parsed['type'] === 'string' &&
        Object.values(ChangelogType).includes(parsed['type'] as ChangelogType)
          ? (parsed['type'] as ChangelogType)
          : ChangelogType.github,
      headers:
        typeof parsed['headers'] === 'object' && parsed['headers'] !== null
          ? (parsed['headers'] as string[])
          : [],
      footers:
        typeof parsed['footers'] === 'object' && parsed['footers'] !== null
          ? (parsed['footers'] as string[])
          : [],
    };
  }
  return {
    generate: false,
    type: ChangelogType.github,
    headers: [],
    footers: [],
  };
}
