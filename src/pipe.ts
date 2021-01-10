{
let l = 'End';
const pipe = (x: any) => {
  return (fn: Function) => {
//    if (!fn) return x;
    return pipe(fn(x));
  };
};

pipe(100)
  ((x: number) => x * 1.1)
  ((x: number) => x.toString())
  ((x: string) => console.log(x));
//  ();

console.log(l);
}
