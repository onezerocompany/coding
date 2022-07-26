import type { Globals } from '../../globals';
import { Comment } from './Comment';

const query = `
  query loadComments($repo:String!, $owner:String!, $number:Int!) {
    repository(
      owner: $owner,
      name: $repo
    ) {
      issue(number:$number) {
        comments(last: 50) {
          nodes {
            id
            body
            author {
              login
            }
          }
        }
      }
    }
  }
`;

interface QueryComment {
  id: string;
  // eslint-disable-next-line id-denylist
  body: string;
  author: {
    login: string;
  };
}

interface QueryOutput {
  repository?: {
    issue?: {
      comments?: {
        nodes: QueryComment[];
      };
    };
  };
}

export async function loadComments(globals: Globals): Promise<Comment[]> {
  const { graphql, context } = globals;

  const { repository }: QueryOutput = await graphql(query, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    number: context.issue.number,
  });

  const comments = repository?.issue?.comments?.nodes ?? [];

  return comments.map(
    (comment): Comment =>
      new Comment({
        content: comment.body,
        user: comment.author.login,
      }),
  );
}
