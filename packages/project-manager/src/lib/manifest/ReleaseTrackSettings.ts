/**
 * @file Release track settings.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { Platform } from './Platform';
import { platforms } from './Platform';
import { releaseTracks } from './ReleaseTrack';
import type { ReleaseTrack } from './ReleaseTrack';

/**
 * Parses the changelog section.
 * It takes an unknown object and tries to parse it into a changelog section.
 * If any value is invalid, it will be replaced with the default value.
 *
 * @param section - Section to parse.
 * @returns The parsed changelog section.
 * @example
 * parseChangelogSection({
 *   fallbackMessage: 'No changes',
 *   includeInternal: false,
 *   autoApproval: false,
 *   headers: [],
 *   footers: []
 * });
 */
function parseChangelogSection(section: unknown): ChangelogSection {
  const sectionObject = (
    typeof section === 'object' && section !== null ? section : {}
  ) as Record<string, unknown>;
  return {
    fallbackMessage:
      typeof sectionObject['fallbackMessage'] === 'string'
        ? sectionObject['fallbackMessage']
        : 'Minor changes and bug fixes.',
    includeInternal: sectionObject['includeInternal'] === true,
    autoApproval: sectionObject['autoApproval'] === true,
    headers: Array.isArray(sectionObject['headers'])
      ? sectionObject['headers'].map((header) =>
          typeof header === 'string' ? header : '',
        )
      : [],
    footers: Array.isArray(sectionObject['footers'])
      ? sectionObject['footers'].map((footer) =>
          typeof footer === 'string' ? footer : '',
        )
      : [],
  };
}

/**
 * Parses the release track settings.
 * It takes an unknown object and tries to parse it into release track settings.
 * If any value is invalid, it will be replaced with the default value.
 *
 * @param section - Section to parse.
 * @returns The parsed release track settings.
 * @example
 * parseReleaseTrackSettings({
 *   versionTemplate: 'v{{version}}',
 *   tagTemplate: 'v{{version}}',
 *   autoRelease: false,
 * });
 */
function parseReleaseSection(section: unknown): ReleaseSection {
  const sectionObject = (
    typeof section === 'object' && section !== null ? section : {}
  ) as Record<string, unknown>;
  return {
    versionTemplate:
      typeof sectionObject['versionTemplate'] === 'string'
        ? sectionObject['versionTemplate']
        : '{{version}}',
    tagTemplate:
      typeof sectionObject['tagTemplate'] === 'string'
        ? sectionObject['tagTemplate']
        : '{{version}}',
    autoRelease: sectionObject['autoRelease'] === true,
  };
}

/** Changelog section of the release track setting. */
export interface ChangelogSection {
  /** Message to display when there are no changes. */
  fallbackMessage: string;
  /** Whether to include changes flagged as internal. */
  includeInternal: boolean;
  /** Automatically approve changelogs. */
  autoApproval: boolean;
  /** Header message to display at the top of a changelog. */
  headers: string[];
  /** Footer message to display at the bottom of a changelog. */
  footers: string[];
}

/** Release section of the release track setting. */
export interface ReleaseSection {
  /** Template to use for generating version numbers. */
  versionTemplate: string;
  /** Template to use for generating tag names. */
  tagTemplate: string;
  /** Automatically approve releases. */
  autoRelease: boolean;
}

/** Settings for a release track. */
export interface ReleaseTrackSettings {
  /** Whether the release track should be used. */
  enabled: boolean;
  /** Tracks to wait for before starting on this track. */
  waitForTracks: ReleaseTrack[];
  /** Settings for changelog generation. */
  changelog: ChangelogSection;
  /** Settings for release creation. */
  release: ReleaseSection;
  /** Which platforms a track releases to. */
  platforms: Platform[];
}

/**
 * Parse a release track settings object.
 * It takes an unknown object and tries to parse it into release track settings.
 * If any value is invalid, it will be replaced with the default value.
 *
 * @param object - Object to parse.
 * @returns Parsed release track settings.
 * @example parseReleaseTrackSettings({ waitForTracks: [], changelog: {}, release: {}, platforms: [] });
 */
// eslint-disable-next-line max-lines-per-function
export function parseReleaseTrack(object: unknown): ReleaseTrackSettings {
  const settingsObject = (
    typeof object === 'object' && object !== null ? object : {}
  ) as Record<string, unknown>;
  return {
    enabled: true,
    waitForTracks: Array.isArray(settingsObject['waitForTracks'])
      ? settingsObject['waitForTracks']
          .filter((track) => releaseTracks.includes(track as ReleaseTrack))
          .map((track) => track as ReleaseTrack)
      : [],
    changelog: parseChangelogSection(settingsObject['changelog']),
    release: parseReleaseSection(settingsObject['release']),
    platforms: Array.isArray(settingsObject['platforms'])
      ? settingsObject['platforms']
          .filter((platform) => platforms.includes(platform as Platform))
          .map((platform) => platform as Platform)
      : [],
  };
}

/**
 * Parse multiple release track settings objects from a map of release tracks to settings.
 * It takes an unknown object and tries to parse it into release track settings.
 * If any value is invalid, it will be replaced with the default value.
 * If any track key is invalid, it will be ignored.
 *
 * @param object - Object to parse.
 * @returns Parsed release track settings.
 * @example parseReleaseTracks({ alpha: {}, beta: {} });
 */
export function parseReleaseTracks(object: unknown): {
  [key in ReleaseTrack]?: ReleaseTrackSettings;
} {
  const settingsObject = (
    typeof object === 'object' && object !== null ? object : {}
  ) as Record<string, unknown>;

  const settings: { [key in ReleaseTrack]?: ReleaseTrackSettings } = {};
  for (const track of Object.keys(settingsObject)) {
    if (releaseTracks.includes(track as ReleaseTrack)) {
      settings[track as ReleaseTrack] = parseReleaseTrack(
        settingsObject[track as ReleaseTrack],
      );
    }
  }
  return settings;
}
