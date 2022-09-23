/**
 * @file The main entry point for the release-issues action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { exit } from 'process';
import { info, setFailed } from '@actions/core';
import { Action } from './lib/definitions/Action';
import { createIssue } from './lib/issue/createIssue';
import { getGlobals } from './globals';
import { updateIssue } from './lib/issue/updateIssue';

/**
 * The main function of the action. It is the root of the action's execution.
 *
 * @async
 * @example await run();
 */
async function run(): Promise<void> {
  const globals = await getGlobals();
  const { context } = globals;

  switch (context.action) {
    /** Create a new issue. */
    case Action.create: {
      const { created } = await createIssue(globals);
      if (created) {
        info(`Created issue: ${context.issue.title}`);
      } else {
        setFailed('Failed to create issue');
      }
      break;
    }
    /** Update an existing issue. */
    case Action.update: {
      const { updated } = await updateIssue(globals);
      if (updated) {
        info(`Updated issue: ${context.issue.title}`);
      } else {
        setFailed('Failed to update issue');
      }
      break;
    }
    /** Any other, exit with an error. */
    default:
      exit(1);
  }
}

// eslint-disable-next-line no-void
void run();
