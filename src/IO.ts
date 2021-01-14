import fs from 'fs';
import path from 'path';
{
let l: any = 'End';

class IO {
  constructor(private effect: Function) {};
  public run = () => this.effect();
  public map = (fn: Function) => {
    const self = this;
    return new IO(() => fn(self.effect())); // compose
  }
}
const toIO = (fn: Function) => new IO(fn); // Lift funcion to monad

/** fs (not async) */
const getTxt = (path: string) => () => {
  const data = fs.readFileSync(path, 'utf-8');
  return data;
}
const txtToUpperCase = toIO(getTxt(path.resolve(__dirname, 'assets', 'data1.txt')))
  .map((x: string) => x.toUpperCase());

const result = txtToUpperCase.run();
l = result;

console.log(l);
}
