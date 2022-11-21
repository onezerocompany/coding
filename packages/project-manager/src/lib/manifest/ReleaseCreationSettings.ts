/**
 * @file Definition of the ReleaseCreationSettings.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Settings for creating a release. */
export interface ReleaseCreationSettings {
  /** Template for the name of the release. */
  tag_template: string;
  /** Url to a commit. */
  commit_url: string;
  /** Changelog fallback message. */
  changelog_fallback: string;
}

/**
 * Parse an object to a ReleaseCreationSettings object.
 *
 * @param settings - Object to parse.
 * @returns ReleaseCreationSettings object.
 * @example parseReleaseCreationSettings({ tag_template: 'v${version}', manual_release: false });
 */
export function parseReleaseCreationSettings(
  settings: unknown,
): ReleaseCreationSettings {
  if (
    typeof settings === 'object' &&
    settings !== null &&
    !Array.isArray(settings)
  ) {
    const parsed = settings as Record<string, unknown>;
    return {
      tag_template:
        typeof parsed['tag_template'] === 'string'
          ? parsed['tag_template']
          : '{major}.{minor}.{patch}',
      commit_url:
        typeof parsed['commit_url'] === 'string' ? parsed['commit_url'] : '',
      changelog_fallback:
        typeof parsed['changelog_fallback'] === 'string'
          ? parsed['changelog_fallback']
          : '- Minor bug fixes and improvements.',
    };
  }
  return {
    tag_template: '{major}.{minor}.{patch}',
    commit_url: '',
    changelog_fallback: '- Minor bug fixes and improvements.',
  };
}
