import * as github from '@actions/github';
import { Version } from '@onezerocompany/commit';
import type { VersionJSON } from '@onezerocompany/commit/dist/lib/versions/Version';
import { getContentBetweenTags } from '../../utils/getContentBetweenTags';
// import { getContentBetweenTags } from '../../utils/getContentBetweenTags';
import { Context } from '../Context';
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

  public static fromJson(json: IssueJSON) {
    const context = new Context();
    return new Issue(context, {
      comments: [],
      version: Version.fromJson(json.version),
    });
  }

  async exists(): Promise<boolean> {
    // check if issue exists using the graphql api
    const octokit = github.getOctokit(this.context.token);
    const {
      data,
    }: {
      data: {
        repository: {
          issues: {
            nodes: {
              number: number;
              title: string;
              body: string;
            }[];
          };
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

    if (data.repository.issues.nodes.length === 0) {
      return false;
    }

    const titleMatch = this.title;
    return data.repository.issues.nodes.some((issueNode) => {
      const jsonContent = getContentBetweenTags(
        '<!-- JSON BEGIN',
        'JSON END -->',
      )(issueNode.body);

      const json = JSON.parse(jsonContent) as IssueJSON;
      const issue = Issue.fromJson(json);

      if (
        issue.version.major === this.version.major &&
        issue.version.minor === this.version.minor &&
        issue.version.patch === this.version.patch
      ) {
        return true;
      }

      return issue.title && issue.title === titleMatch;
    });
  }

  async create() {
    const octokit = github.getOctokit(this.context.token);
    // create the issue using the graphql api
    await octokit.graphql(
      `
        mutation createIssue($owner: String!, $repo: String!, $title: String!, $body: String!) {
          createIssue(input: { owner: $owner, repo: $repo, title: $title, body: $body }) {
            issue {
              number
              url
            }
          }
        }
      `,
      {
        ...this.context.repo,
        title: this.title,
        body: this.body,
        labels: ['release-tracker'],
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
