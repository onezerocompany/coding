/**
 * @file Function for resolving the version to install.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info, setOutput } from '@actions/core';
import type { FlutterArch } from './determineArch';
import type { FlutterPlatform } from './determinePlatform';
import { determineVersion } from './determineVersion';

/** Resolves the version to install. */

/** Details of a version. */
export interface VersionDetails {
  /** The version of the SDK to install. */
  version: string;
  /** The channel of the SDK to install. */
  channel: string;
}

/** Resolved Flutter SDK. */
export interface FlutterSDKDetails extends VersionDetails {
  /** The platform to download the SDK for. */
  platform: FlutterPlatform;
  /** The architecture to download the SDK for. */
  arch: FlutterArch;
}

/** Resolved Version. */
export interface ResolvedVersion extends FlutterSDKDetails {
  /** The download URL for the SDK. */
  downloadUrl: string;
}

/**
 * Resolves the version to install.
 *
 * @param parameters - The function parameters.
 * @param parameters.version - The version to install.
 * @param parameters.channel - The channel to install.
 * @param parameters.platform - The platform to install for.
 * @param parameters.arch - The architecture to install for.
 * @returns The resolved version details.
 * @example await resolvedVersion();
 */
export async function resolveVersionDetails({
  version,
  channel,
  platform,
  arch,
}: FlutterSDKDetails): Promise<ResolvedVersion> {
  info('Resolving version to install...');
  info(` specified: ${version}`);
  const versionDetails = await determineVersion({
    version,
    channel,
    platform,
    arch,
  });
  setOutput('version', versionDetails.version);
  setOutput('channel', versionDetails.channel);
  setOutput('platform', versionDetails.platform);
  setOutput('arch', versionDetails.arch);
  info(
    ` resolved to: ${versionDetails.version} (${versionDetails.channel}) for ${versionDetails.platform} (${versionDetails.arch})`,
  );
  return versionDetails;
}
