import Jimp from 'jimp';
import { mouse, Region, screen } from '@nut-tree/nut-js';

import { DEFAULT_IMAGE_SIZE_PX } from '../constants/screenImage';
import { CommandHandler } from '../interfaces/command';
import { COMMAND } from '../constants/command';

const getResponseForFront = (base64: string): string => {
  const substringToTrim = 'data:image/png;base64,';
  const finalString = base64.replace(substringToTrim, '');

  return `${COMMAND.PRINT_SCREEN} ${finalString}`;
};

export const getScreenImage: CommandHandler<string> = async () => {
  const { x, y } = await mouse.getPosition();

  const left = x - DEFAULT_IMAGE_SIZE_PX / 2;
  const top = y - DEFAULT_IMAGE_SIZE_PX / 2;
  const regionToCapture = new Region(left, top, DEFAULT_IMAGE_SIZE_PX, DEFAULT_IMAGE_SIZE_PX);

  const grabbedImageRaw = await screen.grabRegion(regionToCapture);
  const grabbedImageRawRGB = await grabbedImageRaw.toRGB();

  const jimpImage = new Jimp({ ...grabbedImageRawRGB });
  const base64 = await jimpImage.getBase64Async(Jimp.MIME_PNG);

  const result = getResponseForFront(base64);

  return result;
};
