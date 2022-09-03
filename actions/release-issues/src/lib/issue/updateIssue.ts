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

export async function updateIssue(
  globals: Globals,
): Promise<{ updated: boolean }> {
  const { graphql } = globals;
  const id = (await issueIdentifier(globals)) ?? null;
  if (id === null) return { updated: false };

  // refresh all item states
  await globals.context.issue.update(globals);

  // update the content of the issue
  await graphql(query, {
    issueId: id,
    // eslint-disable-next-line id-denylist
    body: globals.context.issue.content,
  });

  // if all items are done, close the issue
  await closeIssue(globals, id);

  return { updated: true };
}
