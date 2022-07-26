import type { Globals } from '../../globals';

const query = `
  query issueIdentifier($owner:String!, $repo:String!, $issue:Int!) {
    repository(owner:$owner, name:$repo) {
      issue(number:$issue) {
        id
      }
    }
  }
`;

interface QueryOutput {
  repository?: {
    issue?: {
      id: string;
    };
  };
}

export async function issueIdentifier(
  globals: Globals,
): Promise<string | undefined> {
  const { graphql } = globals;
  const { repository }: QueryOutput = await graphql(query, {
    owner: globals.context.repo.owner,
    repo: globals.context.repo.repo,
    issue: globals.context.issue.number,
  });

  return repository?.issue?.id;
}
