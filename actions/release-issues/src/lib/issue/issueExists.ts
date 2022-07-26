import { debug } from '@actions/core';
import { getContentBetweenTags } from '../../utils/getContentBetweenTags';
import type { Globals } from '../../globals';
import type { IssueJSON } from './Issue';
import { Issue } from './Issue';

const query = `
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
`;

interface IssueNode {
  number: number;
  title: string;
  // eslint-disable-next-line id-denylist
  body: string;
}

interface QueryOutput {
  repository?: {
    issues?: {
      nodes: IssueNode[];
    };
  };
}

function issueMatch(issue: Issue, issueNode: IssueNode): boolean {
  const jsonContent = getContentBetweenTags(
    '<!-- JSON BEGIN',
    'JSON END -->',
  )(issueNode.body);

  try {
    const json = JSON.parse(jsonContent) as IssueJSON;
    const jsonIssue = Issue.fromJson({
      number: issueNode.number,
      json,
    });

    if (
      issue.version.major === jsonIssue.version.major &&
      issue.version.minor === jsonIssue.version.minor &&
      issue.version.patch === jsonIssue.version.patch
    ) {
      return true;
    }

    return jsonIssue.title === issue.title;
  } catch {
    return false;
  }
}

export async function issueExists(globals: Globals): Promise<boolean> {
  const { graphql, context } = globals;
  const { issue } = context;

  // check if issue exists using the graphql api
  const { repository }: QueryOutput = await graphql(query, {
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  if (!repository?.issues || repository.issues.nodes.length === 0) {
    debug(`No issues found in: ${JSON.stringify(repository)}`);
    return false;
  }

  return repository.issues.nodes.some((issueNode) =>
    issueMatch(issue, issueNode),
  );
}
