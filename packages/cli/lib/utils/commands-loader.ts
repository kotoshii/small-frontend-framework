import { Command as CommanderProgram } from 'commander';

import { AbstractCommand } from '~lib/commands/abstract.command';

export class CommandsLoader {
  private program: CommanderProgram;

  constructor(program: CommanderProgram) {
    this.program = program;
  }

  load(command: AbstractCommand) {
    this.program
      .command(command.nameAndArgs)
      .description(command.description || '')
      .action((...args: unknown[]) => {
        command.execute(...args);
      });
  }
}
