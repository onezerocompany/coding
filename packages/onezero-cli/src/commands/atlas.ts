import { Command } from 'commander';
import { server } from '@onezerocompany/atlas';

export function registerAtlasCommand(program: Command) {
  program
    .command('atlas')
    .description('Start the Atlas server')
    .action(() => {
      server.serve();
    });
}
