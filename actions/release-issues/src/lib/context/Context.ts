/**
 * @file Contains the definition of the context object.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { VersionBump, Version } from '@onezerocompany/commit';
import type { Commit, RepoInfo, Settings } from './contextDeps';
import {
  Action,
  determineAction,
  determineBump,
  generateChangelogs,
  Issue,
  lastCommit,
  loadCommits,
  loadIssueFromContext,
} from './contextDeps';

/** Context object for the action. */
export class Context {
  /** Information about the repository. */
  public readonly repo: RepoInfo;

  // Specific to this run of the action
  /** The action that is being performed. */
  public readonly action: Action;

  /** Issue object for this action run. */
  public readonly issue: Issue;

  /** Last previous version that was created. */
  public readonly previousVersion: Version | null;

  /** List of commits that triggered the creation of this issue. */
  public readonly commits: Commit[];

  /** Amount the version should be bumped. */
  public readonly bump: VersionBump = VersionBump.none;

  /**
   * Create a new context object.
   *
   * @param input - Settings object for the action.
   * @param input.settings - Settings object for the action.
   * @param input.repo - Information about the repository.
   * @param input.previousVersion - Last previous version that was created.
   * @example
   *   const context = new Context({
   *     settings,
   *     repo,
   *     previousVersion,
   *   });
   */
  public constructor(input: {
    settings: Settings;
    repo: RepoInfo;
    previousVersion: Version | null;
  }) {
    this.repo = input.repo;
    this.action = determineAction();
    this.previousVersion = input.previousVersion;

    switch (this.action) {
      /** Create a new issue. */
      case Action.create:
        this.commits = loadCommits();
        this.bump = determineBump(this.commits);
        this.issue = this.createIssue(input.settings);
        break;
      /** Update an existing issue. */
      case Action.update:
        this.commits = [];
        this.issue = loadIssueFromContext();
        break;
      /** Do nothing in all other cases. */
      default:
        setFailed('Unsupported action');
        this.commits = [];
        this.issue = new Issue();
    }
  }

  /**
   * Create a new issue object.
   *
   * @param settings - Settings object for the action.
   * @returns A new issue object.
   * @example
   *   const issue = context.createIssue(settings);
   */
  private createIssue(settings: Settings): Issue {
    return new Issue({
      version: this.previousVersion?.bump(this.bump) ?? new Version(),
      commitish: lastCommit(),
      changelogs: generateChangelogs(settings, this.commits),
      commits: this.commits,
      items: [],
    });
  }
}
