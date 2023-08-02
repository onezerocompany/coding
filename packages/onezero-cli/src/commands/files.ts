import { Command } from 'commander';
import { registerListCommand } from '../files/list';

export function registerFilesCommand(program: Command) {
  const filesCommand = program
    .command('files')
    .description('Manage and a files');

  registerListCommand(filesCommand);
}
