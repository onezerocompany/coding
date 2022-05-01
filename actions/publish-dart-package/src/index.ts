import * as core from '@actions/core';
import { resolve } from 'path';
import { cwd } from 'process';
import { mkdirSync, writeFileSync, symlinkSync } from 'fs';
import { execSync } from 'child_process';

// load the credentials
const pubCredentials = core.getInput('pub_credentials');
if (pubCredentials?.length === 0) {
  core.setFailed('No pub credentials found');
  process.exit(1);
}

const workingDirectory = core.getInput('working_directory', {
  required: true,
});

const dryRun = core.getInput('dry_run', {
  required: true,
});

const isFlutter = core.getInput('flutter', {
  required: true,
});

async function run() {
  const directory = resolve(cwd(), workingDirectory);
  console.log('Running in directory:', directory);

  // apply the credentials
  const libraryFolder = resolve('~/Library/Application Support/dart');
  mkdirSync(libraryFolder, { recursive: true, mode: 0o700 });
  const pubspecFile = resolve(libraryFolder, 'pub-credentials.json');
  writeFileSync(pubspecFile, pubCredentials);
  symlinkSync(pubspecFile, resolve('~/.pub-cache/credentials.json'));

  // Publish the package
  execSync(
    `${isFlutter ? 'flutter' : 'dart'} pub publish${
      dryRun ? ' --dry-run' : ''
    }`,
    { cwd: directory },
  );
}

run();
