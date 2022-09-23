/**
 * @file Contains functions for loading issue identifiers.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

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

/** Output of the issueIdentifier query. */
interface QueryOutput {
  /** The repository object containing the issue object. */
  repository?: {
    /** The issue object containing the id. */
    issue?: {
      /** The id of the issue. */
      id: string;
    };
  };
}

/**
 * Loads the id of the issue found in the globals.
 *
 * @param globals - The global variables for this action.
 * @returns The id of the issue.
 * @example const id = await loadIssueIdentifier(globals);
 */
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
