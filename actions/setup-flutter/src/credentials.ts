/**
 * @file Function for setting up credentials to upload to pub.dev.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { homedir } from 'os';
import { mkdirSync, writeFileSync, symlinkSync } from 'fs';
import { info } from '@actions/core';

/**
 * Set up credentials to upload to pub.dev.
 *
 * @param credentials - The pub credentials to setup.
 * @example applyCredentials(pub_credentials);
 */
export function applyCredentials(credentials: string): void {
  if (credentials.length > 0) {
    info('Applying credentials...');

    const libraryFolder = resolve(
      `${homedir()}/Library/Application Support/dart`,
    );

    const pubCacheFolder = resolve(`${homedir()}/.pub-cache`);
    const pubspecFile = resolve(libraryFolder, 'pub-credentials.json');

    // Create folders
    mkdirSync(libraryFolder, { mode: 0o700, recursive: true });
    mkdirSync(pubCacheFolder, { mode: 0o700, recursive: true });

    // Write the credential files
    writeFileSync(pubspecFile, credentials);
    symlinkSync(
      pubspecFile,
      resolve(`${homedir()}/.pub-cache/credentials.json`),
    );

    info('Credentials applied.');
  }
}
