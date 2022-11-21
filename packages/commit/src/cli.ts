#!/usr/bin/env node

/**
 * @file CLI entry point for the commit package.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { program } from 'commander';
import { tool as categories } from './cli/tools/categories';
import { tool as commit } from './cli/tools/create';
import { tool as parse } from './cli/tools/parse';
import { tool as validate } from './cli/tools/validate';
import { tool as commitsBetween } from './cli/tools/commitsBetween';
import { tool as changelog } from './cli/tools/changelog';

program
  .name('OneZero Commit')
  .description(
    "OneZero's tool for commiting, generating changelogs from git history and bumping version numbers.",
  );

/** Commit creation tool. */
program
  .command('create')
  .option('--skip-hooks', 'Skip pre-commit hooks')
  .description('Create a commit')
  .action(commit);

/** Commit message parser tool. */
program
  .command('parse')
  .option('-m, --message <message>', 'Commit message')
  .option('-f, --file <file>', 'Commit message file')
  .option('-c, --commit <commit>', 'Commit sha or branch')
  .option('-j, --json', 'Output as JSON')
  .option('-y, --yaml', 'Output as YAML')
  .description('Parse a commit message')
  .action(parse);

// Validate
program
  .command('validate')
  .option('-m, --message <message>', 'Commit message')
  .option('-f, --file <file>', 'Commit message file')
  .description('Validate a change')
  .action(validate);

// Categories
program
  .command('categories')
  .option('-j, --json', 'Output as JSON')
  .option('-y, --yaml', 'Output as YAML')
  .option('-m, --markdown', 'Output as Markdown')
  .description('List all categories')
  .action(categories);

// Commits
program
  .command('commits-between <beginHash> [endHash]')
  .description('List commits between two hashes')
  .action(commitsBetween);

// Changelog
program
  .command('changelog <beginHash> [endHash]')
  .option('--type <type>', 'Changelog type')
  .option('-m, --markdown', 'Output as Markdown')
  .description('Generate a changelog between two hashes')
  .action(changelog);

program.parse();
