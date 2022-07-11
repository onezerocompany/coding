import { Track } from './Track';
import { Platform } from './Platform';

export class TrackSettings {
  enabled: boolean;
  version: {
    template: string;
  };
  requirements: {
    tests: {
      action: string;
      coverage: number;
    }[];
  };
  release: {
    manual: boolean;
    waitForTracks: Track[];
    platforms: Platform[];
    // users allowed to release this track
    allowedUsers: string[];
  };

  private static defaultEnabled(track: Track): boolean {
    switch (track) {
      case Track.alpha:
        return false;
      case Track.beta:
        return false;
      case Track.release:
        return true;
    }
  }

  private static defaultVersionTemplate(track: Track): string {
    switch (track) {
      case Track.alpha:
        return '{{version}}-alpha';
      case Track.beta:
        return '{{version}}-beta';
      case Track.release:
        return '{{version}}';
    }
  }

  constructor(inputs?: { track?: Track; json?: any }) {
    const track = inputs?.track ?? Track.release;
    this.enabled = inputs?.json?.enabled ?? TrackSettings.defaultEnabled(track);
    this.version = {
      template:
        inputs?.json?.version?.template ??
        TrackSettings.defaultVersionTemplate(track),
    };
    this.requirements = {
      tests: inputs?.json?.requirements?.tests ?? [],
    };
    this.release = {
      manual: inputs?.json?.release?.manual ?? true,
      waitForTracks: inputs?.json?.release?.waitForTracks ?? [],
      platforms: inputs?.json?.release?.platforms ?? [],
      allowedUsers: inputs?.json?.release?.allowedUsers ?? [],
    };
    // filter out non existent tracks
    this.release.waitForTracks = this.release.waitForTracks.filter(
      (track) => Track[track] !== undefined,
    );
    // filter out non existent platforms
    this.release.platforms = this.release.platforms.filter(
      (platform) => Platform[platform] !== undefined,
    );
  }
}
