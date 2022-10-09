/**
 * @file CLI entry point for the project-manager package.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { program } from 'commander';

program
  .name('OneZero Project Manager')
  .description(
    "OneZero's tool for managing projects and the configurations, tools and other aspects of the projects.",
  );

program.parse();
