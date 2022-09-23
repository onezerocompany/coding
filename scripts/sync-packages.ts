#!/usr/bin/env ts-node

/**
 * @file Syncs the packages in the monorepo with the main package.json
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

const { execSync } = require('child_process');
var {
  writeFileSync,
  cpSync,
  statSync,
  existsSync,
  readdirSync,
} = require('fs');
var { resolve } = require('path');

var actionsDir = resolve(__dirname, '../actions');
var packagesDir = resolve(__dirname, '../packages');
var mainPackage = require(resolve(__dirname, '../package.json'));

// List of fields to sync accross packages
const fieldsToCopy = [
  'author',
  'license',
  'repository',
  'bugs',
  'homepage',
  'version',
];

const actions = readdirSync(actionsDir);
const packages = readdirSync(packagesDir);

for (const packageName of readdirSync(packagesDir)) {
  const packageDir = resolve(packagesDir, packageName);
  const packageJsonPath = resolve(packageDir, 'package.json');
  // skip if not a directory
  if (!statSync(packageDir).isDirectory()) continue;

  // update the license
  cpSync(resolve(__dirname, '../LICENSE'), resolve(packageDir, 'LICENSE'));

  // skip if package.json doesn't exist
  if (!existsSync(packageJsonPath)) continue;

  // read the package.json
  const packageJson = require(packageJsonPath);
  for (const field of fieldsToCopy) {
    packageJson[field] = mainPackage[field];
  }

  packageJson.repository.directory = `packages/${packageName}`;

  // update the package.json
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  // run prettier on the package.json
  execSync(`npx prettier --write package.json`, { cwd: packageDir });

  // update the license
  cpSync(resolve(__dirname, '../LICENSE'), resolve(packageDir, 'LICENSE'));

  // update the .prettierignore
  cpSync(
    resolve(__dirname, '../.prettierignore'),
    resolve(packageDir, '.prettierignore'),
  );
}

execSync('npm run sort-package-json', {
  cwd: resolve(__dirname, '..'),
});
