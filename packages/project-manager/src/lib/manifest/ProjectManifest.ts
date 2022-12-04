/**
 * @file Project manifest definition.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { EnvironmentSettings } from './EnvironmentSettings';
import { parseEnvironmentSettingsArray } from './EnvironmentSettings';
import type { UserSettings } from './UserSettings';
import { parseUsersArray } from './UserSettings';
import type { ReleaseCreationSettings } from './ReleaseCreationSettings';
import { parseReleaseCreationSettings } from './ReleaseCreationSettings';

/** Project manifest containing all settings, references and instructions for a project. */
export class ProjectManifest {
  /** Name of the main branch. */
  public main_branch: string;

  /** Gets the release tracks a project uses. */
  public release: ReleaseCreationSettings;

  /** Permissions assigned to specific users. */
  public users: UserSettings[];

  /** Environments to deploy the release to. */
  public environments: EnvironmentSettings[];

  /**
   * Initializes a new project manifest.
   *
   * @param manifest - Manifest to initialize the manifest from.
   * @example new ProjectManifest({ users: [], releaseTracks: {} });
   */
  public constructor(manifest?: unknown) {
    if (typeof manifest === 'object' && manifest !== null) {
      const parsed = manifest as Record<string, unknown>;
      this.main_branch = (parsed['main_branch'] ?? 'main') as string;
      this.release = parseReleaseCreationSettings(parsed['release']);
      this.users = parseUsersArray(parsed['users'] ?? []);
      this.environments = parseEnvironmentSettingsArray(
        parsed['environments'] ?? [],
      );
    } else {
      this.main_branch = 'main';
      this.release = {
        tag_template: '{major}.{minor}.{patch}',
        commit_url: '',
        release_url: '',
        changelog_fallback: '- Minor bug fixes and improvements.',
      };
      this.users = [];
      this.environments = [];
    }
  }
}
