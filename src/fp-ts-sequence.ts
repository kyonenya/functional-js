import * as A from 'fp-ts/lib/Array'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/function';
import { sequence } from 'fp-ts/lib/ReadonlyRecord';
import { sequenceT } from 'fp-ts/lib/Apply'

const eithers = [1, 2, 3].map(E.right); // [Right(1), Right(2), Right(3)]
const either = A.array.sequence(E.either)(eithers); // Right([1, 2, 3])

pipe(
  either,
  E.map((nums) => nums.reduce((num, acc) => acc + num, 0)),
  // E.map(console.log), // 6
);

/**
 * Task
 */
const logTask = (a: number):T.Task<void> => () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log(a));
    }, 500);
  });
};
const tasks = [logTask(1), logTask(3), logTask(5)];
const task = A.array.sequence(T.task)(tasks);
// task();

const seqTask = A.array.sequence(T.taskSeq)(tasks);
// seqTask();

/**
 * SequenceT
 * 可変長引数みたいなもん 受け取った引数を配列にしてくれる
 * @url https://dev.to/gnomff_65/fp-ts-sequencet-and-sweet-sweet-async-typed-fp-5aop
 */
// 一挙実行 T.task
const task2 = sequenceT(T.task)(logTask(2), logTask(4), logTask(6));
// task2();

// 順次実行 T.taskSeq
const seqTask2 = sequenceT(T.taskSeq)(logTask(2), logTask(4), logTask(6));
// seqTask2();
