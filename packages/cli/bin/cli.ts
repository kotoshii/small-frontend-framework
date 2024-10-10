#!/usr/bin/env node

import { program } from 'commander';

import { BuildCommand } from '~lib/commands/build.command';
import { InitCommand } from '~lib/commands/init.command';
import { StartCommand } from '~lib/commands/start.command';
import { CommandsLoader } from '~lib/utils/commands-loader';
import { resolvePackageVersion } from '~lib/utils/version';

const registeredCommands = [
  new InitCommand(),
  new StartCommand(),
  new BuildCommand(),
];

const commandsLoader = new CommandsLoader(program);

program
  .name('sff-ui')
  .version(resolvePackageVersion())
  .description('CLI tool for sff-ui library')
  .usage('sff-ui [options] [command] [arguments]');

registeredCommands.map((command) => commandsLoader.load(command));

program.parse(process.argv);
