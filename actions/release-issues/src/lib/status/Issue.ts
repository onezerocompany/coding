import * as github from '@actions/github';
import { Version } from '@onezerocompany/commit';
import type { VersionJSON } from '@onezerocompany/commit/dist/lib/versions/Version';
import { debug } from '@actions/core';
import { getContentBetweenTags } from '../../utils/getContentBetweenTags';
import type { Context } from '../Context';
import type { Comment } from './Comment';

export interface IssueJSON {
  number: number;
  title: string;
  body: string;
  version: VersionJSON;
}

export class Issue {
  number?: number;
  version: Version;
  comments: Comment[];
  context: Context;

  get title() {
    return `🚀 ${this.version.displayString} [Release Tracker]`;
  }
  get body() {
    let lines: string[][] = [];
    lines.push([
      '<!-- JSON BEGIN',
      JSON.stringify(this.toJson()),
      'JSON END -->',
    ]);
    lines.push(['### Details', `\`version: ${this.version.displayString}\``]);
    return lines
      .map((line) => line.join('\n'))
      .join('\n\n')
      .trim();
  }

  public toJson() {
    return JSON.stringify({
      version: this.version.toJson(),
    });
  }

  public static fromJson(context: Context, json: IssueJSON) {
    return new Issue(context, {
      comments: [],
      version: Version.fromJson(json.version),
    });
  }

  async exists(): Promise<boolean> {
    // check if issue exists using the graphql api
    const octokit = github.getOctokit(this.context.token);
    const {
      repository,
    }: {
      repository?: {
        issues?: {
          nodes: {
            number: number;
            title: string;
            body: string;
          }[];
        };
      };
    } = await octokit.graphql(
      `
        query issues($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            issues(
              last: 10
              labels: ["release-tracker"]
              states: [OPEN]
            ) {
              nodes {
                number
                body
                title
              }
            }
          }
        }
      `,
      {
        owner: this.context.repo.owner,
        repo: this.context.repo.repo,
      },
    );

    if (!repository?.issues) {
      debug(`No issues found in: ${JSON.stringify(repository)}`);
      return false;
    }

    if (repository?.issues.nodes.length === 0) {
      return false;
    }

    const titleMatch = this.title;
    return (
      repository?.issues?.nodes.some((issueNode) => {
        const jsonContent = getContentBetweenTags(
          '<!-- JSON BEGIN',
          'JSON END -->',
        )(issueNode.body);

        const json = JSON.parse(jsonContent) as IssueJSON;
        const issue = Issue.fromJson(this.context, json);

        if (
          issue.version.major === this.version.major &&
          issue.version.minor === this.version.minor &&
          issue.version.patch === this.version.patch
        ) {
          return true;
        }

        return issue.title && issue.title === titleMatch;
      }) ?? false
    );
  }

  async create() {
    const octokit = github.getOctokit(this.context.token);
    // create the issue using the graphql api
    await octokit.graphql(
      `
        mutation createIssue($repositoryId: ID!, $labelId: ID!, $title: String!, $body: String!) {
          createIssue(input: { repositoryId: $repositoryId, labelIds: [$labelId], title: $title, body: $body }) {
            issue {
              number
              url
            }
          }
        }
      `,
      {
        repositoryId: this.context.repositoryId,
        labelIds: [this.context.releaseTrackerLabelId],
        title: this.title,
        body: this.body,
      },
    );
  }

  constructor(
    context: Context,
    inputs?: { comments: Comment[]; version: Version },
  ) {
    this.version = inputs?.version ?? new Version();
    this.comments = inputs?.comments ?? [];
    this.context = context;
  }
}
