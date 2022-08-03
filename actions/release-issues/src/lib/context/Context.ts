import { setFailed } from '@actions/core';
import { Version } from '@onezerocompany/commit';
import { Issue } from '../issue/Issue';
import type { Commit, RepoInfo } from '../definitions';
import { Action } from '../definitions';
import type { Settings } from '../settings/Settings';
import { loadIssueFromContext } from './loadIssueFromContext';
import { lastCommit, loadCommits } from './loadCommits';
import { determineAction } from './determineAction';
import { generateChangelogs } from './generateChangelogs';

export class Context {
  public readonly repo: RepoInfo;

  // specific to this run of the action
  public readonly action: Action;
  public readonly issue: Issue;
  public readonly previousVersion: Version | null;
  public readonly commits: Commit[];

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
        this.issue = new Issue({
          version: new Version(),
          commitish: lastCommit(),
          changelogs: generateChangelogs(input.settings, this.commits),
          commits: this.commits,
        });
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
}
