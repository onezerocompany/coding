import { VersionTrack } from '@onezerocompany/commit';
import { Platform } from './Platform';

export interface TrackSettingsJSON {
  enabled: boolean;
  version: {
    template: string;
  };
  requirements: {
    tests: Array<{
      action: string;
      coverage: number;
    }>;
  };
  release: {
    manual: boolean;
    waitForTracks: string[];
    platforms: string[];
    allowedUsers: string[];
  };
}

export class TrackSettings {
  public enabled: boolean;
  public version: {
    template: string;
  };

  public requirements: {
    tests: Array<{
      action: string;
      coverage: number;
    }>;
  };

  public release: {
    manual: boolean;
    waitForTracks: VersionTrack[];
    platforms: Platform[];
    allowedUsers: string[];
  };

  public constructor(inputs?: {
    forTrack?: VersionTrack;
    json?: TrackSettingsJSON;
  }) {
    const track = inputs?.forTrack ?? VersionTrack.live;
    this.enabled = inputs?.json?.enabled ?? TrackSettings.defaultEnabled(track);
    this.version = {
      template:
        inputs?.json?.version.template ??
        TrackSettings.defaultVersionTemplate(track),
    };
    this.requirements = { tests: inputs?.json?.requirements.tests ?? [] };
    this.release = {
      manual: inputs?.json?.release.manual ?? true,
      // convert array of strings to array of tracks
      waitForTracks: (inputs?.json?.release.waitForTracks.filter((waitTrack) =>
        Object.keys(VersionTrack).includes(waitTrack),
      ) ?? []) as VersionTrack[],
      // convert array of strings to array of platforms
      platforms: (inputs?.json?.release.platforms.filter((platform) =>
        Object.keys(Platform).includes(platform),
      ) ?? []) as Platform[],
      allowedUsers: inputs?.json?.release.allowedUsers ?? [],
    };
    // filter out non existent tracks
    this.release.waitForTracks = this.release.waitForTracks.filter(
      (waitTrack) => Object.keys(VersionTrack).includes(waitTrack),
    );
    // filter out non existent platforms
    this.release.platforms = this.release.platforms.filter((platform) =>
      Object.keys(Platform).includes(platform),
    );
  }

  public get json(): TrackSettingsJSON {
    return {
      enabled: this.enabled,
      version: {
        template: this.version.template,
      },
      requirements: {
        tests: this.requirements.tests,
      },
      release: {
        manual: this.release.manual,
        waitForTracks: this.release.waitForTracks,
        platforms: this.release.platforms,
        allowedUsers: this.release.allowedUsers,
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
