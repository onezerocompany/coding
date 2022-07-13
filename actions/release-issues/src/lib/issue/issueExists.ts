import { debug } from '@actions/core';
import { context } from '@actions/github';
import { getContentBetweenTags } from '../../utils/getContentBetweenTags';
import { graphql } from '../context/Context';
import { Issue, IssueJSON } from './Issue';

export async function issueExists(issue: Issue): Promise<boolean> {
  // check if issue exists using the graphql api
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
  } = await graphql(
    `
      query issues($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          issues(last: 10, labels: ["release-tracker"], states: [OPEN]) {
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
      owner: context.repo.owner,
      repo: context.repo.repo,
    },
  );

  if (!repository?.issues) {
    debug(`No issues found in: ${JSON.stringify(repository)}`);
    return false;
  }

  if (repository?.issues.nodes.length === 0) {
    return false;
  }

  const titleMatch = issue.title;
  return (
    repository?.issues?.nodes.some((issueNode) => {
      const jsonContent = getContentBetweenTags(
        '<!-- JSON BEGIN',
        'JSON END -->',
      )(issueNode.body);

      const json = JSON.parse(jsonContent) as IssueJSON;
      const issue = Issue.fromJson(json);

      if (
        issue.version.major === issue.version.major &&
        issue.version.minor === issue.version.minor &&
        issue.version.patch === issue.version.patch
      ) {
        return true;
      }

      return issue.title && issue.title === titleMatch;
    }) ?? false
  );
}
