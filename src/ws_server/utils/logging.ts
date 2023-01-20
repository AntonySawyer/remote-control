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

const getMessagesForOutput = (message: string, command?: string): string[] => {
  const messagesForLog: string[] = [];

  switch (command) {
    case COMMAND.PRINT_SCREEN:
      messagesForLog.push(getLogForPrintScreen(message));
      messagesForLog.push(message);

      break;

    default:
      messagesForLog.push(message);
      break;
  }

  return messagesForLog;
};

/* eslint-disable no-console */
export const logger = (message: string | Error, isInput = true, command?: string): void => {
  const isError = message instanceof Error;

  if (isError) {
    console.error(message);

    return;
  }

  if (!isInput) {
    const messagesForOutput = getMessagesForOutput(message, command);
    messagesForOutput.forEach((messageLine) => {
      const wrappedMessageForOutput = wrapOutputMessage(messageLine);

      console.log(wrappedMessageForOutput);
    });

    return;
  }

  const messageForLogging = wrapInputMessage(message);

  console.log(messageForLogging);
};
/* eslint-enable no-console */
