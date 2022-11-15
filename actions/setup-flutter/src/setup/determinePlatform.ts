/**
 * @file Contains a function to detect the current platform.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { platform as currentPlatform } from 'os';

/** Flutter supported platforms. */
export enum FlutterPlatform {
  /** Linux. */
  linux = 'linux',
  /** Mac. */
  macos = 'macos',
  /** Windows. */
  windows = 'windows',
}

/**
 * Detects the current platform the action is running on.
 *
 * @param inputs - Function inputs.
 * @param inputs.platform - The platform to use.
 * @returns The platform the action is running on.
 * @throws If the platform is not supported (unknown).
 * @example
 *   const platform = currentPlatform();
 *   // Returns: 'macos'
 */
export function determinePlatform({
  platform,
}: {
  platform?: FlutterPlatform | string | undefined;
}): FlutterPlatform {
  const specifiedPlatform = platform ?? currentPlatform();
  switch (specifiedPlatform) {
    /** Apple macOS. */
    case 'darwin':
      return FlutterPlatform.macos;
    /** Microsoft Windows. */
    case 'win32':
      return FlutterPlatform.windows;
    /** Linux. */
    case 'linux':
      return FlutterPlatform.linux;
    /** Any others are unsupported. */
    default:
      throw new Error(`Unsupported platform: ${specifiedPlatform}`);
  }
}
