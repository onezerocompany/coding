#!/usr/bin/env node
/*

  This script is used to sync the packages.json file with the
  main packages.json file in the root of the project.

  It keeps the author, license, repository, version, bugs and homepage fields in sync

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

var packagesDir = resolve(__dirname, '../packages');
var mainPackage = require(resolve(__dirname, '../package.json'));

const fieldsToCopy = [
  'author',
  'license',
  'repository',
  'bugs',
  'homepage',
  'version',
];
for (const package of readdirSync(packagesDir)) {
  const packageDir = resolve(packagesDir, package);
  const packageJsonPath = resolve(packageDir, 'package.json');
  // skip if not a directory
  if (!statSync(packageDir).isDirectory()) continue;
  // skip if package.json doesn't exist
  if (!existsSync(packageJsonPath)) continue;

  const packageJson = require(packageJsonPath);
  for (const field of fieldsToCopy) {
    packageJson[field] = mainPackage[field];
  }

  packageJson.repository.directory = `packages/${package}`;

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
