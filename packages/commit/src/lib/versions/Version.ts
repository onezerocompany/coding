import { VersionTrack } from './VersionTrack';
import { VersionBump } from './VersionBump';

export interface VersionJSON {
  major: number;
  minor: number;
  patch: number;
  track: string;
  template: string;
  includeTrack: boolean;
  includeRelease: boolean;
  display: string;
}

export class Version {
  public major: number;
  public minor: number;
  public patch: number;
  public track: VersionTrack;
  public template: string;
  public includeTrack: boolean;
  public includeRelease: boolean;

  public constructor(inputs?: {
    major?: number;
    minor?: number;
    patch?: number;
    track?: VersionTrack;
    template?: string;
    includeTrack?: boolean;
    includeRelease?: boolean;
  }) {
    this.major = inputs?.major ?? 0;
    this.minor = inputs?.minor ?? 0;
    this.patch = inputs?.patch ?? 1;
    this.track = inputs?.track ?? VersionTrack.release;
    this.template = inputs?.template ?? '{major}.{minor}.{patch}-{track}';
    this.includeTrack = inputs?.includeTrack ?? true;
    this.includeRelease = inputs?.includeRelease ?? false;
  }

  public get displayString(): string {
    let display = this.template;
    display = display.replace(/\{major\}/gu, this.major.toString());
    display = display.replace(/\{minor\}/gu, this.minor.toString());
    display = display.replace(/\{patch\}/gu, this.patch.toString());
    if (
      (this.track === VersionTrack.release && !this.includeRelease) ||
      !this.includeTrack
    ) {
      display = display.replace(/\{track\}/gu, '');
    } else {
      display = display.replace(/\{track\}/gu, this.track.toString());
    }

    // remove all non-alphanumeric characters leading and trailing
    display = display.replace(/[^a-zA-Z0-9]*$/gu, '');
    display = display.replace(/^[^a-zA-Z0-9]*/gu, '');

    return display;
  }

  public get json(): VersionJSON {
    return {
      major: this.major,
      minor: this.minor,
      patch: this.patch,
      track: this.track,
      template: this.template,
      includeTrack: this.includeTrack,
      includeRelease: this.includeRelease,
      display: this.displayString,
    };
  }

  public static sort = (lhs: Version, rhs: Version): number => {
    if (lhs.major > rhs.major) {
      return 1;
    } else if (lhs.major < rhs.major) {
      return -1;
    } else if (lhs.minor > rhs.minor) {
      return 1;
    } else if (lhs.minor < rhs.minor) {
      return -1;
    } else if (lhs.patch > rhs.patch) {
      return 1;
    } else if (lhs.patch < rhs.patch) {
      return -1;
    }
    return 0;
  };

  public static fromJson(json: VersionJSON): Version {
    return new Version({
      major: json.major,
      minor: json.minor,
      patch: json.patch,
      track: ((): VersionTrack => {
        switch (json.track) {
          case 'release':
            return VersionTrack.release;
          case 'alpha':
            return VersionTrack.alpha;
          case 'beta':
            return VersionTrack.beta;
          default:
            return VersionTrack.release;
        }
      })(),
      template: json.template,
      includeTrack: json.includeTrack,
      includeRelease: json.includeRelease,
    });
  }

  public bump(bump: VersionBump): Version {
    switch (bump) {
      case VersionBump.major:
        this.major += 1;
        this.minor = 0;
        this.patch = 0;
        break;
      case VersionBump.minor:
        this.minor += 1;
        this.patch = 0;
        break;
      case VersionBump.patch:
        this.patch += 1;
        break;
      default:
        break;
    }
    return this;
  }
}
