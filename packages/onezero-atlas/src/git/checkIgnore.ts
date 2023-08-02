import { spawn } from 'child_process';

export async function isPathIgnored({
  path,
  directory,
}: {
  path: string;
  directory: string;
}): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const git = spawn('git', ['check-ignore', path], {
      cwd: directory,
    });
    git.on('close', (code) => {
      if (code === 0) {
        resolve(true);
      } else if (code === 1) {
        resolve(false);
      } else {
        reject(new Error(`git check-ignore exited with code ${code}`));
      }
    });
  });
}
