import type { getOctokit } from '@actions/github';
import { context as githubContext } from '@actions/github';
import { Context } from './Context';

const query = `
  query loadLabel($owner: String!, $repo: String!, $label: String!) {
    repository(owner: $owner, name: $repo) {
      id
      labels(
        first: 1
        query: $label
      ) {
        nodes {
          id
        }
      }
    }
  }
`;

interface QueryOutput {
  repository?: {
    id: string;
    labels: {
      nodes: Array<{
        id: string;
        name: string;
      }>;
    };
  };
}

export async function loadContext(
  graphql: ReturnType<typeof getOctokit>['graphql'],
): Promise<Context> {
  const { repository }: QueryOutput = await graphql(query, {
    owner: githubContext.repo.owner,
    repo: githubContext.repo.repo,
    label: 'release-tracker',
  });

  const repositoryId = repository?.id ?? '';
  const releaseTrackerLabelId = repository?.labels.nodes[0]?.id ?? '';

  return new Context({
    repo: {
      id: repositoryId,
      trackerLabelId: releaseTrackerLabelId,
      owner: githubContext.repo.owner,
      repo: githubContext.repo.repo,
    },
  });
}
