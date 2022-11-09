/**
 * @file Git related utilities.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { dirname, resolve } from 'path';
import type { FileItem } from '../../cli/questions/files';

/**
 * Fetches a list of staged files from the git repository. Gracefully handles the case where the git repository is not initialized.
 *
 * @param gitRoot - The root of the git repository.
 * @returns An array of file names.
 * @example
 * getStagedFiles('~/project');
 */
function getStagedFiles(gitRoot: string): string[] {
  try {
    return execSync('git diff --cached --name-only', { cwd: gitRoot })
      .toString()
      .split('\n');
  } catch {
    return [];
  }
}

/**
 * Find the root of the current git repository, moving up the directory tree until a .git directory is found.
 *
 * @returns The path to the root of the git repository.
 * @example findGitRoot();
 */
export function findGitRoot(): string {
  // Find the git folder by walking up the directory tree

  let dir = process.cwd();
  while (dir !== '/') {
    const gitFolder = resolve(dir, '.git');
    if (existsSync(gitFolder) && statSync(gitFolder).isDirectory()) {
      return gitFolder.replace('/.git', '');
    }
    dir = dirname(dir);
  }
  return dir.replace('/.git', '');
}

/**
 * Fetches a list of all changed files from the git repository.
 * Gracefully handles the case where the git repository is not initialized.
 *
 * @param gitFolder - The root of the git repository.
 * @returns An array of file names.
 * @throws When the git repository is not initialized.
 * @example getChangedFiles('example/project');
 */
export function getGitFiles(gitFolder: string): FileItem[] {
  const stagedFiles = getStagedFiles(gitFolder);
  const noStagedFiles = stagedFiles.length === 0 || stagedFiles[0] === '';

  try {
    const output = execSync('git status -s --untracked-files=all --porcelain', {
      cwd: gitFolder,
    }).toString();

    const charactersToTrim = 3;
    return output
      .split('\n')
      .filter((line) => line.length > 0)
      .flatMap((line) => {
        const files = line
          .substring(charactersToTrim)
          .split('->')
          .map((file) => file.trim());

        /*
         * Mark the file as selected if it is staged
         * or if there are no staged files select all files
         */
        const selected = noStagedFiles
          ? true
          : files.some((file) => stagedFiles.includes(file));
        return files.map((file) => ({
          title: file,
          value: files,
          selected,
        }));
      });
  } catch {
    throw new Error(`Could not fetch git files from: ${gitFolder}`);
  }
}
