/**
 * @file Contains functions that are used to check if a release exists.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { debug } from '@actions/core';
import type { Globals } from '../../globals';
import { jsonIndent } from '../../constants';
import type { Item } from '../items/Item';

const query = `
  query fetchVersion($owner:String!, $repo:String!, $tag:String!) {
    repository(owner: $owner, name:$repo) {
      release(tagName:$tag) {
        id
        name
        tagName
      }
    }
  }
`;

/** Output of the query. */
interface QueryOutput {
  /** Repository object from the query output. */
  repository?: {
    /** Release object from the query output. */
    release?: {
      /** Node ID that identifies the node in the GitHub API. */
      id: string;
      /** Name of the release. */
      name: string;
      /** Tag name of the release. */
      tagName: string;
    };
  };
}

/**
 * Checks if a release exists.
 *
 * @param globals - Global variables.
 * @param item - Item to check.
 * @returns Whether the release exists.
 * @example
 *   const releaseExists = await releaseExists(globals, item);
 */
export async function releaseExists(
  globals: Globals,
  item: Item,
): Promise<boolean> {
  const { track } = item.metadata;
  if (track) {
    const tag = globals.context.issue.version.displayString({
      track,
      includeRelease: false,
      includeTrack: true,
    });

    const { graphql, context } = globals;

    const result: QueryOutput = await graphql(query, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag,
    });
    debug(JSON.stringify(result, null, jsonIndent));

    const release = result.repository?.release;

    if (release) {
      const nameMatch = release.name === tag;
      const tagMatch = release.tagName === tag;
      const idCheck = release.id.length > 0;
      return nameMatch && tagMatch && idCheck;
    }
  }

  return false;
}
