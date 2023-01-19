import { mouse, Point } from '@nut-tree/nut-js';

import { COMMAND } from '../constants/command';
import { CommandHandler } from '../interfaces/command';

const getPointTrace = async (command: COMMAND, distance: number): Promise<Point[]> => {
  const currentPoint = await mouse.getPosition();
  const points: Point[] = [];

  if (command === COMMAND.MOUSE_DOWN) {
    points.push(new Point(currentPoint.x, currentPoint.y + distance));
  }

  if (command === COMMAND.MOUSE_UP) {
    points.push(new Point(currentPoint.x, currentPoint.y - distance));
  }

  if (command === COMMAND.MOUSE_LEFT) {
    points.push(new Point(currentPoint.x - distance, currentPoint.y));
  }

  if (command === COMMAND.MOUSE_RIGHT) {
    points.push(new Point(currentPoint.x + distance, currentPoint.y));
  }

  return points;
};

const moveMouse = async (target: Point[]): Promise<void> => {
  await mouse.move(target);
};

export const handleMove: CommandHandler<void> = async (command, [distanceStr]) => {
  const distance = Number(distanceStr);
  const points = await getPointTrace(command, distance);

  moveMouse(points);
};
