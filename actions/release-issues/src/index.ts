import { Action, Context } from './lib/Context';

const context = new Context();

async function run() {
  if (context.action === Action.create) {
    if (!(await context.issue.exists())) {
      await context.issue.create();
    }
  }
  if (context.action === Action.update) {
    // update based on changes to issue
  }
}
run();
