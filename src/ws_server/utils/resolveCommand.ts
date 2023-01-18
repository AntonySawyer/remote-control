import { COMMAND } from '../constants/command';
import { COMMAND_NOT_EXIST_MESSAGE } from '../constants/error';
import { CommandToHandlerMap, IParsedCommand } from '../interfaces/command';
import { getMousePosition } from '../modules/mousePosition';

const COMMAND_TO_HANDLER_MAP: CommandToHandlerMap = {
  [COMMAND.MOUSE_POSITION]: getMousePosition,
  [COMMAND.MOUSE_UP](): string | void {
    throw new Error('Function not implemented.');
  },
  [COMMAND.MOUSE_DOWN](): string | void {
    throw new Error('Function not implemented.');
  },
  [COMMAND.MOUSE_LEFT](): string | void {
    throw new Error('Function not implemented.');
  },
  [COMMAND.MOUSE_RIGHT](): string | void {
    throw new Error('Function not implemented.');
  },
  [COMMAND.DRAW_CIRCLE](): string | void {
    throw new Error('Function not implemented.');
  },
  [COMMAND.DRAW_RECTANGLE](): string | void {
    throw new Error('Function not implemented.');
  },
  [COMMAND.DRAW_SQUARE](): string | void {
    throw new Error('Function not implemented.');
  },
  [COMMAND.PRINT_SCREEN](): string | void {
    throw new Error('Function not implemented.');
  },
};

const parseCommand = (commandRaw: string): IParsedCommand => {
  const [command, ...commandArgs] = commandRaw.split(' ');

  const isCommandExist = Object.values(COMMAND).includes(command as COMMAND);

  if (!isCommandExist) {
    throw new Error(COMMAND_NOT_EXIST_MESSAGE);
  }

  return {
    command: command as COMMAND,
    commandArgs,
  };
};

export const resolveCommand = (message: string): string | void => {
  const { command, commandArgs } = parseCommand(message);

  const handler = COMMAND_TO_HANDLER_MAP[command];
  const result = handler(commandArgs);

  return result;
};
