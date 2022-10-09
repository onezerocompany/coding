/**
 * @file Contains.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Platforms we publish to. */
export enum Platform {
  /** Google's Android. */
  android = 'android',
  /** Apple's iOS. */
  ios = 'ios',
  /** Microsoft's Windows. */
  windows = 'windows',
  /** Apple's macOS. */
  macos = 'macos',
  /** Linux. */
  linux = 'linux',
  /** Web. */
  web = 'web',
  /** Node Package Manager. */
  npm = 'npm',
  /** Docker Image. */
  docker = 'docker',
}

export const platforms = Object.values(Platform);
