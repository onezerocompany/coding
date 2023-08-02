import { existsSync } from 'fs';
import { join, resolve } from 'path';

export async function findGitRoot(): Promise<string | null> {
  let currentDir = process.cwd();

  while (currentDir !== '/') {
    const gitDir = join(currentDir, '.git');
    // If the .git directory exists, we've found the root
    if (existsSync(gitDir)) {
      // resolve to get the absolute path
      return resolve(currentDir);
    } else {
      // Otherwise, move up a directory and try again
      currentDir = resolve(currentDir, '..');
    }
  }

  // If we reach the root directory, return the current working directory instead
  return process.cwd();
}
