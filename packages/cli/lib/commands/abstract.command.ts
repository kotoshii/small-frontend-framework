export abstract class AbstractCommand {
  abstract nameAndArgs: string;
  abstract description?: string;

  abstract execute(...args: unknown[]): Promise<void> | void;
}
