import { debug } from '@actions/core';
import type { Globals } from './globals';

const query = `
  query releases($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      releases(last: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            name
            tagName
          }
        }
      }
    }
  }
`;

interface QueryOutput {
  repository?: {
    releases?: {
      edges: {
        node: Array<{
          name: string;
          tagName: string;
        }>;
      };
    };
  };
}

export async function fetchReleases(
  globals: Globals,
): Promise<Array<{ name: string; tagName: string }>> {
  const { graphql, context } = globals;
  const result: QueryOutput = await graphql(query, {
    owner: context.repo.owner,
    repo: context.repo.repo,
  });
  const jsonPadding = 2;
  debug(JSON.stringify(result, null, jsonPadding));
  return result.repository?.releases?.edges.node ?? [];
}
