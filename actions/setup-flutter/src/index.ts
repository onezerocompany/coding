import * as core from '@actions/core';
import { resolve } from 'path';
import { cwd } from 'process';
import { applyCredentials } from './credentials';
import { setup } from './setup';

// inputs
const workingDirectory = core.getInput('working_directory') ?? '.';
const pubCredentials = core.getInput('pub_credentials');

async function run() {
  const directory = resolve(cwd(), workingDirectory);
  console.log('Running in directory:', directory);

  applyCredentials(pubCredentials);
  await setup({
    version: core.getInput('version'),
    channel: core.getInput('channel'),
  });
}

run();
