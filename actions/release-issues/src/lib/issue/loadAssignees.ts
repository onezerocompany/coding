/**
 * @file Contains functions for loading the ids of the assignees attached to a release issue.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import type { Globals } from '../../globals';

const query = `
query loadUser($user:String!) {
  user(login:$user) {
    id
  }
}
`;

/** Output of the loadUser query. */
interface QueryOutput {
  /** The user object containing the id. */
  user?: {
    /** The id of the user. */
    id: string;
  };
}

/**
 * Loads a list of user ids from a list of usernames.
 *
 * @param globals - The global variables for this action.
 * @returns The list of user ids.
 * @example
 *   const ids = await loadAssignees(globals);
 */
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
