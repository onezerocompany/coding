import { VersionTrack } from './VersionTrack';
import { VersionBump } from './VersionBump';

export interface VersionJSON {
  major: number;
  minor: number;
  patch: number;
  template: string;
}

export class Version {
  public major: number;
  public minor: number;
  public patch: number;
  public template: string;

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
    this.template = inputs?.template ?? '{major}.{minor}.{patch}-{track}';
  }

  public displayString(
    inputs: {
      includeTrack: boolean;
      includeRelease: boolean;
      track: VersionTrack;
    } = {
      includeTrack: false,
      includeRelease: false,
      track: VersionTrack.live,
    },
  ): string {
    let display = this.template;
    display = display.replace(/\{major\}/gu, this.major.toString());
    display = display.replace(/\{minor\}/gu, this.minor.toString());
    display = display.replace(/\{patch\}/gu, this.patch.toString());
    if (
      (inputs.track === VersionTrack.live && !inputs.includeRelease) ||
      !inputs.includeTrack
    ) {
      display = display.replace(/\{track\}/gu, '');
    } else {
      display = display.replace(/\{track\}/gu, inputs.track.toString());
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
      template: this.template,
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
      template: json.template,
    });
  }

  public static fromString(string: string): Version {
    // remove all non numbers and non dots
    string = string.replace(/[^0-9.]/gu, '');
    const parts = string.split('.');
    const major = parseInt(parts[0] ?? '', 10);
    const minor = parseInt(parts[1] ?? '', 10);
    const patch = parseInt(parts[2] ?? '', 10);
    return new Version({
      major,
      minor,
      patch,
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
