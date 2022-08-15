import { debug } from '@actions/core';
import type { Globals } from '../../globals';
import { jsonIndent } from '../../defaults';
import type { Item } from '../items/Item';

const query = `
  query fetchVersion($owner:String!, $repo:String!, $tag:String!) {
    repository(owner: $owner, name:$repo) {
      release(tagName:$tag) {
        id
        name
      }
    }
  }
`;

interface QueryOutput {
  repository?: {
    release?: {
      id: string;
      name: string;
    };
  };
}

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
  }

  return false;
}
