import { RepositoryConfig } from '@onezerocompany/config';
import { findGitRoot } from '../../git/findGitRoot';
import { readdir, stat, readFile } from 'fs/promises';
import { isPathIgnored } from '../../git/checkIgnore';
import { createHash } from 'crypto';
import { FileGraphEntry } from './FileGraphEntry';
import { FileGraphEntryType } from './FileGraphEntryType';

// returns a list of all files at a given path
// recursively searches through all subdirectories
// and ignores all git ignored files
async function graphEntriesFor({
  path,
}: {
  path: string;
}): Promise<FileGraphEntry[]> {
  const files = await readdir(path);
  const entries: FileGraphEntry[] = [];
  for (const file of files) {
    const ignored =
      (await isPathIgnored({
        path: file,
        directory: path,
      })) || file === '.git';

    if (ignored) continue;

    try {
      const stats = await stat(`${path}/${file}`);
      const is_directory = stats.isDirectory();

      const entry = new FileGraphEntry({
        path: file,
        type: is_directory
          ? FileGraphEntryType.directory
          : FileGraphEntryType.file,
      });

      if (is_directory) {
        entry.children = await graphEntriesFor({
          path: `${path}/${file}`,
        });
        // hash the children hashes
        entry.hash = createHash('sha256')
          .update(entry.children.map((c) => c.hash).join(''))
          .digest('hex');
      } else {
        entry.content = await readFile(`${path}/${file}`);
        entry.hash = createHash('sha256').update(entry.content).digest('hex');
      }

      entries.push(entry);
    } catch (e) {
      // ignore
    }
  }

  return entries;
}

export async function createFileGraph({
  config,
}: {
  config: RepositoryConfig;
}): Promise<FileGraphEntry> {
  const root = await findGitRoot();
  if (!root) throw new Error('Could not find git root');
  const entries = await graphEntriesFor({ path: root });

  return new FileGraphEntry({
    path: root,
    type: FileGraphEntryType.directory,
    children: entries,
    hash: createHash('sha256')
      .update(entries.map((e) => e.hash).join(''))
      .digest('hex'),
    counters: {
      files: entries.filter((e) => e.type === FileGraphEntryType.file).length,
      directories: entries.filter(
        (e) => e.type === FileGraphEntryType.directory,
      ).length,
    },
  });
}
