import { AbstractCommand } from '~lib/commands/abstract.command';

export class BuildCommand extends AbstractCommand {
  nameAndArgs = 'build';
  description = 'Build the app for production';

  async execute() {
    // TODO: Add logic to build the project for production.
    console.log('`build` command');
  }
}
