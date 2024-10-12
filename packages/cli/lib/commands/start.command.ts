import { AbstractCommand } from '~lib/commands/abstract.command';

export class StartCommand extends AbstractCommand {
  nameAndArgs = 'start';
  description = 'Start the app in watch mode';

  async execute() {
    const { createServer } = await import('vite');
    const { default: tsConfigPaths } = await import('vite-tsconfig-paths');

    const server = await createServer({
      root: process.cwd(),
      plugins: [tsConfigPaths()],
    });

    await server.listen(8080);

    server.printUrls();
    server.bindCLIShortcuts({ print: true });
  }
}
