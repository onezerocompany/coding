/**
 * @file Implementation of the loadCommits function.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { context as eventContext } from '@actions/github';
import { setFailed } from '@actions/core';
import type { PushEvent } from '@octokit/webhooks-definitions/schema';
import { parseMessage } from '@onezerocompany/commit';
import type { ProjectManifest } from '@onezerocompany/project-manager';
import type { Commit } from '../definitions/Commit';

/**
 * Get the last commit from the current event context.
 *
 * @returns The last commit.
 * @example const lastCommit = await loadCommits();
 */
export function lastCommit(): string {
  const { eventName } = eventContext;
  if (eventName === 'push') {
    const event = eventContext.payload as PushEvent;
    return event.after;
  }
  return '';
}

/**
 * Get the commits from the current event context.
 *
 * @param options - Options for the function.
 * @param options.projectManifest - Project manifest.
 * @returns The commits.
 * @example const commits = await loadCommits();
 */
export function loadCommits({
  projectManifest,
}: {
  projectManifest: ProjectManifest;
}): Commit[] {
  const { eventName } = eventContext;
  if (eventName === 'push') {
    const pushEvent = eventContext.payload as PushEvent;
    if (pushEvent.ref !== `refs/heads/${projectManifest.mainBranch}`) {
      setFailed(
        `Only pushes to the ${projectManifest.mainBranch} branch are supported`,
      );
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
