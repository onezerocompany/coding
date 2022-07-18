import { info, setFailed } from '@actions/core';
import { Action } from './lib/context/Action';
import { createIssue } from './lib/issue/createIssue';
import { issueExists } from './lib/issue/issueExists';
import { getGlobals } from './globals';

async function run(): Promise<void> {
  const globals = await getGlobals();
  const { context } = globals;

  switch (context.action) {
    case Action.create:
      if (!(await issueExists(globals))) {
        const { created } = await createIssue(globals);
        if (created) {
          info(`Created issue ${globals.context.issue.title}`);
        } else {
          setFailed('Failed to create issue');
        }
      }
      break;
    default:
      setFailed('Unsupported action');
  }
}

// eslint-disable-next-line no-void
void run();
