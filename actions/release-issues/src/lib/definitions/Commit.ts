import type { CommitMessage } from '@onezerocompany/commit';

export interface Commit {
  sha: string;
  message: CommitMessage;
}
