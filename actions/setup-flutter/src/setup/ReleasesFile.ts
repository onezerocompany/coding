/**
 * @file Contains a definition of a releases file.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Definition of a release. */
export interface Release {
  /** Hash of the release. */
  hash: string;
  /** Channel this release is on. */
  channel: string;
  /** Version of the release. */
  version: string;
  /** Download location. */
  archive: string;
  /** Version of the Dart SDK. */
  dart_sdk_version?: string;
  /** Version of the Dart SDK. */
  dart_sdk_arch?: string;
}

/** Definition of a Flutter releases file. */
export interface ReleasesFile {
  /** Base url to fetch releases from. */
  base_url: string;
  /** Hashes of the current releases per channel. */
  current_release: {
    /** Hash for the latest beta release. */
    beta: string;
    /** Hash for the latest dev release. */
    dev: string;
    /** Hash for the latest stable release. */
    stable: string;
  };
  /** Array of all releases. */
  releases: Release[];
}
