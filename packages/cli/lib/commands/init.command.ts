import chalk from 'chalk';
import { ncp } from 'ncp';
import { resolve } from 'path';

import { AbstractCommand } from '~lib/commands/abstract.command';

export class InitCommand extends AbstractCommand {
  nameAndArgs = 'init <path>';
  description = 'Initialize a new project';

  async execute(path: string) {
    if (path === '.') {
      console.log('Initializing a new SFF project in the current folder...');
    } else {
      console.log(`Initializing a new SFF project at ${path}...`);
    }

    await this.copyInitTemplate(path);

    console.log('Done!');
    console.log('\nTo run the app:');
    console.log(chalk.blue('npm install'));
    console.log(chalk.blue('npm run start'));
    console.log('\nTo build the app:');
    console.log(chalk.blue('npm run build'));
  }

  copyInitTemplate(path: string) {
    return new Promise((res, rej) => {
      ncp(
        resolve(__dirname, '../../templates/init'),
        resolve(process.cwd(), path),
        (err) => {
          if (err) rej(err);
          res(true);
        },
      );
    });
  }
}
