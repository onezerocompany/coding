import { debug, info, setFailed } from '@actions/core';
import { Action, context } from './lib/context/Context';
import { createIssue } from './lib/issue/createIssue';
import { issueExists } from './lib/issue/issueExists';

debug(`Context: ${JSON.stringify(context, null, 2)}`);
async function run() {
  await context.load();
  if (context.action === Action.create) {
    if (!(await issueExists(context.issue))) {
      const { created } = await createIssue(context.issue);
      if (created) {
        info(`Created issue ${context.issue.title}`);
      } else {
        setFailed('Failed to create issue');
      }
    }
  }
  if (context.action === Action.update) {
    // update based on changes to issue
  }
}
run();
