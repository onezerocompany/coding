/**
 * @file Utility function to setup a commit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

/* eslint-disable max-lines-per-function */
import { exec, spawn } from 'child_process';
import { createWriteStream, existsSync, rmSync } from 'fs';
import { Listr } from 'listr2';
import type { FileItem } from '../../cli/questions/files';
import { findGitRoot, getGitFiles } from './git';

/** Context in which the action runs. */
interface SetupContext {
  /** Root of the repository. */
  gitRoot: string;
  /** List of changed files. */
  files: FileItem[];
  /** Whether to skip the pre-commit hook run. */
  skipHooks: boolean;
}

const tasks = new Listr(
  [
    {
      title: 'Load git environment',
      /**
       * Task that finds the root of the git repository.
       *
       * @param ctx - Context in which the action runs.
       * @example
       *   const ctx = await tasks.run();
       */
      async task(ctx: SetupContext): Promise<void> {
        return new Promise((resolve) => {
          ctx.gitRoot = findGitRoot();
          resolve();
        });
      },
    },
    {
      title: 'Run pre-commit hook',
      /**
       * Indicates whether pre-commit hooks should be skipped or not.
       *
       * @param ctx - Context in which the action runs.
       * @returns Whether the hook should be skipped or not.
       * @example
       *   const ctx = await tasks.run();
       */
      skip: (ctx: SetupContext): boolean => ctx.skipHooks,
      /**
       * Task that runs the pre-commit hook.
       *
       * @param ctx - Context in which the action runs.
       * @param task - Task instance.
       * @returns Promise that resolves when the task is done.
       * @example
       *   const ctx = await tasks.run();
       */
      async task(ctx, task): Promise<void> {
        return new Promise((resolve, reject) => {
          const preCommitHook = `${ctx.gitRoot}/.husky/pre-commit`;
          if (existsSync(preCommitHook)) {
            // Start the pre-commit hook
            const hookProcess = spawn(preCommitHook, {
              cwd: ctx.gitRoot,
            });

            // Open temp file to capture all output
            const tempFile = `${ctx.gitRoot}/.pre-commit.log`;
            const outputStream = createWriteStream(tempFile);
            hookProcess.stderr.pipe(outputStream);
            hookProcess.stdout.pipe(outputStream);
            // Hook process should exit with code 0
            hookProcess.on('exit', (code) => {
              if (code === 0) {
                rmSync(tempFile);
                resolve();
              } else {
                // Open the temp file in the default editor
                exec(`code ${tempFile}`);
                reject(
                  new Error(
                    `pre-commit hook failed with code ${code ?? 'unknown'}`,
                  ),
                );
              }
            });
          } else {
            task.skip('No pre-commit hook defined, skipping...');
            resolve();
          }
        });
      },
    },
    {
      title: 'Load changed files from git',
      /**
       * Task that loads the list of changed files from git.
       *
       * @param ctx - Context in which the action runs.
       * @example
       *   const ctx = await tasks.run();
       */
      async task(ctx: SetupContext): Promise<void> {
        return new Promise((resolve) => {
          const files = getGitFiles(ctx.gitRoot);
          ctx.files = files;
          resolve();
        });
      },
    },
  ],
  {
    concurrent: false,
    renderer: 'default',
    rendererOptions: {
      showTimer: true,
    },
  },
);

/**
 * Setup a commit.
 *
 * @param options - Options to setup the commit.
 * @param options.skipHooks - Whether to skip the pre-commit hook run.
 * @example await setupCommit();
 */
async function setupCommit(options: {
  skipHooks: boolean;
}): Promise<SetupContext | null> {
  return new Promise<SetupContext | null>((resolve) => {
    tasks
      .run({
        skipHooks: options.skipHooks,
        gitRoot: findGitRoot(),
        files: [],
      })
      .then((ctx) => {
        resolve(ctx);
      })
      .catch(() => {
        resolve(null);
        process.exit(1);
      });
  });
}

export { setupCommit, SetupContext };
