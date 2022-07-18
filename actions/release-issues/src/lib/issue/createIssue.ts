import { debug, error as logError } from '@actions/core';
import type { Globals } from '../../globals';
import { jsonIndent } from '../../globals';

// eslint-disable-next-line max-lines-per-function
export async function createIssue(
  globals: Globals,
): Promise<{ created: boolean }> {
  const { graphql, context } = globals;
  const { issue } = context;
  debug(
    `Creating issue ${issue.title}: ${JSON.stringify(
      issue.json,
      null,
      jsonIndent,
    )}`,
  );
  try {
    await graphql(
      `
        mutation createIssue(
          $repositoryId: ID!
          $labelId: ID!
          $title: String!
          $content: String!
        ) {
          createIssue(
            input: {
              repositoryId: $repositoryId
              labelIds: [$labelId]
              title: $title
              body: $content
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
        repositoryId: context.repo.id,
        labelId: context.repo.trackerLabelId,
        title: issue.title,
        content: issue.content,
      },
    );

    return { created: true };
  } catch (createError: unknown) {
    logError(createError as Error);
    return { created: false };
  }
}
