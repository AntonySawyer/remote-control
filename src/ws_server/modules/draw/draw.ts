import { COMMAND } from '../../constants/command';
import { WRONG_ARGUMENT } from '../../constants/error';
import { CommandHandler } from '../../interfaces/command';
import {
  DrawCommands,
  DrawFigureHandler,
  FigureOption,
} from '../../interfaces/draw';
import { drawCircle, drawRectangle, drawSquare } from './shape';

const getFigureHandler = (command: COMMAND): DrawFigureHandler => {
  let handler;

  switch (command) {
    case COMMAND.DRAW_RECTANGLE:
      handler = drawRectangle;
      break;

    case COMMAND.DRAW_SQUARE:
      handler = drawSquare;
      break;

    case COMMAND.DRAW_CIRCLE:
    default:
      handler = drawCircle;
  }

  return handler as DrawFigureHandler;
};

const convertSizeToNumber = (size: string): number => {
  if (!size) {
    throw new Error(WRONG_ARGUMENT);
  }

  return Number(size);
};

const getHandlerArgs = (command: DrawCommands, [sizeA, sizeB]: string[]): FigureOption => {
  if (command === COMMAND.DRAW_SQUARE) {
    return {
      command,
      size: convertSizeToNumber(sizeA),
    };
  }

  if (command === COMMAND.DRAW_RECTANGLE) {
    return {
      command,
      width: convertSizeToNumber(sizeA),
      height: convertSizeToNumber(sizeB),
    };
  }

  return {
    command,
    radius: convertSizeToNumber(sizeA),
  };
};

export const handleDraw: CommandHandler<void> = async (command: COMMAND, sizes) => {
  const figureHandler = getFigureHandler(command);
  const handlerArgs = getHandlerArgs(command as DrawCommands, sizes);

  await figureHandler(handlerArgs);
};
