import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { dirname, resolve } from 'path';
import type { FileItem } from '../../cli/questions/files';

/*
 * fetches a list of staged files from the git repository.
 * gracefully handles the case where the git repository is not initialized.
 * @param gitRoot the root of the git repository
 * @returns an array of file names
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

/*
 * find the root of the current git repository
 * @returns the root of the git repository
 */
export function findGitRoot(): string {
  // find the git folder by walking up the directory tree
  let dir = __dirname;
  while (dir !== '/') {
    const gitFolder = resolve(dir, '.git');
    if (existsSync(gitFolder) && statSync(gitFolder).isDirectory()) {
      return gitFolder.replace('/.git', '');
    }
    dir = dirname(dir);
  }
  return dir.replace('/.git', '');
}

/*
 * fetches a list of all changed files from the git repository.
 * gracefully handles the case where the git repository is not initialized.
 * @returns an array of file names
 */
export function getGitFiles(gitFolder: string): FileItem[] {
  const stagedFiles = getStagedFiles(gitFolder);

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
        const selected = files.some((file) => stagedFiles.includes(file));
        return files.map((file) => ({
          title: file,
          value: files,
          selected,
        }));
      });
  } catch {
    return [];
  }
}
