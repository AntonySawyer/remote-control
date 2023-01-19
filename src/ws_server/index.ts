import WebSocket, { createWebSocketStream, RawData, WebSocketServer } from 'ws';

import { handleError } from './utils/handleError';
import { resolveCommand } from './utils/resolveCommand';

export const initWebsocketServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (websocket: WebSocket) => {
    console.log('Connected to Websocket Server.');

    const webSocketStream = createWebSocketStream(websocket, { decodeStrings: false });

    webSocketStream.on('data', async (data: RawData) => {
      try {
        const message: string = data.toString();
        const response = await resolveCommand(message);

        if (response) {
          webSocketStream.write(response);
        }
      } catch (error) {
        handleError(error as Error, websocket);
      }
    });
  });
};
