import { AbstractCommand } from '~lib/commands/abstract.command';

export class StartCommand extends AbstractCommand {
  nameAndArgs = 'start';
  description = 'Start the app in watch mode';

  async execute() {
    // TODO: Add logic to start the project in watch mode.
    console.log('`start` command');
  }
}
