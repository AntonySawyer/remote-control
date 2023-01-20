import { COMMAND } from '../constants/command';

export type DrawCommands = COMMAND.DRAW_CIRCLE | COMMAND.DRAW_RECTANGLE | COMMAND.DRAW_SQUARE;

export type CircleOptions = {
  command: COMMAND.DRAW_CIRCLE;
  radius: number;
};

export type RectangeOptions = {
  command: COMMAND.DRAW_RECTANGLE;
  width: number;
  height: number;
};

export type SquareOptions = {
  command: COMMAND.DRAW_SQUARE;
  size: number;
};

export type FigureOption = CircleOptions | RectangeOptions | SquareOptions;

export interface DrawFigureHandler<TFigure = FigureOption> {
  (options: TFigure): Promise<void>;
}
