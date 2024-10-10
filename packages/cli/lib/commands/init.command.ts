import { AbstractCommand } from '~lib/commands/abstract.command';

export class InitCommand extends AbstractCommand {
  nameAndArgs = 'init <path>';
  description = 'Initialize a new project';

  async execute(path: string) {
    // TODO: Add new project initialization logic.
    console.log('`init` command', path);
  }
}
