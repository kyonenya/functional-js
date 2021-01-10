{
let l = 'End';

type Pipe<T> = {
  (): T;
  <U>(fn: (x: T) => U): Pipe<U>;
}

const pipe = <T>(x: T) => {
  return <U>(fn: (x: T) => U) => {
    return pipe(fn(x));
  };
};

pipe(100)
  (x => x * 1.1)
  (x => x.toString())
  (x => console.log(x));
//  ();

console.log(l);
}
