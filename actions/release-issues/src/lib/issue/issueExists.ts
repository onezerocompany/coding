/**
 * @file
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

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

/** An object representing an Issue within the GitHub Graph. */
interface IssueNode {
  /** The issue number. */
  number: number;
  /** The issue title. */
  title: string;
  /** The issue body. */
  // eslint-disable-next-line id-denylist
  body: string;
}

/** An object representing the output of the issues related query. */
interface QueryOutput {
  /** The repository object that contains all the objects related to it that were queried. */
  repository?: {
    /** The issues object that contains the list of issue nodes. */
    issues?: {
      /** A list of issues resulting from the query. */
      nodes: IssueNode[];
    };
  };
}

/**
 * Match an issue object to a GitHub issue.
 *
 * @param issue - The issue object to match.
 * @param issueNode - The GitHub issue to match.
 * @returns Whether the issue object matches the GitHub issue.
 * @example
 *   const matches = matchIssueToNode(issue, issueNode);
 */
function issueMatch(issue: Issue, issueNode: IssueNode): boolean {
  const jsonContent = getContentBetweenTags(
    '<!-- JSON BEGIN',
    'JSON END -->',
    issueNode.body,
  );

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

/**
 * Checks wheter an issue for the given version already exists.
 *
 * @param globals - The global variables.
 * @returns A boolean indicating whether an issue exists.
 * @example
 *  const issueExists = await issueExists(globals);
 */
export async function issueExists(globals: Globals): Promise<boolean> {
  const { graphql, context } = globals;
  const { issue } = context;

  // Check if issue exists using the graphql api

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
