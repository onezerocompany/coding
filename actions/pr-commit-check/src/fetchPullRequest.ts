import { getInput } from '@actions/core';
import { getOctokit } from '@actions/github';

const query = `
  query issues($owner: String!, $repo: String!, $prNumber: Int!) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $prNumber) {
        merged,
        commits(first:100) {
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

export interface FetchPullRequestOutput {
  repository?: {
    pullRequest: {
      merged: boolean;
      commits: {
        nodes: Array<{
          commit: {
            message: string;
          };
        }>;
      };
    };
  };
}

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
