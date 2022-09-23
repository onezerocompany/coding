/**
 * @file Contains a list of platforms we can distribute to.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Type of platforms we can release the projec to. */
export enum Platform {
  /** Apple iOS, upload to the App Store. */
  ios = 'ios',
  /** Google Android, upload to Google Play. */
  android = 'android',
  /** Web app, upload to servers. */
  web = 'web',
  /** Apple macOS, uplaod to the App Store. */
  macos = 'macos',
  /** Windows, upload to the Windows Store. */
  windows = 'windows',
  /** Linux, package for redistribution on a website. */
  linux = 'linux',
  /** Website, upload to servers. */
  website = 'website',
  /** NPM, upload an npm package to either npm or GitHub. */
  npm = 'npm',
  /** Pub.dev, upload dart package to pub.dev. */
  pub = 'pub',
  /** Docker, upload to either Docker Hub or GitHub. */
  docker = 'docker',
}
