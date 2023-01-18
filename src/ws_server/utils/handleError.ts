import WebSocket from 'ws';

export const handleError = (error: Error, websocket: WebSocket): void => {
  const upbreakableSpace = '\u00A0';
  const messageForFront = error.message.split(' ').join(upbreakableSpace);

  // TODO
  // eslint-disable-next-line no-console
  console.error(error);
  websocket.send(messageForFront);
};
