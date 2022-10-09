/**
 * @file Contains a validator for project manifests.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type {
  PermissionSettings,
  ReleaseTrack,
  ReleaseTrackSettings,
} from '../manifest';
import { platforms, releaseTracks } from '../manifest';
import type { ProjectManifest } from '../manifest/ProjectManifest';
import { validateGitHubUsername } from './validateGitHubUsername';

/**
 * Validates a list of permissions.
 *
 * @param permissions - List of permissions to validate.
 * @returns A list of errors found in the permissions.
 * @example validatePermissions(permissions);
 */
function validatePermissions(
  permissions: PermissionSettings[],
): ManifestError[] {
  const errors: ManifestError[] = [];
  for (const permission of permissions) {
    if (!validateGitHubUsername(permission.username)) {
      errors.push({
        message: `Invalid GitHub username: ${permission.username}`,
        scope: 'permissions',
        severity: 'error',
      });
    }
    permission.canReleaseTracks.forEach((track) => {
      if (releaseTracks.includes(track)) {
        errors.push({
          message: `Invalid release track: ${track}`,
          scope: 'permissions',
          severity: 'error',
        });
      }
    });
  }
  return errors;
}

/**
 * Validates a changelog section.
 *
 * @param settings - Release track settings to validate.
 * @returns A list of errors found in the changelog section.
 * @example validateChangelogSection(settings);
 */
function validateChangelogSection(
  settings: ReleaseTrackSettings,
): ManifestError[] {
  const errors: ManifestError[] = [];
  const minFallbackMessageLength = 10;
  if (settings.changelog.fallbackMessage.length < minFallbackMessageLength) {
    errors.push({
      message: 'Fallback message is too short.',
      scope: 'releaseTrack',
      severity: 'warning',
    });
  }
  return errors;
}

/**
 * Validates the release section of a release track setting.
 *
 * @param settings - Release track settings to validate.
 * @returns A list of errors found in the release section.
 * @example validateReleaseSection(settings, errors);
 */
function validateReleaseSection(
  settings: ReleaseTrackSettings,
): ManifestError[] {
  const errors: ManifestError[] = [];
  if (!settings.release.tagTemplate.includes('{{version}}')) {
    errors.push({
      message: 'Tag template does not include `{{version}}`.',
      scope: 'releaseTrack',
      severity: 'warning',
    });
  }
  // Version template needs to include `{{version}}`
  if (!settings.release.versionTemplate.includes('{{version}}')) {
    errors.push({
      message: 'Version template does not include `{{version}}`.',
      scope: 'releaseTrack',
      severity: 'warning',
    });
  }
  return errors;
}

/**
 * Validates a project manifest.
 *
 * @param settings - The project manifest to validate.
 * @returns A list of errors found in the manifest.
 * @example validateManifest(manifest);
 */
function validateReleaseTrack(settings: ReleaseTrackSettings): ManifestError[] {
  const errors: ManifestError[] = [];
  // Make sure all release tracks are valid
  for (const track of settings.waitForTracks) {
    if (!releaseTracks.includes(track)) {
      errors.push({
        message: `Invalid release track: ${track}`,
        scope: 'releaseTrack',
        severity: 'error',
      });
    }
  }
  // Make sure all the specified platforms exist
  for (const platform of settings.platforms) {
    if (!platforms.includes(platform)) {
      errors.push({
        message: `Invalid platform: ${platform}`,
        scope: 'releaseTrack',
        severity: 'error',
      });
    }
  }
  // Fallback message needs to be at least 10 characters long
  errors.push(...validateChangelogSection(settings));
  // Make sure the release section is valid
  errors.push(...validateReleaseSection(settings));
  return errors;
}

/** Error found in the project manifest. */
export interface ManifestError {
  /** Message describing the error. */
  message: string;
  /** Scope of the error. */
  scope: string;
  /** Severity of the error. */
  severity: 'error' | 'warning';
}

/**
 * Validates a project manifest.
 *
 * @param manifest - The manifest to validate.
 * @returns `true` if the manifest is valid, `false` otherwise.
 * @example new ProjectManifest({ file: 'path/to/manifest.json' });
 */
export function validateManifest(manifest: ProjectManifest): {
  errors: ManifestError[];
  valid: boolean;
} {
  const errors: ManifestError[] = [];

  errors.push(...validatePermissions(manifest.permissions));

  for (const track of Object.keys(manifest.releaseTracks) as ReleaseTrack[]) {
    if (releaseTracks.includes(track)) {
      const releaseTrack = manifest.releaseTracks[track];
      if (releaseTrack) errors.push(...validateReleaseTrack(releaseTrack));
    } else {
      errors.push({
        message: `Invalid release track: ${track}`,
        scope: 'releaseTracks',
        severity: 'error',
      });
    }
  }

  return { errors, valid: errors.length === 0 };
}
