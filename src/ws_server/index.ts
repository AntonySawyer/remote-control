import { WebSocketServer } from "ws";


export const initWebsocketServer = (port: number) => {

  const wss = new WebSocketServer({ port });

  wss.on('connection', () => {
    console.log('connected')
  });
}
