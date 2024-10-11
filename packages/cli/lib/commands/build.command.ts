import { AbstractCommand } from '~lib/commands/abstract.command';

export class BuildCommand extends AbstractCommand {
  nameAndArgs = 'build [configPath]';
  description = 'Build the app for production';

  async execute(configFile?: string) {
    const { build } = await import('vite');

    await build({
      root: process.cwd(),
      configFile,
    });
  }
}
