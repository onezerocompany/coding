/* eslint-disable max-lines-per-function */
import { exec, spawn } from 'child_process';
import { createWriteStream, existsSync, rmSync } from 'fs';
import { Listr } from 'listr2';
import type { FileItem } from '../../cli/questions/files';
import { findGitRoot, getGitFiles } from './git';

interface SetupContext {
  gitRoot: string;
  files: FileItem[];
  skipHooks: boolean;
}

const tasks = new Listr(
  [
    {
      title: 'Load git environment',
      async task(ctx: SetupContext): Promise<void> {
        return new Promise((resolve) => {
          ctx.gitRoot = findGitRoot();
          resolve();
        });
      },
    },
    {
      title: 'Run pre-commit hook',
      skip: (ctx: SetupContext): boolean => ctx.skipHooks,
      async task(ctx, task): Promise<void> {
        return new Promise((resolve, reject) => {
          const preCommitHook = `${ctx.gitRoot}/.husky/pre-commit`;
          if (existsSync(preCommitHook)) {
            // start the pre-commit hook
            const hookProcess = spawn(preCommitHook, {
              cwd: ctx.gitRoot,
            });
            // open temp file to capture all output
            const tempFile = `${ctx.gitRoot}/.pre-commit.log`;
            const outputStream = createWriteStream(tempFile);
            hookProcess.stderr.pipe(outputStream);
            hookProcess.stdout.pipe(outputStream);
            // hook process should exit with code 0
            hookProcess.on('close', (code) => {
              if (code === 0) {
                rmSync(tempFile);
                resolve();
              } else {
                // open the temp file in the default editor
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

async function setupCommit(options: {
  skipHooks: boolean;
}): Promise<SetupContext | null> {
  return new Promise<SetupContext | null>((resolve) => {
    tasks
      .run({
        skipHooks: options.skipHooks,
        gitRoot: process.cwd(),
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
