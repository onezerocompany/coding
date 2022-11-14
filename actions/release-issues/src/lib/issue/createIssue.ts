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
import { closeIssue } from './closeIssue';

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

/** Output of the creation query. */
interface CreateIssueResult {
  /** Query name 'createIssue'. */
  createIssue: {
    /** The created issue. */
    issue: {
      /** The ID of the issue. */
      id: string;
      /** The number of the issue. */
      number: number;
      /** The URL of the issue. */
      url: string;
    };
  };
}

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
 * Closes the issue if needed.
 *
 * @param globals - The global variables.
 * @param queryResponse - The response of the query.
 * @example closeIssueIfNeeded(globals, queryResponse);
 */
async function closeIfNeeded(
  globals: Globals,
  queryResponse: unknown,
): Promise<void> {
  if (typeof queryResponse === 'object') {
    const result = queryResponse as CreateIssueResult;
    const { id } = result.createIssue.issue;

    // If all items are done, close the issue
    if (globals.context.issue.allItemsDone) {
      await closeIssue(globals, id);
    }
  }
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
): Promise<{ created: boolean; failed: boolean }> {
  if (globals.context.bump === VersionBump.none) {
    info('No release needed, skipping issue creation');
    return { created: false, failed: false };
  }

  if (await issueExists(globals)) {
    info(`Issue already exists: ${globals.context.issue.title}`);
    return { created: false, failed: false };
  }

  const { graphql, context } = globals;
  await globals.context.issue.update(globals);

  const { issue } = context;

  printDebugInfo(issue);

  try {
    const users = await loadAssignees(globals);
    const queryResponse = await graphql(createQuery, {
      repositoryId: context.repo.id,
      labelId: context.repo.trackerLabelId,
      title: issue.title,
      content: issue.content,
      assignees: users,
    });
    await closeIfNeeded(globals, queryResponse);

    return { created: true, failed: false };
  } catch (createError: unknown) {
    logError(createError as Error);
    return { created: false, failed: true };
  }
}
