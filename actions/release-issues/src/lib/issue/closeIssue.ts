import { error, info } from '@actions/core';
import type { Globals } from '../../globals';

const query = `
  mutation closeIssue($issueId: ID!, $reason: IssueClosedStateReason) {
    closeIssue(input: {
      issueId: $issueId, 
      reason: $reason
    }) {
      issue {
        id
      }
    }
  }
`;

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
    info(`Closed issue #${globals.context.issue.number}`);
    return { closed: true };
  } catch {
    error(`Failed to close issue #${globals.context.issue.number}`);
    return { closed: false };
  }
}
