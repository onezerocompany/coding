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

export class Context {
  public readonly repo: RepoInfo;

  // specific to this run of the action
  public readonly action: Action;
  public readonly issue: Issue;
  public readonly previousVersion: Version | null;
  public readonly commits: Commit[];
  public readonly bump: VersionBump = VersionBump.none;

  public constructor(input: {
    settings: Settings;
    repo: RepoInfo;
    previousVersion: Version | null;
  }) {
    this.repo = input.repo;
    this.action = determineAction();
    this.previousVersion = input.previousVersion;

    switch (this.action) {
      case Action.create:
        this.commits = loadCommits();
        this.bump = determineBump(this.commits);
        this.issue = this.createIssue(input.settings);
        break;
      case Action.update:
        this.commits = [];
        this.issue = loadIssueFromContext();
        break;
      default:
        setFailed('Unsupported action');
        this.commits = [];
        this.issue = new Issue();
    }
  }

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
