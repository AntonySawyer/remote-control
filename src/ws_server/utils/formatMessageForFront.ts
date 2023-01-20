export const formatMessageForFront = (message: string): string => {
  const unbreakableSpaceChar = '\u00A0';
  const messageForFront = message.split(' ').join(unbreakableSpaceChar);

  return messageForFront;
};
