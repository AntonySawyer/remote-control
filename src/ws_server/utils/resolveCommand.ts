import { COMMAND } from '../constants/command';
import { COMMAND_NOT_EXIST_MESSAGE } from '../constants/error';
import { CommandToHandlerMap, IParsedCommand } from '../interfaces/command';
import { handleDraw } from '../modules/draw/draw';
import { handleMove } from '../modules/mouseMove';
import { getMousePosition } from '../modules/mousePosition';
import { getScreenImage } from '../modules/screenImage';

const COMMAND_TO_HANDLER_MAP: CommandToHandlerMap = {
  [COMMAND.MOUSE_POSITION]: getMousePosition,
  [COMMAND.MOUSE_UP]: handleMove,
  [COMMAND.MOUSE_DOWN]: handleMove,
  [COMMAND.MOUSE_LEFT]: handleMove,
  [COMMAND.MOUSE_RIGHT]: handleMove,
  [COMMAND.DRAW_CIRCLE]: handleDraw,
  [COMMAND.DRAW_RECTANGLE]: handleDraw,
  [COMMAND.DRAW_SQUARE]: handleDraw,
  [COMMAND.PRINT_SCREEN]: getScreenImage,
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
