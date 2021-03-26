import { pipe } from 'fp-ts/lib/function';
import { ap } from 'fp-ts/lib/Identity'

/**
 * ap 部分適用にすぎない
 * @url https://rlee.dev/writing/practical-guide-to-fp-ts-part-5
 */
const write = (client: number) => (uuid: string) => console.log(uuid);

const invokerA = write(1);
invokerA('h5ds38cv');

const invokerB = pipe(1, write);
pipe('jisnetd5', invokerB);

const invokerC = pipe(write, ap(1));
invokerC('0rjh423s');

write(1)('setd2jis');

pipe('6asep4dj', pipe(1, write));

pipe(write, ap(1), ap('g46sj32l'));
