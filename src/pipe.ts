{
let l = 'End';

const pipeVer1 = <T>(x: T) => {
  return <U>(fn: (x: T) => U) => {
    return pipeVer1(fn(x));
  };
};

pipeVer1(100)
  (x => x * 1.1)
  (x => x.toString())
  (x => console.log(x));

/**
 * pipeline with .value() method
 * - とりうる引数とそれの返り値の間の対応表を呼び出し可能オブジェクトで型付け
 * - 一見すると重複しているのだが、pipe関数の型定義は推論されず、明示的に定義しないとエラーになる
 * （返り値を直接asでキャストしているからか）
 * @url https://qiita.com/nagtkk/items/5c54ec418c1c71fa491a
 */
interface Pipe<T> {
  (): T;
  <U>(fn: (x: T) => U): Pipe<U>;
};
const pipe: <T>(x: T) => Pipe<T> = <T>(x: T) => {
  return (
    <U>(fn?: (x: T) => U) => {
      return fn ? pipe(fn(x)) : x;
    }
  ) as Pipe<T>;
};

pipe(100)
  (x => x * 1.1)
  (x => x.toString())
  ();

console.log(l);
}
