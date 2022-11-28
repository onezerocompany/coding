/**
 * @file Contains a validator for project manifests.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { UserSettings } from '../manifest';
import type { ProjectManifest } from '../manifest/ProjectManifest';
import { validateGitHubUsername } from './validateGitHubUsername';

/**
 * Validates a list of permissions.
 *
 * @param permissions - List of permissions to validate.
 * @returns A list of errors found in the permissions.
 * @example validatePermissions(permissions);
 */
function validatePermissions(permissions: UserSettings[]): ManifestError[] {
  const errors: ManifestError[] = [];
  for (const permission of permissions) {
    if (!validateGitHubUsername(permission.username)) {
      errors.push({
        message: `Invalid GitHub username: ${permission.username}`,
        scope: 'permissions',
        severity: 'error',
      });
    }
  }
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

  errors.push(...validatePermissions(manifest.users));

  return { errors, valid: errors.length === 0 };
}
