import { AbstractCommand } from '~lib/commands/abstract.command';

export class BuildCommand extends AbstractCommand {
  nameAndArgs = 'build [configPath]';
  description = 'Build the app for production';

  async execute(configFile?: string) {
    const { build } = await import('vite');
    const { default: tsConfigPaths } = await import('vite-tsconfig-paths');

    await build({
      root: process.cwd(),
      configFile,
      plugins: [tsConfigPaths()],
    });
  }
}
