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

const lazyDivider = TE.tryCatchK((x: number) => lazyDivide(x), (e) => `${e}`);

const main = pipe(
  E.right(11),
  TE.fromEither,
  TE.chain(lazyDivider),
//  TE.map(console.log),
  TE.mapLeft(console.error),
);

main();
