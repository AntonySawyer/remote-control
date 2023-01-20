import { COMMAND } from '../constants/command';

const wrapInputMessage = (message: string): string => (
  `-> ${message}`
);

const wrapOutputMessage = (message: string): string => (
  `<- ${message}`
);

const getLogForPrintScreen = (base64: string): string => (
  `${COMMAND.PRINT_SCREEN} send result as base64 string. Content length: ${base64.length}.`
);

const getMessageForOutput = (message: string, command?: string): string => {
  let messageForLog: string = message;

  switch (command) {
    case COMMAND.PRINT_SCREEN:
      messageForLog = getLogForPrintScreen(message);

      break;

    default:
      break;
  }

  return messageForLog;
};

/* eslint-disable no-console */
export const logger = (message: string | Error, isInput = true, command?: string): void => {
  const isError = message instanceof Error;

  if (isError) {
    console.error(message);

    return;
  }

  if (!isInput) {
    const messageForOutput = getMessageForOutput(message, command);
    const wrappedMessageForOutput = wrapOutputMessage(messageForOutput);

    console.log(wrappedMessageForOutput);

    return;
  }

  const messageForLogging = wrapInputMessage(message);

  console.log(messageForLogging);
};
/* eslint-enable no-console */
