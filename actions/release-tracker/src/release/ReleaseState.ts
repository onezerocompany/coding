/**
 * @file Defines the Release class.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { VersionJSON } from '@onezerocompany/commit';
import { Version, Commit } from '@onezerocompany/commit';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import type { CommitMessageJSON } from '@onezerocompany/commit/dist/lib/message/CommitMessage';
import { error as logError } from '@actions/core';
import { isDefined } from '../utils/isDefined';
import type { Context } from '../context/Context';
import { ReleaseAction } from './ReleaseAction';
import type { ReleaseEnvironmentJson } from './ReleaseEnvironment';
import { ReleaseEnvironment } from './ReleaseEnvironment';
import { issueText } from './issueText';
import { actionRouter } from './actionRouter';

/** JSON definition of release state. */
export interface ReleaseStateJson {
  /** Environments. */
  environments: ReleaseEnvironmentJson[];
  /** ID of the release object. */
  release_id?: number | undefined;
  /** ID of the related issue tracker. */
  issue_tracker_number?: number | undefined;
  /** Tracker label id. */
  tracker_label_id?: number | undefined;
  /** Version number of release. */
  version?: VersionJSON | undefined;
  /** List of commits. */
  commits?:
    | Array<{
        /** Hash of the commit. */
        hash: string;
        /** Commit message. */
        message: CommitMessageJSON;
      }>
    | undefined;
}

/** Represents a release and its associated issue. */
export class ReleaseState {
  /** Release environments to deploy to. */
  public environments: ReleaseEnvironment[] = [];
  /** ID of the release object. */
  public releaseId?: number;
  /** ID of the related issue tracker. */
  public issueTrackerNumber?: number;
  /** Tracker label id. */
  public trackerLabelId?: number;
  /** Version number of release. */
  public version?: Version;
  /** List of commits. */
  public commits?: Commit[];
  /** Assignees. */
  public assignees: string[] = [];

  /**
   * Getter that converts this ReleaseState into a JSON object.
   *
   * @returns The JSON object.
   * @example const json = release.json;
   */
  public get json(): ReleaseStateJson {
    return {
      environments: this.environments.map((environment) => environment.json),
      release_id: this.releaseId,
      issue_tracker_number: this.issueTrackerNumber,
      tracker_label_id: this.trackerLabelId,
      version: this.version?.json,
      commits: this.commits?.map((commit) => commit.json),
    };
  }

  /**
   * Whether the current issue comment needs an update.
   *
   * @returns Whether the current issue comment needs an update.
   * @example const needsUpdate = commentNeedsUpdate();
   */
  public get commentNeedsUpdate(): boolean {
    /*
     * If any comment's commentContent does not match the commentText, then
     * the comment needs an update.
     */
    return this.environments.some(
      (environment) =>
        environment.commentContent !==
        environment.commentText({
          state: this,
        }),
    );
  }

  /**
   * Whether an issue comment needs to be created.
   *
   * @returns Whether an issue comment needs to be created.
   * @example const needsComment = release.needsComment;
   */
  public get needsCommentCreation(): boolean {
    return this.environments.some(
      (environment) => typeof environment.issueCommentId !== 'number',
    );
  }

  /**
   * Whether any environment needs to be deployed.
   *
   * @returns Whether any environment needs to be deployed.
   * @example const needsDeploy = release.needsDeploy;
   */
  public get needsDeploy(): boolean {
    return this.environments.some(
      (environment) => environment.deployed && !environment.didDeploy,
    );
  }

  /**
   * Converts a JSON string to a Release State.
   *
   * @param json - The JSON string to convert.
   * @returns The release state.
   * @example const release = ReleaseState.fromJson(json);
   */
  public static fromJson(json: ReleaseStateJson): ReleaseState | null {
    try {
      const state = new ReleaseState();
      state.environments = json.environments.map((environment) =>
        ReleaseEnvironment.fromJson({
          json: environment,
        }),
      );
      if (isDefined(json.release_id)) state.releaseId = json.release_id;
      if (isDefined(json.issue_tracker_number))
        state.issueTrackerNumber = json.issue_tracker_number;
      if (isDefined(json.tracker_label_id))
        state.trackerLabelId = json.tracker_label_id;
      if (isDefined(json.version))
        state.version = Version.fromJson(json.version);
      state.commits =
        json.commits?.map((commit) => Commit.fromJson(commit)) ?? [];
      return state;
    } catch {
      logError('Failed to parse release state from json.');
      return null;
    }
  }

  /**
   * Needs to assign the issue to a user.
   *
   * @param parameters - The parameters.
   * @param parameters.manifest - The project manifest.
   * @returns Whether the issue needs to be assigned.
   * @example const needsAssign = release.needsAssign;
   */
  public needsAssign({ manifest }: { manifest: ProjectManifest }): boolean {
    const missingAssignees = manifest.users.filter(
      (user) => user.assign_issue && !this.assignees.includes(user.username),
    ).length;
    return missingAssignees > 0;
  }

  /**
   * Determines the next action to take for this release.
   *
   * @param parameters - The parameters for the function.
   * @param parameters.context - The context.
   * @returns The next action to take.
   * @example await determineAction();
   */
  public nextAction({ context }: { context: Context }): ReleaseAction {
    if (!isDefined(this.version)) return ReleaseAction.loadVersion;
    if (!isDefined(this.commits)) return ReleaseAction.loadCommits;
    if (!isDefined(this.releaseId)) return ReleaseAction.createRelease;
    if (!isDefined(this.issueTrackerNumber))
      return ReleaseAction.createTrackerIssue;
    if (this.needsCommentCreation)
      return ReleaseAction.createEnvironmentComment;
    if (!isDefined(this.trackerLabelId))
      return ReleaseAction.attachTrackerLabel;
    if (this.needsAssign({ manifest: context.projectManifest }))
      return ReleaseAction.assignIssue;
    if (this.commentNeedsUpdate) return ReleaseAction.updateEnvironmentComment;
    if (this.needsDeploy) return ReleaseAction.deploy;
    // Update issue must be last, to not cause too many writes.
    if (
      context.currentIssueText !==
      this.issueText({ manifest: context.projectManifest })
    )
      return ReleaseAction.updateIssue;
    return ReleaseAction.none;
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
   * @param parameters.context - The context.
   * @example await executeNextAction();
   */
  public async runActions({ context }: { context: Context }): Promise<void> {
    const action = this.nextAction({
      context,
    });
    if (action === ReleaseAction.none) return;
    await actionRouter({
      action,
      state: this,
      context,
    });
    await this.runActions({
      context,
    });
  }
}
