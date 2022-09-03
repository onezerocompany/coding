import { debug, error as logError, info } from '@actions/core';
import type { Globals } from '../../globals';
import { jsonIndent } from '../../defaults';
import { issueExists } from './issueExists';
import { loadAssignees } from './loadAssignees';

// eslint-disable-next-line max-lines-per-function
export async function createIssue(
  globals: Globals,
): Promise<{ created: boolean }> {
  if (await issueExists(globals)) {
    info(`Issue already exists: ${globals.context.issue.title}`);
    return { created: false };
  }

  const { graphql, context } = globals;
  await globals.context.issue.update(globals);
  const { issue } = context;
  debug(
    `Creating issue ${issue.title}: ${JSON.stringify(
      issue.json,
      null,
      jsonIndent,
    )}`,
  );
  try {
    const {
      issue: createdIssue,
    }: {
      issue: {
        id: string;
        number: number;
        url: string;
      };
    } = await graphql(
      `
        mutation createIssue(
          $repositoryId: ID!
          $labelId: ID!
          $title: String!
          $content: String!
          $assignees: [ID!]
        ) {
          createIssue(
            input: {
              repositoryId: $repositoryId
              labelIds: [$labelId]
              title: $title
              body: $content
              assigneeIds: $assignees
            }
          ) {
            issue {
              id
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

    const users = await loadAssignees(globals);
    if (users.length > 0) {
      await graphql(
        `
          mutation assignIssue($issueId: ID!, $assignees: [ID!]) {
            addAssigneesToAssignable(
              input: { assignableId: $issueId, assigneeIds: $assignees }
            ) {
              assignable {
                id
              }
            }
          }
        `,
        {
          issueId: createdIssue.id,
          assignees: users,
        },
      );
    }

    return { created: true };
  } catch (createError: unknown) {
    logError(createError as Error);
    return { created: false };
  }
}
