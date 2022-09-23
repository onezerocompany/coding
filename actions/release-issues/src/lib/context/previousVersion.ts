/**
 * @file Contains functions to determine the previous version.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { getOctokit } from '@actions/github';
import { context as githubContext } from '@actions/github';
import { Version } from '@onezerocompany/commit';

const query = `
  query latestReleases($owner:String!, $repo:String!) {
    repository(owner:$owner, name:$repo) {
      releases(last:10) {
        nodes {
          name,
        }
      }
    }
  }
`;

/** Output of latest releases query. */
interface QueryOutput {
  /** Repository object containing releases. */
  repository?: {
    /** Releases object containing nodes. */
    releases: {
      /** Releases nodes in the query output. */
      nodes: Array<{
        /** Release name. */
        name: string;
      }>;
    };
  };
}

/**
 * Gets the latest release version from the GitHub GraphQL API.
 *
 * @param graphql - GraphQL client.
 * @returns Latest release version.
 * @example await getLatestReleaseVersion(graphql);
 */
export async function previousVersion(
  graphql: ReturnType<typeof getOctokit>['graphql'],
): Promise<Version | null> {
  const { repository }: QueryOutput = await graphql(query, {
    owner: githubContext.repo.owner,
    repo: githubContext.repo.repo,
  });

  if (!repository) return null;

  return (
    repository.releases.nodes
      .map((node: { name: string }) => Version.fromString(node.name))
      .sort(Version.sort)
      .reverse()[0] ?? null
  );
}
