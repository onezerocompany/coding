import { resolve } from 'path';
import { homedir } from 'os';
import { mkdirSync, writeFileSync, symlinkSync } from 'fs';

export function applyCredentials(credentials: string): void {
  if (credentials.length > 0) {
    process.stdout.write('Applying credentials...');

    const libraryFolder = resolve(
      `${homedir()}/Library/Application Support/dart`,
    );
    const pubCacheFolder = resolve(`${homedir()}/.pub-cache`);
    const pubspecFile = resolve(libraryFolder, 'pub-credentials.json');

    // create folders
    mkdirSync(libraryFolder, { mode: 0o700, recursive: true });
    mkdirSync(pubCacheFolder, { mode: 0o700, recursive: true });

    // write the credential files
    writeFileSync(pubspecFile, credentials);
    symlinkSync(
      pubspecFile,
      resolve(`${homedir()}/.pub-cache/credentials.json`),
    );
  }
}
