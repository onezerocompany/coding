/**
 * @file Contains a function to determine the version of Flutter to install.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { info } from '@actions/core';
import nodeFetch from 'node-fetch';
import type { FlutterArch } from './determineArch';
import { determineArch } from './determineArch';
import type { FlutterPlatform } from './determinePlatform';
import type { ReleasesFile } from './ReleasesFile';

/**
 * Finds a matching release in a releases file.
 *
 * @param inputs - The function inputs.
 * @param inputs.releases - The releases file to search in.
 * @param inputs.platform - The platform to search for.
 * @param inputs.filter - The filter to use.
 * @returns The matching release.
 * @example const release = findRelease(releases, { version: '2.5.3', channel: 'stable', arch: 'x64' });
 */
function findRelease({
  releases,
  platform,
  filter,
}: {
  releases: ReleasesFile;
  platform: FlutterPlatform;
  filter: Record<string, string>;
}): {
  platform: FlutterPlatform;
  version: string;
  channel: string;
  arch: FlutterArch;
  downloadUrl: string;
} | null {
  const foundRelease = releases.releases.find((release) => {
    for (const [key, value] of Object.entries(filter)) {
      if ((release as unknown as Record<string, unknown>)[key] !== value) {
        return false;
      }
    }
    return true;
  });
  if (foundRelease) {
    return {
      version: foundRelease.version,
      platform,
      channel: foundRelease.channel,
      arch: determineArch({ arch: foundRelease.dart_sdk_arch }),
      downloadUrl: `${releases.base_url}/${foundRelease.archive}`,
    };
  }
  return null;
}

/**
 * Fetches a releases json for a specific platform.
 *
 * @param inputs - Input for the function.
 * @param inputs.platform - The platform to fetch the releases for.
 * @returns The releases json.
 * @example
 * const releases = await fetchReleases('macos');
 */
export async function getReleasesJson({
  platform,
}: {
  platform: string;
}): Promise<ReleasesFile> {
  const releasesJsonUrl = `https://storage.googleapis.com/flutter_infra_release/releases/releases_${platform}.json`;
  const releasesResponse = (await (
    await nodeFetch(releasesJsonUrl)
  ).json()) as ReleasesFile;
  return releasesResponse;
}

/**
 * Returns the download URL for the given version.
 *
 * @param input - Object containing the input parameters.
 * @param input.version - The version of the SDK to download.
 * @param input.channel - The channel of the SDK to download.
 * @param input.platform - The platform to download the SDK for.
 * @param input.arch - The architecture to download the SDK for.
 * @returns The download URL for the given version.
 * @example
 * const download = urlForVersion({
 *   version: '2.5.3',
 *   channel: 'stable',
 *   platform: 'linux',
 *   arch: 'x64',
 * });
 */
export async function determineVersion({
  version,
  channel,
  platform,
  arch,
}: {
  version: string;
  channel: string;
  platform: FlutterPlatform;
  arch: FlutterArch;
}): Promise<{
  version: string;
  channel: string;
  platform: FlutterPlatform;
  arch: FlutterArch;
  downloadUrl: string;
}> {
  info(`Determining version to install...`);

  const releases = await getReleasesJson({ platform });

  if (version === 'latest') {
    const hash =
      releases.current_release[
        channel as keyof typeof releases.current_release
      ];

    const latestRelease = findRelease({
      releases,
      platform,
      filter: { hash, channel, dart_sdk_arch: arch },
    });
    if (latestRelease) return latestRelease;
  } else {
    const specificRelease = findRelease({
      releases,
      platform,
      filter: { version, channel },
    });
    if (specificRelease) return specificRelease;
  }
  const fallbackRelease = findRelease({
    releases,
    platform,
    filter: { dart_sdk_arch: arch },
  });
  if (fallbackRelease) return fallbackRelease;

  throw new Error(
    `Unable to find a release for the given version, channel, platform and architecture.`,
  );
}
