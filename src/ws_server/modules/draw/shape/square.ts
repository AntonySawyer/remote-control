import { COMMAND } from '../../../constants/command';
import { DrawFigureHandler, SquareOptions } from '../../../interfaces/draw';
import { drawRectangle } from './rectangle';

export const drawSquare: DrawFigureHandler<SquareOptions> = async ({ size }) => {
  await drawRectangle({
    height: size,
    width: size,
    command: COMMAND.DRAW_RECTANGLE,
  });
};
