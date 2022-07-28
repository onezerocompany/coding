import { setFailed } from '@actions/core';
import { Version } from '@onezerocompany/commit';
import { Issue } from '../issue/Issue';
import { Action } from './Action';
import type { Commit } from './Commit';
import { currentAction } from './currentAction';
import { loadCommits } from './loadCommits';
import type { RepoInfo } from './RepoInfo';
import { loadIssueFromContext } from './loadIssueFromContext';

export class Context {
  public readonly repo: RepoInfo;

  // specific to this run of the action
  public readonly action: Action;
  public readonly commits?: Commit[];
  public readonly issue: Issue;

  public constructor(input: { repo: RepoInfo }) {
    this.repo = input.repo;
    this.action = currentAction();

    switch (this.action) {
      case Action.create:
        this.commits = loadCommits();
        this.issue = new Issue({
          version: new Version(),
        });
        break;
      case Action.update:
        this.issue = loadIssueFromContext();
        break;
      default:
        setFailed('Unsupported action');
        this.issue = new Issue();
    }
  }
}
