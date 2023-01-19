import { COMMAND } from '../constants/command';
import { COMMAND_NOT_EXIST_MESSAGE } from '../constants/error';
import { CommandToHandlerMap, IParsedCommand } from '../interfaces/command';
import { handleMove } from '../modules/mouseMove';
import { getMousePosition } from '../modules/mousePosition';

const COMMAND_TO_HANDLER_MAP: CommandToHandlerMap = {
  [COMMAND.MOUSE_POSITION]: getMousePosition,
  [COMMAND.MOUSE_UP]: handleMove,
  [COMMAND.MOUSE_DOWN]: handleMove,
  [COMMAND.MOUSE_LEFT]: handleMove,
  [COMMAND.MOUSE_RIGHT]: handleMove,
  [COMMAND.DRAW_CIRCLE]: async (): Promise<void> => {
    throw new Error('Function not implemented.');
  },
  [COMMAND.DRAW_RECTANGLE]: async (): Promise<void> => {
    throw new Error('Function not implemented.');
  },
  [COMMAND.DRAW_SQUARE]: async (): Promise<void> => {
    throw new Error('Function not implemented.');
  },
  [COMMAND.PRINT_SCREEN]: async (): Promise<void> => {
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

export const resolveCommand = async (message: string): Promise<void | string> => {
  const { command, commandArgs } = parseCommand(message);

  const handler = COMMAND_TO_HANDLER_MAP[command];
  const result = await handler(command, commandArgs);

  return result;
};
