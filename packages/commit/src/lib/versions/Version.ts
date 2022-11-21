/**
 * @file Definition of the Version class.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { VersionBump } from './VersionBump';

/** A JSON representation of a Version. */
export interface VersionJSON {
  /** Major digit. */
  major: number;
  /** Minor digit. */
  minor: number;
  /** Patch digit. */
  patch: number;
  /** Template the version uses to generate a displayString. */
  template: string;
}

/** An object containing details about a version number. */
export class Version {
  /** The major digit of the version. */
  public major: number;

  /** The minor digit of the version. */
  public minor: number;

  /** The patch digit of the version. */
  public patch: number;

  /** The template used to generate the displayString. */
  public template: string;

  /**
   * Create a new version.
   *
   * @param inputs - The inputs to use.
   * @param inputs.major - The major digit of the version.
   * @param inputs.minor - The minor digit of the version.
   * @param inputs.patch - The patch digit of the version.
   * @param inputs.template - The template used to generate the displayString.
   * @example
   *   const version = new Version({
   *     major: 1,
   *     minor: 2,
   *     patch: 3,
   *     track: ReleaseTrack.stable,
   *     template: '{major}.{minor}.{patch}-{track}',
   *     includeTrack: true,
   *     includeRelease: true,
   *   });
   */
  public constructor(inputs?: {
    major?: number;
    minor?: number;
    patch?: number;
    template?: string;
  }) {
    this.major = inputs?.major ?? 0;
    this.minor = inputs?.minor ?? 0;
    this.patch = inputs?.patch ?? 1;
    this.template = inputs?.template ?? '{major}.{minor}.{patch}';
  }

  /**
   * Output a JSON representation of this version.
   *
   * @returns A JSON representation of this version.
   * @example
   *   const json = version.toJson();
   *   // { major: 1, minor: 2, patch: 3, template: '{major}.{minor}.{patch}-{track}' }
   */
  public get json(): VersionJSON {
    return {
      major: this.major,
      minor: this.minor,
      patch: this.patch,
      template: this.template,
    };
  }

  /**
   * String representation of the version.
   *
   * @returns The string representation of the version.
   * @example const version = new Version().displayString();
   */
  public get displayString(): string {
    let display = this.template;
    display = display.replace(/\{major\}/gu, this.major.toString());
    display = display.replace(/\{minor\}/gu, this.minor.toString());
    display = display.replace(/\{patch\}/gu, this.patch.toString());

    // Remove all non-alphanumeric characters leading and trailing
    display = display.replace(/[^a-zA-Z0-9]*$/gu, '');
    display = display.replace(/^[^a-zA-Z0-9]*/gu, '');

    return display;
  }

  /**
   * Function to provide to the JavaScript sort function to sort an array of versions.
   *
   * @param lhs - The left hand side version.
   * @param rhs - The right hand side version.
   * @returns The result of the comparison.
   * @example
   *   const versions = [new Version(), new Version()];
   *   const sorted = versions.sort(Version.sort);
   */
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

  /**
   * Recreate a version object from a JSON representation.
   *
   * @param json - The JSON representation of the version.
   * @returns A new version object.
   * @example const version = Version.fromJson(json);
   */
  public static fromJson(json: VersionJSON): Version {
    return new Version({
      major: json.major,
      minor: json.minor,
      patch: json.patch,
      template: json.template,
    });
  }

  /**
   * Parse a string into a version.
   *
   * @param string - The string to parse.
   * @returns The parsed version.
   * @example const version = Version.parse('1.2.3');
   */
  public static fromString(string: string): Version {
    // Remove all non numbers and non dots
    const sanitizedString = string.replace(/[^0-9.]/gu, '');
    // Split the string into parts
    const parts = sanitizedString.split('.').map((part) => {
      const parsed = parseInt(part, 10);
      if (isNaN(parsed)) return 0;
      return parsed;
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const major = parts[0]!;
    const minor = parts[1] ?? 0;
    const patch = parts[2] ?? 0;
    return new Version({
      major,
      minor,
      patch,
    });
  }

  /**
   * Bump the version by the specified bump type.
   *
   * @param bump - The bump type to apply.
   * @returns The new version.
   * @example
   *   const bumpedVersion = new Version().bump(VersionBump.major);
   */
  public bump(bump: VersionBump): Version {
    switch (bump) {
      /** Bump the major digit 1 and set the others to 0. */
      case VersionBump.major:
        this.major += 1;
        this.minor = 0;
        this.patch = 0;
        break;
      /** Bump the minor digit by 1 and set the path digit to 0. */
      case VersionBump.minor:
        this.minor += 1;
        this.patch = 0;
        break;
      /** Bump the patch digit by 1 and leave the others as they were. */
      case VersionBump.patch:
        this.patch += 1;
        break;
      /** In any other case do not bump any digits. */
      default:
        break;
    }
    return this;
  }
}
