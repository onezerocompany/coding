import { setFailed } from '@actions/core';
import { Version } from '@onezerocompany/commit';
import { Issue } from '../issue/Issue';
import { Action } from './Action';
import { currentAction } from './currentAction';
import { lastCommit, loadCommits } from './loadCommits';
import type { RepoInfo } from './RepoInfo';
import { loadIssueFromContext } from './loadIssueFromContext';
import type { Commit } from './Commit';
import { loadChangelogs } from './loadChangelogs';

export class Context {
  public readonly repo: RepoInfo;

  // specific to this run of the action
  public readonly action: Action;
  public readonly issue: Issue;
  public readonly previousVersion: Version | null;
  public readonly commits: Commit[];

  public constructor(input: {
    repo: RepoInfo;
    previousVersion: Version | null;
  }) {
    this.repo = input.repo;
    this.action = currentAction();
    this.previousVersion = input.previousVersion;

    switch (this.action) {
      case Action.create:
        this.commits = loadCommits();
        this.issue = new Issue({
          version: new Version(),
          commitish: lastCommit(),
          changelogs: loadChangelogs(this.commits),
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
