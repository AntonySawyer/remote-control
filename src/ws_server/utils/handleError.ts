import WebSocket from 'ws';

import { formatMessageForFront } from './formatMessageForFront';
import { logger } from './logging';

export const handleError = (error: Error, websocket: WebSocket): void => {
  const messageForFront = formatMessageForFront(error.message);

  logger(error);
  websocket.send(messageForFront);
};
