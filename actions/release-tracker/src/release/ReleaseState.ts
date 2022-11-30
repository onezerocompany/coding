/**
 * @file Defines the Release class.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { VersionBump } from '@onezerocompany/commit';
import type { Commit, Version } from '@onezerocompany/commit';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import { isDefined } from '../utils/isDefined';
import { ReleaseAction } from './ReleaseAction';
import type { ReleaseEnvironment } from './ReleaseEnvironment';
import { parseReleaseEnvironmentsArray } from './ReleaseEnvironment';
import { issueText } from './issueText';
import { actionRouter } from './actionRouter';

/** Represents a release and its associated issue. */
export class ReleaseState {
  /** Release environments to deploy to. */
  public environments: ReleaseEnvironment[] = [];
  /** ID of the release object. */
  public releaseId?: number;
  /** ID of the related issue tracker. */
  public issueTrackerId?: number;
  /** Tracker label id. */
  public trackerLabelId?: number;
  /** Version number of release. */
  public version?: Version;
  /** Commits. */
  public commits?: Commit[];
  /** Previous `Version`. */
  public previousVersion?: Version;
  /** Previous ref hash. */
  public previousSha?: string;
  /** Bump from last version. */
  public bump = VersionBump.none;
  /** Last saved json. */
  public lastSavedJson = '';

  /**
   * Determines the next action to take for this release.
   *
   * @returns The next action to take.
   * @example await determineAction();
   */
  public get nextAction(): ReleaseAction {
    if (!isDefined(this.version)) return ReleaseAction.loadVersion;
    if (!isDefined(this.commits)) return ReleaseAction.loadCommits;
    if (this.bump === VersionBump.none) return ReleaseAction.none;
    if (!isDefined(this.releaseId)) return ReleaseAction.createRelease;
    if (!isDefined(this.issueTrackerId))
      return ReleaseAction.createTrackerIssue;
    if (this.environments.some((environment) => !environment.deployed))
      return ReleaseAction.createEnvironmentComment;
    if (!isDefined(this.trackerLabelId))
      return ReleaseAction.attachTrackerLabel;
    if (this.lastSavedJson.length > 0 && this.lastSavedJson !== this.json)
      return ReleaseAction.updateIssue;
    return ReleaseAction.none;
  }

  /**
   * Getter that converts this ReleaseState into a JSON object.
   *
   * @returns The JSON object.
   * @example const json = release.json;
   */
  public get json(): string {
    return JSON.stringify({
      releaseId: this.releaseId,
      issueTrackerId: this.issueTrackerId,
      environments: this.environments.map((environment) => ({
        github_name: environment.github_name,
        deployed: environment.deployed,
        status: environment.status,
        type: environment.type?.toString(),
      })),
    });
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
      if (typeof issueTrackerId === 'number')
        release.issueTrackerId = issueTrackerId;
      if (Array.isArray(environments))
        release.environments = parseReleaseEnvironmentsArray(environments);
      return release;
    } catch {
      return null;
    }
  }

  /**
   * Text for an issue.
   *
   * @param parameters - Parameters for the issue text.
   * @param parameters.manifest - The project manifest.
   * @returns The issue text.
   * @example const text = release.issueText({ manifest });
   */
  public issueText({ manifest }: { manifest: ProjectManifest }): string {
    return issueText({ state: this, manifest });
  }

  /**
   * Executes the next action for this release.
   *
   * @param parameters - Parameters of the function.
   * @param parameters.manifest - The project manifest.
   * @example await executeNextAction();
   */
  public async runActions({
    manifest,
  }: {
    manifest: ProjectManifest;
  }): Promise<void> {
    await actionRouter({
      action: this.nextAction,
      state: this,
      manifest,
    });
    if (this.nextAction !== ReleaseAction.none) {
      await this.runActions({
        manifest,
      });
    }
  }
}
