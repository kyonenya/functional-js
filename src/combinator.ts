{
let l: any = 'End';

const pipe = <T>(x: T) => {
  return <U>(fn: (x: T) => U) => {
    return pipe(fn(x));
  };
};

const compose = (..._fns: Function[]) => {
  const fns = [..._fns];
  return (x: unknown) => fns.reverse().reduce((acc, fn) => fn(acc), x);
};

const trim = (str: string) => str.replace(' ', '');
const toInt = (numStr: string) => parseInt(numStr);
const taxize = (price: number) => price * 1.1;

pipe('100')
  (x => x) // identity
  (x => taxize(toInt(x))) // compose
  (x => console.log(x)); // tap

/**
 * - identity (I combinator)
 * - tap (K combinator)
 * - compose / pipe
 * - alternation (OR combinator)
 * - sequense (S combinator): roop
 * - fork(join)
 */
const identity = (x: unknown) => x;
const tap = (fn: Function) => {  
  return (x: unknown) => {
    fn(x);
    return x;
  };
};

pipe('  200 ')
  (identity)
  (compose(taxize, toInt, trim)) // = 220
  (tap(console.log)); // -> 220.0

console.log(l);
}
