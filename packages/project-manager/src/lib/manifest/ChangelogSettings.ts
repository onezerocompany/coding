/**
 * @file Definition of the ChangelogSettings.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Changelog settings. */
export interface ChangelogSettings {
  /** Whether to generate a changelog. */
  generate: boolean;
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
    headers: [],
    footers: [],
  };
}
