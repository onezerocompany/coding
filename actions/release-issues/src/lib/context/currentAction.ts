import { context as eventContext } from '@actions/github';
import { setFailed } from '@actions/core';
import type { PushEvent } from '@octokit/webhooks-definitions/schema';
import { Action } from './Action';

export function currentAction(): Action {
  const { eventName } = eventContext;
  if (eventName === 'push') {
    const pushEvent = eventContext.payload as PushEvent;
    if (pushEvent.ref !== 'refs/heads/main') {
      setFailed('Only pushes to the main branch are supported');
      return Action.stop;
    }
    return Action.create;
  }

  if (eventName === 'issue_comment') {
    // only trigger if the comment is clearing a version for release
    return Action.comment;
  }

  setFailed(new Error('Unsupported event'));
  return Action.stop;
}
