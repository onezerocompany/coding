/**
 * @file
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { debug, error as logError, info } from '@actions/core';
import { VersionBump } from '@onezerocompany/commit';
import type { Globals } from '../../globals';
import { jsonIndent } from '../../constants';
import { issueExists } from './issueExists';
import { loadAssignees } from './loadAssignees';
import type { Issue } from './Issue';

const createQuery = `
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
`;

/**
 * Prints debug information.
 *
 * @param issue - The issue.
 * @example printDebugInfo(issue);
 */
function printDebugInfo(issue: Issue): void {
  debug(
    `Creating issue ${issue.title}: ${JSON.stringify(
      issue.json,
      null,
      jsonIndent,
    )}`,
  );
}

/**
 * Creates an issue for a release.
 *
 * @param globals - Global variables.
 * @returns The issue number.
 * @example await createIssue(globals);
 */
export async function createIssue(
  globals: Globals,
): Promise<{ created: boolean }> {
  if (globals.context.bump === VersionBump.none) {
    info('No release needed, skipping issue creation');
    return { created: false };
  }

  if (await issueExists(globals)) {
    info(`Issue already exists: ${globals.context.issue.title}`);
    return { created: false };
  }

  const { graphql, context } = globals;
  await globals.context.issue.update(globals);

  const { issue } = context;

  printDebugInfo(issue);

  try {
    const users = await loadAssignees(globals);
    await graphql(createQuery, {
      repositoryId: context.repo.id,
      labelId: context.repo.trackerLabelId,
      title: issue.title,
      content: issue.content,
      assignees: users,
    });

    return { created: true };
  } catch (createError: unknown) {
    logError(createError as Error);
    return { created: false };
  }
}
