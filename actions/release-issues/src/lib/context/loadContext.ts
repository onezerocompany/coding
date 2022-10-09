/**
 * @file Contains the.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { debug } from '@actions/core';
import type { getOctokit } from '@actions/github';
import { context as githubContext } from '@actions/github';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import { Context } from './Context';
import { previousVersion } from './previousVersion';

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

/** Output of the loadLabel query. */
interface QueryOutput {
  /** Repository object from the query. */
  repository?: {
    /** Identifier of the repository. */
    id: string;
    /** Labels object from the query. */
    labels: {
      /** List of labels. */
      nodes: Array<{
        /** Identifier of the label. */
        id: string;
        /** Name of the label. */
        name: string;
      }>;
    };
  };
}

/**
 * Loads the context from the GitHub Actions context.
 *
 * @param projectManifest - Project manifest.
 * @param graphql - GraphQL client to use.
 * @example await loadContext(settings, graphql);
 */
export async function loadContext(
  projectManifest: ProjectManifest,
  graphql: ReturnType<typeof getOctokit>['graphql'],
): Promise<Context> {
  const { repository }: QueryOutput = await graphql(query, {
    owner: githubContext.repo.owner,
    repo: githubContext.repo.repo,
    label: 'release-tracker',
  });

  const repositoryId = repository?.id ?? '';
  const releaseTrackerLabelId = repository?.labels.nodes[0]?.id ?? '';

  debug(`repositoryId: ${repositoryId}`);
  debug(`releaseTrackerLabelId: ${releaseTrackerLabelId}`);
  debug(`owner: ${githubContext.repo.owner}`);
  debug(`repository: ${githubContext.repo.repo}`);

  const lastRelease = await previousVersion(graphql);

  return new Context({
    projectManifest,
    previousVersion: lastRelease,
    repo: {
      id: repositoryId,
      trackerLabelId: releaseTrackerLabelId,
      owner: githubContext.repo.owner,
      repo: githubContext.repo.repo,
    },
  });
}
