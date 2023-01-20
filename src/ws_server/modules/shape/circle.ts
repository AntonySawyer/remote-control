import {
  centerOf,
  mouse,
  Point,
  Region,
} from '@nut-tree/nut-js';

import { convertDegIntoRadians } from '../../utils/convertDegIntoRadians';
import { CircleOptions, DrawFigureHandler } from '../../interfaces/draw';

export const drawCircle: DrawFigureHandler<CircleOptions> = async ({ radius }) => {
  const startPoint = await mouse.getPosition();
  const diameter = radius * 2;

  const fullCircleDeg = 360;
  const angleCorrection = convertDegIntoRadians(-90);
  const path: Point[] = [];

  const region = new Region(startPoint.x - radius, startPoint.y, diameter, diameter);
  const centerPoint = await centerOf(region);

  for (let angle = 0; angle < fullCircleDeg; angle += 0.5) {
    const x = centerPoint.x + radius * Math.cos(convertDegIntoRadians(angle) + angleCorrection);
    const y = centerPoint.y + radius * Math.sin(convertDegIntoRadians(angle) + angleCorrection);

    const point = new Point(x, y);

    path.push(point);
  }

  await mouse.drag(path);
};
