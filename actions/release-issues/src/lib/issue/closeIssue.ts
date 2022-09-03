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
    return { closed: true };
  } catch {
    return { closed: false };
  }
}
