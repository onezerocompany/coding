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

interface QueryOutput {
  repository?: {
    releases: {
      nodes: Array<{
        name: string;
      }>;
    };
  };
}

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
