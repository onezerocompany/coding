import { exit } from 'process';
import { info, setFailed } from '@actions/core';
import { Action } from './lib/context/Action';
import { createIssue } from './lib/issue/createIssue';
import { getGlobals } from './globals';
import { updateIssue } from './lib/issue/updateIssue';

async function run(): Promise<void> {
  const globals = await getGlobals();
  const { context } = globals;

  switch (context.action) {
    case Action.create: {
      const { created } = await createIssue(globals);
      if (created) {
        info(`Created issue: ${context.issue.title}`);
      } else {
        setFailed('Failed to create issue');
      }
      break;
    }
    case Action.update: {
      const { updated } = await updateIssue(globals);
      if (updated) {
        info(`Updated issue: ${context.issue.title}`);
      } else {
        setFailed('Failed to update issue');
      }
      break;
    }
    default:
      exit(1);
  }
}

// eslint-disable-next-line no-void
void run();
