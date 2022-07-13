import { setFailed } from '@actions/core';
3;
import { context, graphql } from '../context/Context';
import type { Issue } from './Issue';

export async function createIssue(issue: Issue): Promise<{ created: boolean }> {
  try {
    await graphql(
      `
        mutation createIssue(
          $repositoryId: ID!
          $labelId: ID!
          $title: String!
          $body: String!
        ) {
          createIssue(
            input: {
              repositoryId: $repositoryId
              labelIds: [$labelId]
              title: $title
              body: $body
            }
          ) {
            issue {
              number
              url
            }
          }
        }
      `,
      {
        repositoryId: context.repositoryId,
        labelId: context.releaseTrackerLabelId,
        title: issue.title,
        body: issue.body,
      },
    );
    return { created: true };
  } catch (error: any) {
    setFailed(error);
    return { created: false };
  }
}
