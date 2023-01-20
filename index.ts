import * as dotenv from 'dotenv';

import { logger } from './src/ws_server/utils/logging';
import { httpServer } from './src/http_server/index';
import { initWebsocketServer } from './src/ws_server/index';

dotenv.config();

const DEFAULT_HTTP_PORT = 8181;
const DEFAULT_WS_PORT = 8080;

const {
  STATIC_CONTENT_PORT = DEFAULT_HTTP_PORT,
  WS_PORT = DEFAULT_WS_PORT,
} = process.env;

logger(`Start static http server on the ${STATIC_CONTENT_PORT} port!`);
httpServer.listen(STATIC_CONTENT_PORT);

initWebsocketServer(Number(WS_PORT));
