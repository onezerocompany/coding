/**
 * @file Contains a function to detect the current architecture.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/** Flutter supported archs. */
export enum FlutterArch {
  /** X86_64. */
  x64 = 'x64',
  /** Arm64 for m1 macs. */
  arm64 = 'arm64',
}

/**
 * Detects the current architecture the action is running on.
 *
 * @param inputs - Function inputs.
 * @param inputs.arch - The architecture to use.
 * @returns The architecture the action is running on.
 * @throws If the architecture is not supported (unknown).
 * @example
 *  const arch = determineArch({ arch: 'x64' });
 */
export function determineArch({
  arch,
}: {
  arch?: FlutterArch | string | undefined;
}): FlutterArch {
  const specifiedArch = arch ?? process.arch;
  switch (specifiedArch) {
    /** X86_64. */
    case 'x64':
      return FlutterArch.x64;
    /** Arm64. */
    case 'arm64':
      return FlutterArch.arm64;
    /** All others. */
    default:
      throw new Error(`Unsupported architecture: ${specifiedArch}`);
  }
}
