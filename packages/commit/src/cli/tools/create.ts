/**
 * @file Commit creation CLI command functions.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/* eslint-disable import/max-dependencies */
import type { ChildProcessWithoutNullStreams } from 'child_process';
import { exec, execSync, spawn } from 'child_process';
import { createWriteStream, rmSync, writeFileSync } from 'fs';
import { resolve as resolvePath } from 'path';
import { stderr } from 'process';
import type { ListrTask } from 'listr2';
import { Listr } from 'listr2';
import type { PromptObject } from 'prompts';
import prompts from 'prompts';
import { CommitMessage } from '../../lib/message/CommitMessage';
// Questions
import { bodyQuestion } from '../questions/body';
import { breakingQuestion } from '../questions/breaking';
import { categoryQuestion } from '../questions/category';
import { confirmQuestion } from '../questions/confirm';
import { filesQuestion } from '../questions/files';
import { issuesQuestion } from '../questions/issues';
import { scopeQuestion } from '../questions/scope';
import { authorsQuestion } from '../questions/authors';
import { subjectQuestion } from '../questions/subject';
import type { SetupContext } from '../../lib/utils/setupCommit';
import { setupCommit } from '../../lib/utils/setupCommit';
import { validateMessage } from '../../lib/message/validateMessage';

/**
 * Task to reset any stashed changes.
 *
 * @param gitRoot - The root of the git repository.
 * @returns Task for resetting git.
 * @example resetGitTask('/path/to/repo');
 */
function resetGitTask(gitRoot: string): ListrTask {
  return {
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
  };
}

/**
 * Task to add files to the commit.
 *
 * @param commitMessage - The commit message to use.
 * @param gitRoot - The root of the git repository.
 * @returns Task for adding files.
 * @example addFilesTask('feat: add new feature', '/path/to/repo');
 */
function addFilesTask(
  commitMessage: CommitMessage,
  gitRoot: string,
): ListrTask {
  return {
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
  };
}

/**
 * Task for validating the commit message.
 *
 * @param commitMessage - The commit message to validate.
 * @returns Task for validating the commit message.
 * @example
 *   validateMessageTask('feat: add new feature');
 */
function validateCommitTask(commitMessage: CommitMessage): ListrTask {
  return {
    title: 'Verify commit message',
    async task(): Promise<void> {
      return new Promise((resolve, reject) => {
        const validation = validateMessage({
          message: commitMessage.message,
        });
        if (validation.valid) {
          resolve();
        } else {
          for (const validationError of validation.errors) {
            stderr.write(validationError.displayString);
          }
          reject(new Error('Failed to validate commit message'));
        }
      });
    },
  };
}

/**
 * Setup a logging file for the commit process.
 *
 * @param folder - The folder to create the log file in.
 * @param childProcess - The child process to log.
 * @returns File path for the log file.
 * @example
 *   const file = setupLogFile('/path/to/repo', childProcess);
 */
function setupCreateCommitFile(
  folder: string,
  childProcess: ChildProcessWithoutNullStreams,
): string {
  // Open temp file to capture all output
  const tempFile = `${folder}/.create-commit.log`;
  const outputStream = createWriteStream(tempFile);
  childProcess.stderr.pipe(outputStream);
  childProcess.stdout.pipe(outputStream);
  return tempFile;
}

/**
 * Task for creating the commit.
 *
 * @param gitRoot - The root of the git repository.
 * @param commitMessage - The commit message to use.
 * @returns Task for creating the commit.
 * @example
 *   createCommitTask('feat: add new feature', '/path/to/repo');
 */
function createCommitTask(
  gitRoot: string,
  commitMessage: CommitMessage,
): ListrTask {
  return {
    title: 'Create commit',
    async task(): Promise<void> {
      return new Promise((resolve, reject) => {
        // Write the message to file
        const messageFile = resolvePath(gitRoot, '.commit-message');
        writeFileSync(messageFile, commitMessage.message);
        // Create the commit
        const commitProcess = spawn(
          'git',
          ['commit', '--no-verify', '--signoff', '-F', messageFile],
          { cwd: gitRoot },
        );
        const tempFile = setupCreateCommitFile(gitRoot, commitProcess);
        // Create process should exit with code 0
        commitProcess.on('exit', (code) => {
          rmSync(messageFile);
          if (code === 0) {
            rmSync(tempFile);
            resolve();
          } else {
            // Open the temp file in the default editor
            exec(`code ${tempFile}`);
            reject(new Error('Failed to create commit'));
          }
        });
      });
    },
  };
}

/**
 * CLI command for creating a new commit.
 *
 * @param commitMessage - The commit message to use.
 * @param gitRoot - The root of the git repository.
 * @example createCommit('feat: add new feature', '/path/to/repo');
 */
async function createCommit(
  commitMessage: CommitMessage,
  gitRoot: string,
): Promise<void> {
  await new Listr([
    resetGitTask(gitRoot),
    addFilesTask(commitMessage, gitRoot),
    validateCommitTask(commitMessage),
    createCommitTask(gitRoot, commitMessage),
  ]).run();
}

/**
 * List of prompts for creating a new commit.
 *
 * @param context - The context for the prompts.
 * @returns List of prompts.
 * @example
 *   const prompts = listOfPrompts({ commitType: 'feat' });
 */
function listOfPrompts(context: SetupContext | null): PromptObject[] {
  return [
    filesQuestion(context?.files ?? []),
    categoryQuestion,
    scopeQuestion,
    subjectQuestion,
    breakingQuestion,
    bodyQuestion,
    issuesQuestion,
    authorsQuestion,
    confirmQuestion,
  ];
}

/**
 * CLI command for creating a new commit.
 *
 * @param options - Options for the command.
 * @param options.skipHooks - Whether to skip git hooks.
 * @example
 *   createCommitCommand({
 *     skipHooks: true,
 *   });
 */
export async function tool(options: { skipHooks: boolean }): Promise<void> {
  // Run pre-commit hook if it exists
  const context = await setupCommit({ ...options });

  // Add padding between setup and inputs
  process.stdout.write('\n');

  const promptList = listOfPrompts(context);
  const results = await prompts(promptList, {
    onSubmit(question, _, answers): boolean {
      if (question.name === 'authors') {
        const commitMessage = new CommitMessage({
          ...(answers as unknown as Record<string, unknown>),
        });
        process.stdout.write(`\n${commitMessage.displayString}\n\n`);
      }
      return false;
    },
  });

  if (results['commit'] === true) {
    const commitMessage = new CommitMessage({ ...results });
    // Add padding line
    process.stdout.write('\n');
    try {
      await createCommit(commitMessage, context?.gitRoot ?? process.cwd());
    } catch (createError: unknown) {
      process.stderr.write((createError as Error).message);
      process.exit(1);
    }
    process.stdout.write('\n🎉 commit was created\n');
  } else {
    process.stdout.write('\n🚫 commit was cancelled\n');
  }
}
