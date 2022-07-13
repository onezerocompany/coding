import * as core from '@actions/core';
import * as github from '@actions/github';
import type { Context } from './lib/context/Context';

// Fetch the latest 100 releases from the repository
export async function fetchReleases(
  context: Context,
): Promise<{ name: string; tagName: string }[]> {
  const octokit = github.getOctokit(context.token);
  const data: any = await octokit.graphql(
    `
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
    `,
    { owner: context.repo.owner, repo: context.repo.repo },
  );
  core.debug(JSON.stringify(data, null, 2));
  return data.repository.releases.edges.map((edge: any) => {
    return { name: edge.node.name, tagName: edge.node.tagName };
  });
}
