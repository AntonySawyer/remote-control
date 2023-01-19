import { mouse, Point } from '@nut-tree/nut-js';
import { COMMAND } from '../constants/command';

import { CommandHandler } from '../interfaces/command';

const getCoordinatesMessage = ({ x, y }: Point): string => (
  `${COMMAND.MOUSE_POSITION} ${x},${y}`
);

export const getMousePosition: CommandHandler<string> = async () => {
  const point = await mouse.getPosition();
  const positionString = getCoordinatesMessage(point);

  return positionString;
};
