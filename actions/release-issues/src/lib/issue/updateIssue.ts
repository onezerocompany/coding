import type { Globals } from '../../globals';
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

export async function updateIssue(
  globals: Globals,
): Promise<{ updated: boolean }> {
  const { graphql } = globals;

  await globals.context.issue.update(globals);
  const id = await issueIdentifier(globals);

  await graphql(query, {
    issueId: id ?? '',
    // eslint-disable-next-line id-denylist
    body: globals.context.issue.content,
  });

  return { updated: true };
}
