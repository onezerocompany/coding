import * as core from '@actions/core';
import * as github from '@actions/github';
import { validateMessage, ValidationError } from '@onezerocompany/commit';

const githubToken = core.getInput('token');
const prNumber = parseInt(
  core.getInput('pull_request', {
    trimWhitespace: true,
  }),
  10,
);

async function run() {
  const octokit = github.getOctokit(githubToken);

  const repo = github.context.repo.repo;
  const owner = github.context.repo.owner;

  console.log(`Repo: ${repo}`);
  console.log(`Owner: ${owner}`);
  console.log(`PR: ${prNumber}`);

  const { repository } = await octokit.graphql(
    `
    query issues($owner: String!, $repo: String!, $prNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        pullRequest(number: $prNumber) {
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
      prNumber,
    },
  );

  if (repository.pullRequest.merged) {
    console.log('Pull request is already merged, skipping commit check');
    process.exit(0);
  }

  const errors: ValidationError[] = [];
  const commits = repository.pullRequest.commits.nodes.map(
    (node: { commit: { message: string } }) => ({
      message: node.commit.message,
    }),
  ) as { message: string }[];

  core.setOutput('commits', JSON.stringify(commits));

  const valid = commits.every((commit) => {
    const validation = validateMessage({ message: commit.message });
    errors.push(...validation.errors);
    if (validation.errors) {
      for (const error of validation.errors) {
        console.error(error.displayString);
      }
    }
    return validation.valid;
  });

  core.setOutput('valid', valid);
  core.setOutput('errors', JSON.stringify(errors));

  if (valid) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();
