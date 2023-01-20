import { mouse, Point, straightTo } from '@nut-tree/nut-js';

import { DrawFigureHandler, RectangeOptions } from '../../../interfaces/draw';

export const drawRectangle: DrawFigureHandler<RectangeOptions> = async ({ height, width }) => {
  const { x, y } = await mouse.getPosition();

  await mouse.drag(straightTo(new Point(x, y + height)));
  await mouse.drag(straightTo(new Point(x + width, y + height)));
  await mouse.drag(straightTo(new Point(x + width, y)));
  await mouse.drag(straightTo(new Point(x, y)));
};
