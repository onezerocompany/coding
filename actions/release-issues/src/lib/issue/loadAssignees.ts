import type { Globals } from '../../globals';

const query = `
query loadUser($user:String!) {
  user(login:$user) {
    id
  }
}
`;

interface QueryOutput {
  user?: {
    id: string;
  };
}

export async function loadAssignees(globals: Globals): Promise<string[]> {
  const { graphql, settings } = globals;

  const ids = await Promise.all(
    settings.assignees.map(async (assignee) => {
      const { user }: QueryOutput = await graphql(query, {
        user: assignee,
      });
      return user?.id;
    }),
  );

  return ids.filter((id) => id) as string[];
}
