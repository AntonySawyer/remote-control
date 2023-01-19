import WebSocket, { createWebSocketStream, RawData, WebSocketServer } from 'ws';

import { handleError } from './utils/handleError';
import { logger } from './utils/logging';
import { resolveCommand } from './utils/resolveCommand';
import { formatMessageForFront } from './utils/formatMessageForFront';

export const initWebsocketServer = (port: number) => {
  const wss = new WebSocketServer({ port });
  logger(`Websocket Server started at port ${wss.options.port}`);

  wss.on('connection', (websocket: WebSocket) => {
    logger(`Connected to Websocket Server at port ${wss.options.port}`);

    const webSocketStream = createWebSocketStream(websocket, { decodeStrings: false });

    webSocketStream.on('data', async (data: RawData) => {
      try {
        const message: string = data.toString();
        logger(`> ${message}`);

        const response = await resolveCommand(message);

        if (response) {
          logger(`< ${response}`);
          webSocketStream.write(response);
        } else {
          const messageForFront = formatMessageForFront(message);
          webSocketStream.write(messageForFront);
        }
      } catch (error) {
        handleError(error as Error, websocket);
      }
    });
  });
};
