import { existsSync } from 'fs';
import { join } from 'path';
import { RepositoryConfig } from '@onezerocompany/config';
import { findGitRoot } from '../../git/findGitRoot';

export interface LoadConfigOutput {
  gitRoot: string | null;
  configFilePath: string | null;
  config: RepositoryConfig | null;
}

export async function load(): Promise<LoadConfigOutput> {
  const gitRoot = await findGitRoot();

  if (!gitRoot) {
    return { gitRoot: null, configFilePath: null, config: null };
  }

  const projectFilePaths = [
    join(gitRoot, 'project.ts'),
    join(gitRoot, 'project-manifest.ts'),
    join(gitRoot, 'project', 'project.ts'),
    join(gitRoot, 'project', 'project-manifest.ts'),
    join(gitRoot, '.project', 'project.ts'),
    join(gitRoot, '.project', 'manifest.ts'),
  ];

  for (const filePath of projectFilePaths) {
    if (existsSync(filePath)) {
      const config = require(filePath).default as RepositoryConfig;
      return { gitRoot, configFilePath: filePath, config };
    }
  }

  return { gitRoot, configFilePath: null, config: null };
}
