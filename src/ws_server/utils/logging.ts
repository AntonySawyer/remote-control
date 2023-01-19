/* eslint-disable no-console */
export const logger = (message: string | Error): void => {
  if (message instanceof Error) {
    console.error(message);
  } else {
    console.log(message);
  }
};
/* eslint-enable no-console */
