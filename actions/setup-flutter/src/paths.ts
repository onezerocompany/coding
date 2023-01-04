/**
 * @file Contains path constants.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { resolve } from 'path';
import { homedir } from 'os';
import { setOutput } from '@actions/core';

const sdkPath = resolve(homedir(), 'flutter');
const binPath = resolve(sdkPath, 'flutter', 'bin');
const flutterPath = resolve(binPath, 'flutter');
const pubCachePath = resolve(homedir(), '.pub-cache');
const podsRepoPath = resolve(homedir(), '.cocoapods', 'repos');
const podsCachePath = resolve(homedir(), 'Library', 'Caches', 'CocoaPods');

const cachePaths: string[] = [
  sdkPath,
  pubCachePath,
  podsCachePath,
  podsRepoPath,
];

// Export all
setOutput('sdk-path', sdkPath);
setOutput('bin-path', binPath);
setOutput('flutter-path', flutterPath);
setOutput('pub-cache-path', pubCachePath);
setOutput('pods-repo-path', podsRepoPath);
setOutput('pods-cache-path', podsCachePath);

export {
  sdkPath,
  binPath,
  flutterPath,
  pubCachePath,
  podsRepoPath,
  podsCachePath,
  cachePaths,
};
