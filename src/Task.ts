import { Task } from 'fp-ts/lib/Task';
import { TaskEither, tryCatch, left, right, map, mapLeft } from 'fp-ts/lib/TaskEither';

const lazyDouble = (x: number): Task<number> => () => Promise.resolve(x * 2);

const lazyDoubleThree = lazyDouble(3);
//lazyDoubleThree().then(console.log); // -> 6

const lazyDivide = (x: number) => new Promise((resolve, reject) => {
  if (x % 2 === 1) reject('奇数が入力された');
  return resolve(x / 2);
});
//lazyDivide(3).then(console.log).catch(console.error);

const either = tryCatch(() => lazyDivide(10), err => `${err}`);
const either2 = map(console.log)(either);

either2();
