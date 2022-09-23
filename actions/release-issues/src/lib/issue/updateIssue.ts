/**
 * @file Contains functions for updating a release issue.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { Globals } from '../../globals';
import { closeIssue } from './closeIssue';
import { issueIdentifier } from './issueIdentifier';

const query = `
mutation updateIssue($issueId: ID!, $body:String!) {
  updateIssue(input: {id: $issueId, body:$body}) {
		issue {
      id
    }
  }
}
`;

/**
 * Updates the release issue.
 *
 * @param globals - The global variables for this action.
 * @returns Whether the issue was updated.
 * @example
 *   const { updated } = await updateIssue(globals);
 */
export async function updateIssue(
  globals: Globals,
): Promise<{ updated: boolean }> {
  const { graphql } = globals;
  const id = (await issueIdentifier(globals)) ?? null;
  if (id === null) return { updated: false };

  // Refresh all item states
  await globals.context.issue.update(globals);

  // Update the content of the issue
  await graphql(query, {
    issueId: id,
    // eslint-disable-next-line id-denylist
    body: globals.context.issue.content,
  });

  // If all items are done, close the issue
  if (globals.context.issue.allItemsDone) {
    await closeIssue(globals, id);
  }

  return { updated: true };
}
