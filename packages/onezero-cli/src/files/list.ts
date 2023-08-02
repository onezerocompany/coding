import { config, files } from '@onezerocompany/atlas';
import { FileGraphEntry } from '@onezerocompany/atlas/dist/files';
import { RepositoryConfig } from '@onezerocompany/config';
import { Command } from 'commander';
import { Listr } from 'listr2';

interface ListContext {
  config: RepositoryConfig;
  graph?: FileGraphEntry;
}

export function registerListCommand(program: Command) {
  program
    .command('list')
    .description('Display files details')
    .option('-v, --verbose', 'Display verbose details')
    .action(async ({ verbose }: { verbose: boolean }) => {
      const loadedConfig = await config.load();
      if (!loadedConfig.config) {
        throw new Error('No config found');
      }
      const tasks = new Listr<ListContext>([
        {
          title: 'Initializing project graph',
          task: async (ctx, task) => {
            ctx.graph = await files.createFileGraph({
              config: ctx.config,
            });
            task.title = `Initialized project graph`;
          },
        },
      ]);

      await tasks.run({ config: loadedConfig.config });
    });
}
