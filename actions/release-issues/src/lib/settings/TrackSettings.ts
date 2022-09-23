/**
 * @file Settings for a release track.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { ReleaseTrack } from '@onezerocompany/commit';
import { Platform } from '../definitions/Platform';

/** Settings related to changelog rendering. */
interface ChangelogSettings {
  /** Message to be displayed at the bottom of a changelog. */
  footer: string;
  /** Message to be displayed at the top of a changelog. */
  header: string;
  /** Message to display when there are no changes. */
  fallback: string;
}

/**
 * Load changelog settings from a JSON object.
 *
 * @param json - JSON object to load from.
 * @returns ChangelogSettings object.
 * @example loadChangelogSettings({ header: 'Changelog', footer: 'Thanks for using this project!' })
 */
function loadChangelogSettings(json?: TrackSettingsJSON): ChangelogSettings {
  return {
    footer: json?.changelog?.footer ?? '',
    header: json?.changelog?.header ?? '',
    fallback: json?.changelog?.fallback ?? '- minor bug fixes and improvements',
  };
}

/** Settings for creating the releases. */
interface ReleaseSettings {
  /** Whether the release needs a human to trigger it. */
  manual: boolean;
  /** What tracks to wait for before releasing, or asking the user to release. */
  waitForTracks: string[];
  /** Which platforms to publish to. */
  platforms: string[];
  /** Which GitHub users are allowed to release this track. */
  allowedUsers: string[];
}

/**
 * Load release settings from a JSON object.
 *
 * @param json - JSON object to load from.
 * @returns ReleaseSettings object.
 * @example loadReleaseSettings({ manual: true, waitForTracks: ['alpha', 'beta'] })
 */
function loadReleaseSettings(json?: TrackSettingsJSON): ReleaseSettings {
  return {
    manual: json?.release?.manual ?? true,
    // Convert array of strings to array of tracks
    waitForTracks: (json?.release?.waitForTracks.filter((waitTrack) =>
      Object.keys(ReleaseTrack).includes(waitTrack),
    ) ?? []) as ReleaseTrack[],
    // Convert array of strings to array of platforms
    platforms: (json?.release?.platforms.filter((platform) =>
      Object.keys(Platform).includes(platform),
    ) ?? []) as Platform[],
    allowedUsers: json?.release?.allowedUsers ?? [],
  };
}

/** JSON version of a TrackSettings object. */
export interface TrackSettingsJSON {
  /** Whether the release track is used by this project. */
  enabled?: boolean;
  /** Version number related details. */
  version?: {
    /** Template to use for generating the version number. */
    template: string;
  };
  /** Settings related to releasing the bundled software package. */
  release?: ReleaseSettings;
  /** Settings related to generating changelogs. */
  changelog?: ChangelogSettings;
}

/** Settings for a release track. */
export class TrackSettings {
  /** Whether the release track is used by this project. */
  public enabled: boolean;

  /** Version number related settings. */
  public version: {
    /** Template for the version number. */
    template: string;
  };

  /** Release related settings. */
  public release: ReleaseSettings;

  /** Changelog related settings. */
  public changelog: ChangelogSettings;

  /**
   * Create a new TrackSettings object.
   *
   * @param inputs - Inputs to create the object from.
   * @param inputs.forTrack - Track to create the settings for.
   * @param inputs.json - JSON object to create the object from.
   * @example new TrackSettings({ forTrack: 'alpha' });
   */
  public constructor(inputs?: {
    forTrack?: ReleaseTrack;
    json?: TrackSettingsJSON;
  }) {
    const track = inputs?.forTrack ?? ReleaseTrack.stable;
    this.enabled = inputs?.json?.enabled ?? TrackSettings.defaultEnabled(track);
    this.version = {
      template:
        inputs?.json?.version?.template ??
        TrackSettings.defaultVersionTemplate(track),
    };
    this.release = loadReleaseSettings(inputs?.json);
    // Filter out non existent tracks
    this.release.waitForTracks = this.release.waitForTracks.filter(
      (waitTrack) => Object.keys(ReleaseTrack).includes(waitTrack),
    );
    // Filter out non existent platforms
    this.release.platforms = this.release.platforms.filter((platform) =>
      Object.keys(Platform).includes(platform),
    );
    this.changelog = loadChangelogSettings(inputs?.json);
  }

  /**
   * Get a JSON version of the object.
   *
   * @returns JSON version of the object.
   */
  public get json(): TrackSettingsJSON {
    return {
      enabled: this.enabled,
      version: {
        template: this.version.template,
      },
      release: {
        manual: this.release.manual,
        waitForTracks: this.release.waitForTracks,
        platforms: this.release.platforms,
        allowedUsers: this.release.allowedUsers,
      },
      changelog: {
        footer: this.changelog.footer,
        header: this.changelog.header,
        fallback: this.changelog.fallback,
      },
    };
  }

  /**
   * Recreate a TrackSettings object from a JSON object.
   *
   * @param json - JSON object to recreate the object from.
   * @returns TrackSettings object.
   * @example TrackSettings.fromJSON({ enabled: true });
   */
  public static fromJson(json: TrackSettingsJSON): TrackSettings {
    return new TrackSettings({ json });
  }

  /**
   * Whether the track is enabled by default for a given track.
   *
   * @param track - Track to get the enabled status for.
   * @returns Whether the track is enabled by default.
   * @example TrackSettings.defaultEnabled('alpha');
   */
  private static defaultEnabled(track: ReleaseTrack): boolean {
    switch (track) {
      /** It's not enabled for the alpha track by default. */
      case ReleaseTrack.alpha:
        return false;
      /** It's not enabled for the beta and stable tracks by default. */
      case ReleaseTrack.beta:
        return false;
      /** It's enabled for the stable track by default (and others). */
      default:
        return true;
    }
  }

  /**
   * The default version template for a given track.
   *
   * @param track - Track to get the default version template for.
   * @returns The default version template for the track.
   * @example TrackSettings.defaultVersionTemplate('alpha');
   */
  private static defaultVersionTemplate(track: ReleaseTrack): string {
    switch (track) {
      /** Template in case the version track is alpha. */
      case ReleaseTrack.alpha:
        return '{{version}}-alpha';
      /** Template in case the version track is beta. */
      case ReleaseTrack.beta:
        return '{{version}}-beta';
      /** Template in all other cases (including stable). */
      default:
        return '{{version}}';
    }
  }
}
