import { Command } from 'commander';
import { printProject } from '../project/print_project';
import { config } from '@onezerocompany/atlas';

export function registerProjectCommand(program: Command) {
  const projectCommand = program
    .command('project')
    .description('Manage and a project');

  projectCommand
    .command('details')
    .description('Display project details')
    .option('-v, --verbose', 'Display verbose details')
    .action(async ({ verbose }: { verbose: boolean }) => {
      const loadedConfig = await config.load();
      printProject({ loadedConfig, verbose });
    });
}
