/**
 * @file Function to fetch a pull request from GitHub.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { getInput } from '@actions/core';
import { getOctokit } from '@actions/github';

const query = `
  query issues($owner: String!, $repo: String!, $prNumber: Int!) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $prNumber) {
        merged
        commits(first: 100) {s
          nodes {
            commit {
              message
            }
          }
        }
      }
    }
  }
`;

/** Pull request query output. */
export interface FetchPullRequestOutput {
  /** Repository object returned from the query. */
  repository?: {
    /** Pull request object returned from the query. */
    pullRequest: {
      /** Whether the pull request has been merged. */
      merged: boolean;
      /** Object containing the nodes of the commits list. */
      commits: {
        /** Commits in the pull request. */
        nodes: Array<{
          /** Commit object within the node. */
          commit: {
            /** Message of the commit. */
            message: string;
          };
        }>;
      };
    };
  };
}

/**
 * Fetch the pull request from the GitHub API.
 *
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @param prNumber - The number of the pull request.
 * @returns The pull request.
 * @async
 * @example
 *   async function call() {
 *     const pullRequest = await fetchPullRequest('onezerocompany', 'commit', 1);
 *   }
 */
export async function fetchPullRequest(
  owner: string,
  repo: string,
  prNumber: number,
): Promise<FetchPullRequestOutput> {
  const octokit = getOctokit(getInput('token'));

  const output: FetchPullRequestOutput = await octokit.graphql(query, {
    owner,
    repo,
    prNumber,
  });
  return output;
}
