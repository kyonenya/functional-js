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
 * SequenceT
 * @url https://dev.to/gnomff_65/fp-ts-sequencet-and-sweet-sweet-async-typed-fp-5aop
 */

const logTask = (a: number): T.Task<void> => () => Promise.resolve(console.log(a));
// Task(123)();

const tasks = [logTask(1), logTask(3), logTask(5)];
const task = A.array.sequence(T.task)(tasks);
// task();

const task2 = sequenceT(T.task)(logTask(2), logTask(4), logTask(6));
// task2();

const task3 = sequenceT(T.taskSeq)(logTask(2), logTask(4), logTask(6));
task3();
