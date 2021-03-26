import * as T from 'fp-ts/lib/Task';
import * as A from 'fp-ts/lib/Array';

const sleep = async (msec: number): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, msec));
  console.log(`run sleep(${msec})`); // sleepが完了したタイミングでログが出力される
  return msec;
};

const sleepTask = (msec: number): T.Task<number> => async () => await sleep(msec);

async function fb(arr: Array<number>) {
  // Task<T>[] => Task<T[]> への変換
  const sleepTasks: T.Task<number>[] = arr.map((num) => sleepTask(100 * num));
  const sleepSeqTasks: T.Task<number[]> = A.array.sequence(T.task)(sleepTasks);

  // ここでタスクの実行
  const numbers = await sleepSeqTasks();
  return numbers;
}

fb([10, 30, 50]);
