// External Imports
import { getInput, setFailed } from '@actions/core';
import { context as githubContext, getOctokit } from '@actions/github';
import type { PushEvent } from '@octokit/webhooks-definitions/schema';

// OneZero Imports
import { CommitMessage, parseMessage, Version } from '@onezerocompany/commit';

// Internal Imports
import { Issue } from '../issue/Issue';
import type { Settings } from '../settings/Settings';
import { loadSettings } from './loadSettings';

export enum Action {
  create = 'create',
  update = 'update',
  stop = 'stop',
}

export interface Commit {
  sha: string;
  message: CommitMessage;
}

export class Context {
  // general context
  public readonly token = getInput('token');
  public readonly octokit;
  public readonly repo = {
    owner: githubContext.repo.owner,
    repo: githubContext.repo.repo,
  };
  public repositoryId?: string;
  public releaseTrackerLabelId?: string;

  // settings set in the repo
  public readonly settings: Settings;

  // specific to this run of the action
  public readonly action: Action;
  public readonly commits?: Commit[] = [];
  public readonly issue = new Issue();

  public async load() {
    const octokit = getOctokit(this.token);

    // load the release tracker label id from the graphql api
    const {
      repository,
    }: {
      repository?: {
        id: string;
        labels: {
          nodes: {
            id: string;
            name: string;
          }[];
        };
      };
    } = await octokit.graphql(
      `
        query loadLabel($owner: String!, $repo: String!, $name: String!) {
          repository(owner: $owner, name: $repo) {
            id
            labels(
              first: 1
              query: $name
            ) {
              nodes {
                id
              }
            }
          }
        }
      `,
      {
        owner: this.repo.owner,
        repo: this.repo.repo,
        name: 'release-tracker',
      },
    );
    this.repositoryId = repository?.id ?? '';
    this.releaseTrackerLabelId = repository?.labels.nodes[0]?.id ?? '';
  }

  constructor() {
    this.octokit = getOctokit(this.token);
    this.settings = loadSettings();
    switch (githubContext.eventName) {
      // push to main branch
      case 'push':
        const pushEvent: PushEvent = githubContext.payload as PushEvent;

        // make sure the push is to the main branch
        if (pushEvent.ref !== 'refs/heads/main') {
          setFailed('Only pushes to the main branch are supported');
          this.action = Action.stop;
          break;
        }

        this.action = Action.create;

        // convert the commits to a list of Commit objects
        this.commits = pushEvent.commits.map((commit) => ({
          sha: commit.id,
          message: parseMessage(commit.message),
        }));

        this.issue = new Issue({
          comments: [],
          version: new Version(),
        });

        break;

      default:
        setFailed('Unsupported event');
        this.action = Action.stop;
    }
  }
}

export const context = new Context();
export const graphql = context.octokit.graphql;
