import { createLogger, transports } from 'winston';

const promise1 = (): Promise<string> => new Promise(resolve => setTimeout(() => resolve('0.1秒'), 100));
const promise2 = (): Promise<string> => new Promise(resolve => setTimeout(() => resolve('3秒'), 3000));

const logger = createLogger({
  transports: [new transports.Console()]
});

Promise.all([promise1(), promise2()])
  .then(([result1, result2]) => logger.info(result1))
  ;
