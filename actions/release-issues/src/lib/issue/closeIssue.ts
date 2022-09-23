/**
 * @file Contains functions to close an issue.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { error as logError, info as logInfo } from '@actions/core';
import type { Globals } from '../../globals';

const query = `
  mutation closeIssue($issueId: ID!, $reason: IssueClosedStateReason) {
    closeIssue(input: {
      issueId: $issueId, 
      stateReason: $reason
    }) {
      issue {
        id
      }
    }
  }
`;

/**
 * Closes the issue, if possible.
 *
 * @param globals - Global variables.
 * @param issueId - The issue ID.
 * @example await closeIssue(globals, issueId);
 */
export async function closeIssue(
  globals: Globals,
  issueId: string,
): Promise<{ closed: boolean }> {
  const { graphql } = globals;
  try {
    await graphql(query, {
      issueId,
      reason: 'COMPLETED',
    });
    logInfo(`Closed issue #${globals.context.issue.number}`);
    return { closed: true };
  } catch (closeError: unknown) {
    logError(
      `Failed to close issue #${globals.context.issue.number}: ${
        closeError as string
      }`,
    );
    return { closed: false };
  }
}
