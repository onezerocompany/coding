#!/usr/bin/env node

import { program } from 'commander';
import { tool as categories } from './cli/tools/categories';
import { tool as commit } from './cli/tools/create';
import { tool as parse } from './cli/tools/parse';
import { tool as validate } from './cli/tools/validate';

program
  .name('OneZero Commit')
  .description(
    "OneZero's tool for commiting, generating changelogs from git history and bumping version numbers.",
  );

// commit
program
  .command('create')
  .option('--skip-hooks', 'Skip pre-commit hooks')
  .description('Create a commit')
  .action(commit);

// parse
program
  .command('parse')
  .option('-m, --message <message>', 'Commit message')
  .option('-f, --file <file>', 'Commit message file')
  .option('-c, --commit <commit>', 'Commit sha or branch')
  .option('-j, --json', 'Output as JSON')
  .option('-y, --yaml', 'Output as YAML')
  .description('Parse a commit message')
  .action(parse);

// validate
program
  .command('validate')
  .option('-m, --message <message>', 'Commit message')
  .option('-f, --file <file>', 'Commit message file')
  .description('Validate a change')
  .action(validate);

// categories
program
  .command('categories')
  .option('-j, --json', 'Output as JSON')
  .option('-y, --yaml', 'Output as YAML')
  .option('-m, --markdown', 'Output as Markdown')
  .description('List all categories')
  .action(categories);

program.parse();
