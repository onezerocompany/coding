import { getInput } from '@actions/core';
import github, { getOctokit } from '@actions/github';
import { validateMessage } from '@onezerocompany/commit';

const githubToken = getInput('github_token');
const prNumber = parseInt(getInput('pull_request'), 10);

async function run() {
  const octokit = getOctokit(githubToken);

  const { data: result } = await octokit.graphql(
    `
    query issues($owner: String!, $repo: String!, $pullRequestNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        pullRequest(number: $pullRequestNumber) {
          merged,
          commits(first:250) {
            nodes {
              commit {
                message
              }
            }
          }
        }
      }
    }
  `,
    {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pullRequestNumber: prNumber,
    },
  );

  if (result.repository.pullRequest.merged) {
    console.log('Pull request is already merged, skipping commit check');
    process.exit(0);
  }

  const commits = result.repository.pullRequest.commits.nodes;
  const valid = commits.every((commit: { message: string }) => {
    const validation = validateMessage({ message: commit.message });
    if (validation.errors) {
      for (const error of validation.errors) {
        console.error(error.displayString);
      }
    }
    return validation.valid;
  });

  if (valid) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();
