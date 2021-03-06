import { context as eventContext } from '@actions/github';
import { setFailed } from '@actions/core';
import type { PushEvent } from '@octokit/webhooks-definitions/schema';
import { parseMessage } from '@onezerocompany/commit';
import type { Commit } from '../definitions/Commit';

export function lastCommit(): string {
  const { eventName } = eventContext;
  if (eventName === 'push') {
    const event = eventContext.payload as PushEvent;
    return event.after;
  }
  return '';
}

export function loadCommits(): Commit[] {
  const { eventName } = eventContext;
  if (eventName === 'push') {
    const pushEvent = eventContext.payload as PushEvent;
    if (pushEvent.ref !== 'refs/heads/main') {
      setFailed('Only pushes to the main branch are supported');
      return [];
    }
    return pushEvent.commits.map((commit) => ({
      sha: commit.id,
      message: parseMessage(commit.message),
    }));
  }

  setFailed('Unsupported event');
  return [];
}
