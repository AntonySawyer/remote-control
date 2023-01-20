import * as dotenv from 'dotenv';

import { httpServer } from './src/http_server/index';

import { initWebsocketServer } from './src/ws_server/index';

dotenv.config();

const DEFAULT_HTTP_PORT = 8181;
const DEFAULT_WS_PORT = 8080;

const {
  STATIC_CONTENT_PORT = DEFAULT_HTTP_PORT,
  WS_PORT = DEFAULT_WS_PORT,
} = process.env;

// eslint-disable-next-line no-console
console.log(`Start static http server on the ${STATIC_CONTENT_PORT} port!`);
httpServer.listen(STATIC_CONTENT_PORT);

initWebsocketServer(Number(WS_PORT));

// TODO: streams
// TODO: remove useless TODO comments after check at Windows
