#!/usr/bin/env node

'use strict';

const path = require('path');
const {
  existsSync,
  rmSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
} = require('fs');

// create the temp folder for the packages
const tempFolder = path.resolve(__dirname, '../dist');
if (existsSync(tempFolder)) {
  rmSync(tempFolder, { recursive: true });
  mkdirSync(tempFolder);
} else {
  mkdirSync(tempFolder);
}
// read the main package.json
const mainPackage = require(path.resolve(__dirname, '../package.json'));

// read the base files
const baseFiles = readdirSync(path.resolve(__dirname, '../bases'));
// loop over the base files
for (const baseFile of baseFiles) {
  // load the base file and details
  const name = baseFile.replace('.json', '');
  const contents = readFileSync(
    path.resolve(__dirname, '../bases', baseFile),
    'utf8',
  );
  const parsed = JSON.parse(contents);
  // create the package folder
  const packageFolder = path.resolve(tempFolder, baseFile.replace('.json', ''));
  mkdirSync(packageFolder);

  // write the package.json
  const pkg = require(path.resolve(
    __dirname,
    '../template/package.template.json',
  ));
  pkg.name = `@onezerocompany/tsconfig-${name}`;
  pkg.description = `Base TSConfig for working with ${parsed.display} in TypeScript at OneZero Company`;
  pkg.keywords = ['tsconfig', 'typescript', 'base', 'onezero', name];
  pkg.author = mainPackage.author;
  pkg.license = mainPackage.license;
  pkg.repository = mainPackage.repository;
  const indentAmount = 2;
  writeFileSync(
    path.resolve(packageFolder, 'package.json'),
    JSON.stringify(pkg, null, indentAmount),
  );

  // copy the license file
  copyFileSync(
    path.resolve(__dirname, '../LICENSE'),
    path.resolve(packageFolder, 'LICENSE'),
  );

  // generate the README
  const readmeTemplate = readFileSync(
    path.resolve(__dirname, '../template/README.template.md'),
    'utf8',
  );

  const readme = readmeTemplate
    .replaceAll('{{display}}', parsed.display)
    .replaceAll('{{filename}}', name)
    .replaceAll('{{file_content}}', contents);

  writeFileSync(path.resolve(packageFolder, 'README.md'), readme);
}
