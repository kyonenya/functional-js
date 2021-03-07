import * as E from 'fp-ts/lib/Either';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/function';

const lazyDouble = (x: number): T.Task<number> => () => Promise.resolve(x * 2);

const lazyDoubleThree = lazyDouble(3);
//lazyDoubleThree().then(console.log); // -> 6

const lazyDivide = (x: number) => new Promise((resolve, reject) => {
  if (x % 2 === 1) reject('奇数が入力された');
  return resolve(x / 2);
});
//lazyDivide(3).then(console.log).catch(console.error);

const either = TE.tryCatch(() => lazyDivide(10), err => `${err}`);
const either2 = TE.map(console.log)(either);

const main = pipe(
  TE.tryCatch(() => lazyDivide(10), err => `${err}`),
  TE.map(console.log),
);

main();
