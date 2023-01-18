import { httpServer } from "./src/http_server/index.js";
import { mouse } from "@nut-tree/nut-js";
import * as dotenv from 'dotenv';

import { initWebsocketServer } from './src/ws_server/index';

dotenv.config();

const DEFAULT_HTTP_PORT = 8181;
const DEFAULT_WS_PORT = 8080;

const {
  STATIC_CONTENT_PORT = DEFAULT_HTTP_PORT,
  WS_PORT = DEFAULT_WS_PORT,
} = process.env;

console.log(`Start static http server on the ${STATIC_CONTENT_PORT} port!`);
httpServer.listen(STATIC_CONTENT_PORT);


initWebsocketServer(Number(WS_PORT));
