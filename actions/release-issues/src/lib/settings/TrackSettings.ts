import { VersionTrack } from '@onezerocompany/commit';
import { Platform } from '../definitions/Platform';

interface ChangelogSettings {
  footer: string;
  header: string;
  fallback: string;
}

function loadChangelogSettings(json?: TrackSettingsJSON): ChangelogSettings {
  return {
    footer: json?.changelog?.footer ?? '',
    header: json?.changelog?.header ?? '',
    fallback: json?.changelog?.fallback ?? '- minor bug fixes and improvements',
  };
}

interface ReleaseSettings {
  manual: boolean;
  waitForTracks: string[];
  platforms: string[];
  allowedUsers: string[];
}

function loadReleaseSettings(json?: TrackSettingsJSON): ReleaseSettings {
  return {
    manual: json?.release?.manual ?? true,
    // convert array of strings to array of tracks
    waitForTracks: (json?.release?.waitForTracks.filter((waitTrack) =>
      Object.keys(VersionTrack).includes(waitTrack),
    ) ?? []) as VersionTrack[],
    // convert array of strings to array of platforms
    platforms: (json?.release?.platforms.filter((platform) =>
      Object.keys(Platform).includes(platform),
    ) ?? []) as Platform[],
    allowedUsers: json?.release?.allowedUsers ?? [],
  };
}

export interface TrackSettingsJSON {
  enabled?: boolean;
  version?: {
    template: string;
  };
  release?: ReleaseSettings;
  changelog?: ChangelogSettings;
}

export class TrackSettings {
  public enabled: boolean;
  public version: {
    template: string;
  };

  public release: ReleaseSettings;
  public changelog: ChangelogSettings;

  public constructor(inputs?: {
    forTrack?: VersionTrack;
    json?: TrackSettingsJSON;
  }) {
    const track = inputs?.forTrack ?? VersionTrack.live;
    this.enabled = inputs?.json?.enabled ?? TrackSettings.defaultEnabled(track);
    this.version = {
      template:
        inputs?.json?.version?.template ??
        TrackSettings.defaultVersionTemplate(track),
    };
    this.release = loadReleaseSettings(inputs?.json);
    // filter out non existent tracks
    this.release.waitForTracks = this.release.waitForTracks.filter(
      (waitTrack) => Object.keys(VersionTrack).includes(waitTrack),
    );
    // filter out non existent platforms
    this.release.platforms = this.release.platforms.filter((platform) =>
      Object.keys(Platform).includes(platform),
    );
    this.changelog = loadChangelogSettings(inputs?.json);
  }

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

  public static fromJson(json: TrackSettingsJSON): TrackSettings {
    return new TrackSettings({ json });
  }

  private static defaultEnabled(track: VersionTrack): boolean {
    switch (track) {
      case VersionTrack.alpha:
        return false;
      case VersionTrack.beta:
        return false;
      default:
        return true;
    }
  }

  private static defaultVersionTemplate(track: VersionTrack): string {
    switch (track) {
      case VersionTrack.alpha:
        return '{{version}}-alpha';
      case VersionTrack.beta:
        return '{{version}}-beta';
      default:
        return '{{version}}';
    }
  }
}
