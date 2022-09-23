/**
 * @file Contains functions to fetch a list of releases.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { debug } from '@actions/core';
import type { Globals } from '../../globals';
import { jsonIndent } from '../../constants';

const query = `
  query releases($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      releases(last: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
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

/** Output of the releases query. */
interface QueryOutput {
  /** Repository object from the query output. */
  repository?: {
    /** Releases object from the query output. */
    releases?: {
      /** Edges in the releases object. */
      edges: {
        /** List of release nodes. */
        node: Array<{
          /** Tag name of the release. */
          tagName: string;
          /** Name of the release. */
          name: string;
        }>;
      };
    };
  };
}

/**
 * Fetches a list of releases.
 *
 * @param globals - Global variables.
 * @returns List of releases.
 * @example
 *   const releases = await fetchReleases(globals);
 */
export async function fetchReleases(
  globals: Globals,
): Promise<Array<{ name: string; tagName: string }>> {
  const { graphql, context } = globals;

  const result: QueryOutput = await graphql(query, {
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  debug(JSON.stringify(result, null, jsonIndent));
  return result.repository?.releases?.edges.node ?? [];
}
