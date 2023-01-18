import WebSocket, { RawData, WebSocketServer } from 'ws';

import { handleError } from './utils/handleError';
import { resolveCommand } from './utils/resolveCommand';

export const initWebsocketServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws: WebSocket) => {
    console.log('Connected to Websocket Server.');

    ws.on('message', (data: RawData) => {
      try {
        const message: string = data.toString();
        const response = resolveCommand(message);

        if (response) {
          ws.send(response);
        }
      } catch (error) {
        handleError(error as Error, ws);
      }
    });
  });
};
