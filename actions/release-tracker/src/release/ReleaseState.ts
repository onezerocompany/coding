/**
 * @file Defines the Release class.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import {
  listCommits,
  ChangeLog,
  ChangeLogType,
  Version,
  getBumpForCommitList,
} from '@onezerocompany/commit';
import { createRelease, getLastestRelease } from '../utils/octokit';
import { isDefined } from '../utils/isDefined';
import { ReleaseAction } from './ReleaseAction';
import type { ReleaseEnvironment } from './ReleaseEnvironment';
import { parseReleaseEnvironmentsArray } from './ReleaseEnvironment';

/** Represents a release and its associated issue. */
export class ReleaseState {
  /** Release environments to deploy to. */
  public environments: ReleaseEnvironment[] = [];
  /** ID of the release object. */
  public releaseId?: number;
  /** ID of the related issue tracker. */
  public issueTrackerId?: string;
  /** Version number of release. */
  public version?: Version;

  /**
   * Determines the next action to take for this release.
   *
   * @returns The next action to take.
   * @example await determineAction();
   */
  public get nextAction(): ReleaseAction {
    if (!isDefined(this.releaseId)) return ReleaseAction.createRelease;
    return ReleaseAction.none;
  }

  /**
   * Converts a JSON string to a Release State.
   *
   * @param json - The JSON string to convert.
   * @returns The release state.
   * @example const release = ReleaseState.fromJson(json);
   */
  public static fromJson(json: string): ReleaseState | null {
    try {
      const release = new ReleaseState();
      const parsed = JSON.parse(json) as Record<string, unknown>;
      const { releaseId, issueTrackerId, environments } = parsed;
      if (typeof releaseId === 'number') release.releaseId = releaseId;
      if (typeof issueTrackerId === 'string')
        release.issueTrackerId = issueTrackerId;
      if (Array.isArray(environments))
        release.environments = parseReleaseEnvironmentsArray(environments);
      return release;
    } catch {
      return null;
    }
  }

  /**
   * Executes the next action for this release.
   *
   * @example await executeNextAction();
   */
  public async executeNextAction(): Promise<void> {
    switch (this.nextAction) {
      /** Trigger a release creation. */
      case ReleaseAction.createRelease:
        await this.createRelease();
        break;
      /** Handle any other cases. */
      default:
        break;
    }
    if (this.nextAction !== ReleaseAction.none) {
      await this.executeNextAction();
    }
  }

  /**
   * Creates a release for the current action.
   *
   * @example await this.createRelease()
   */
  private async createRelease(): Promise<void> {
    // Fetch the latest release from GitHub.
    const previousRelease = await getLastestRelease();
    const previousVersion = Version.fromString(previousRelease.tag_name);

    // Fetch commits since last release ref.
    const commits = listCommits({
      beginHash: previousRelease.tag_name,
    });

    // Generate changelog for release based on commits.
    const changelog = new ChangeLog({
      commits,
      type: ChangeLogType.internal,
      markdown: true,
    }).text;

    // Determine the next version.
    const bump = getBumpForCommitList(commits);
    this.version = previousVersion.bump(bump);

    // Create release.
    await createRelease({
      releaseState: this,
      changelog,
    });

    /*
     * Generate changelog (internal GitHub changelog).
     * Create release.
     * Attach `manifest.json` to release.
     */
  }
}
