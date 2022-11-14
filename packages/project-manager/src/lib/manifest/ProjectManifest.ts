/**
 * @file Project manifest definition.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { PermissionSettings } from './PermissionSettings';
import { parsePermissionArray } from './PermissionSettings';
import type { ReleaseTrack } from './ReleaseTrack';
import type { ReleaseTrackSettings } from './ReleaseTrackSettings';
import { parseReleaseTracks } from './ReleaseTrackSettings';

/** Project manifest containing all settings, references and instructions for a project. */
export class ProjectManifest {
  /** Name of the main branch */
  public mainBranch: string;

  /** Permissions assigned to specific users. */
  public permissions: PermissionSettings[];

  /** Release tracks a project uses. */
  public releaseTracks: { [key in ReleaseTrack]?: ReleaseTrackSettings };

  /**
   * Initializes a new project manifest.
   *
   * @param manifest - Manifest to initialize the manifest from.
   * @example new ProjectManifest({ permissions: [], releaseTracks: {} });
   */
  public constructor(manifest?: unknown) {
    if (typeof manifest === 'object' && manifest !== null) {
      const parsed = manifest as Record<string, unknown>;
      this.mainBranch = (parsed['mainBranch'] ?? 'main') as string;
      this.permissions = parsePermissionArray(parsed['permissions'] ?? []);
      this.releaseTracks = parseReleaseTracks(parsed['releaseTracks']);
    } else {
      this.mainBranch = 'main';
      this.permissions = [];
      this.releaseTracks = {};
    }
  }

  /**
   * Gets the release track settings for a specific release track.
   *
   * @param track - Release track to get the settings for.
   * @returns The release track settings for the specified release track.
   * @example manifest.getReleaseTrackSettings('stable');
   */
  public releaseTrackSettings(track: ReleaseTrack): ReleaseTrackSettings {
    return (
      this.releaseTracks[track] ?? {
        enabled: false,
        changelog: {
          fallbackMessage: 'Minor changes and bug fixes.',
          autoApproval: false,
          footers: [],
          headers: [],
          includeInternal: false,
        },
        release: {
          autoRelease: false,
          tagTemplate: '{{version}}',
          versionTemplate: '{{version}}',
        },
        platforms: [],
        waitForTracks: [],
      }
    );
  }
}
