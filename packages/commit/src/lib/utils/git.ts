import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { dirname, resolve } from 'path';
import type { FileItem } from '../../cli/questions/files';

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

export function getGitFiles(): FileItem[] {
  const gitFolder = findGitRoot();
  // get the list of files
  const stagedFiles = execSync(`git diff --cached --name-only`, {
    cwd: gitFolder,
  })
    .toString()
    .split('\n');

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
}
