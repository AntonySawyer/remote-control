import { COMMAND } from '../constants/command';

export interface IParsedCommand {
  command: COMMAND;
  commandArgs: string[];
}

export interface CommandHandler<TReturn> {
  (command: COMMAND, args: string[]): Promise<TReturn>;
}

export type CommandToHandlerMap = {
  [COMMAND.MOUSE_POSITION]: CommandHandler<string>;
  [COMMAND.DRAW_CIRCLE]: CommandHandler<void>;
  [COMMAND.DRAW_RECTANGLE]: CommandHandler<void>;
  [COMMAND.DRAW_SQUARE]: CommandHandler<void>;
  [COMMAND.MOUSE_DOWN]: CommandHandler<void>;
  [COMMAND.MOUSE_LEFT]: CommandHandler<void>;
  [COMMAND.MOUSE_RIGHT]: CommandHandler<void>;
  [COMMAND.MOUSE_UP]: CommandHandler<void>;
  [COMMAND.PRINT_SCREEN]: CommandHandler<string>;
};
