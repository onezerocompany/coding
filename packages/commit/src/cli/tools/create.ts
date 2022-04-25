/* eslint-disable import/max-dependencies */
import { exec, execSync } from 'child_process';
import { rmSync, writeFileSync } from 'fs';
import { resolve as resolvePath } from 'path';
import prompts from 'prompts';
import { Listr } from 'listr2';
import { CommitMessage } from '../../lib/message/CommitMessage';
// questions
import { bodyQuestion } from '../questions/addBody';
import { breakingQuestion } from '../questions/breaking';
import { categoryQuestion } from '../questions/category';
import { confirmQuestion } from '../questions/confirm';
import { filesQuestion } from '../questions/files';
import { issuesQuestion } from '../questions/issues';
import { bodyEditor } from '../questions/bodyEditor';
import { scopeQuestion } from '../questions/scope';
import { authorsQuestion } from '../questions/authors';
import { subjectQuestion } from '../questions/subject';
import { setupCommit } from '../../lib/utils/setupCommit';

// eslint-disable-next-line max-lines-per-function
async function createCommit(
  commitMessage: CommitMessage,
  gitRoot: string,
): Promise<void> {
  await new Listr([
    {
      title: 'Reset git',
      async task(): Promise<void> {
        return new Promise((resolve) => {
          const resetProcess = exec('git reset', { cwd: gitRoot });
          resetProcess.on('exit', (code) => {
            if (code === 0) {
              resolve();
            } else {
              throw new Error(`Failed to reset git environment`);
            }
          });
        });
      },
    },
    {
      title: 'Add files to commit',
      async task(): Promise<void> {
        return new Promise((resolve, reject) => {
          let failed = false;
          for (const file of commitMessage.files) {
            try {
              execSync(`git add ${file}`, { cwd: gitRoot });
            } catch {
              failed = true;
            }
          }
          if (failed) {
            reject(new Error('Failed to add file'));
          } else {
            resolve();
          }
        });
      },
    },
    {
      title: 'Create commit',
      async task(): Promise<void> {
        return new Promise((resolve, reject) => {
          // write the message to file
          const messageFile = resolvePath(gitRoot, '.commit-message');
          writeFileSync(messageFile, commitMessage.message);
          // create the commit
          const command = `git commit -s -F ${messageFile}`;
          const commitProcess = exec(command, { cwd: gitRoot });
          // create process should exit with code 0
          commitProcess.on('exit', (code) => {
            rmSync(messageFile);
            if (code === 0) {
              resolve();
            } else {
              reject(new Error(`Commit failed`));
            }
          });
        });
      },
    },
  ]).run();
}

// eslint-disable-next-line max-lines-per-function
export async function tool(options: { skipHooks: boolean }): Promise<void> {
  // run pre-commit hook if it exists
  const context = await setupCommit({ ...options });

  // add padding between setup and inputs
  process.stdout.write('\n');

  const results = await prompts(
    [
      filesQuestion(context?.files ?? []),
      categoryQuestion,
      scopeQuestion,
      subjectQuestion,
      breakingQuestion,
      bodyQuestion,
      bodyEditor,
      issuesQuestion,
      authorsQuestion,
      confirmQuestion,
    ],
    {
      onSubmit(question, _, answers): boolean {
        if (question.name === 'authors') {
          const commitMessage = new CommitMessage({
            ...(answers as unknown as Record<string, unknown>),
          });
          process.stdout.write(`\n${commitMessage.displayString}\n\n`);
        }
        return false;
      },
    },
  );

  if (results['commit'] === true) {
    const commitMessage = new CommitMessage({ ...results });
    // add padding line
    process.stdout.write('\n');
    await createCommit(commitMessage, context?.gitRoot ?? process.cwd());
    process.stdout.write('\n🎉 commit was created\n');
  } else {
    process.stdout.write('\n🚫 commit was cancelled\n');
  }
}
