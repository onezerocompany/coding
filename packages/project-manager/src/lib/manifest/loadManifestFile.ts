/**
 * @file Contains a function that loads a manifest file.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { cwd } from 'process';
import { parse as parseYaml } from 'yaml';
import { ProjectManifest } from './ProjectManifest';

/**
 * Finds the path to the manifest file.
 *
 * @param path - Path to start searching from.
 * @returns The path to the manifest file.
 * @example findPathToManifestFile();
 */
function findPathToManifestFile(path: string): string | null {
  const manifestFileNames = [
    'project-manifest.json',
    'project-manifest.yaml',
    'project-manifest.yml',
  ];

  let foundPath = null;

  for (const manifestFileName of manifestFileNames) {
    const filePath = join(path, manifestFileName);
    if (existsSync(filePath)) foundPath = filePath;
  }

  if (foundPath === null && path !== '/') {
    return findPathToManifestFile(resolve(path, '..'));
  }
  return foundPath;
}

/**
 * Loads the manifest file from the repository.
 *
 * @returns The manifest file.
 * @example loadProjectManifest();
 */
export function loadManifestFromProject(): ProjectManifest {
  const path = findPathToManifestFile(cwd());
  if (path !== null) {
    const content = readFileSync(path, 'utf-8');
    if (path.endsWith('.json')) {
      return new ProjectManifest(JSON.parse(content));
    }
    if (path.endsWith('.yaml') || path.endsWith('.yml')) {
      return new ProjectManifest(parseYaml(content));
    }
  }
  return new ProjectManifest();
}
