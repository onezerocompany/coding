/**
 * @file Index file for the setup-flutter action.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { cwd } from 'process';
import { debug, getInput } from '@actions/core';
import { applyCredentials } from './credentials';
import { setup } from './setup';

// Inputs

const workingDirectory = getInput('working_directory');
const pubCredentials = getInput('pub_credentials');

/**
 * Main function that runs the action.
 *
 * @example run();
 */
async function run(): Promise<void> {
  const directory = resolve(cwd(), workingDirectory);
  debug(`Running in directory: ${directory}`);

  applyCredentials(pubCredentials);
  await setup({
    version: getInput('version'),
    channel: getInput('channel'),
  });
}

// eslint-disable-next-line no-void
void run();
