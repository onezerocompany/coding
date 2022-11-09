/**
 * @file Contains functions to determine the previous version.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { debug as logDebug, error as logError } from '@actions/core';
import type { getOctokit } from '@actions/github';
import { context as githubContext } from '@actions/github';
import { Version } from '@onezerocompany/commit';

const query = `
  query latestReleases($owner:String!, $repo:String!) {
    repository(owner:$owner, name:$repo) {
      releases(orderBy: {
        field: CREATED_AT,
        direction: DESC
      }, first: 10) {
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

  if (!repository) {
    logError('Could not load previous versions.');
    return null;
  }

  logDebug(
    `Loaded previous releases:\n ${repository.releases.nodes
      .map((version) => version.name)
      .join('\n')}`,
  );

  return (
    repository.releases.nodes
      .map((node: { name: string }) => Version.fromString(node.name))
      .sort(Version.sort)
      .reverse()[0] ?? null
  );
}
