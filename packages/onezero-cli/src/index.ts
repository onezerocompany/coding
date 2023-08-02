#!/usr/bin/env node

import { Command } from 'commander';
import { registerAtlasCommand } from './commands/atlas';
import { registerProjectCommand } from './commands/project';
import { registerFilesCommand } from './commands/files';

const program = new Command();

program.name('onezero').alias('oz').version('1.0.0');

registerAtlasCommand(program);
registerProjectCommand(program);
registerFilesCommand(program);

program
  .command('help')
  .description('Display help')
  .action(() => {
    program.outputHelp();
  });

program.parse(process.argv);
