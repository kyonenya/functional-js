import * as R from 'ramda';
{
let l;

const wrap = (val: unknown) => new Wrapper(val);
class Wrapper {
  private _val;
  constructor(val: unknown) {
    this._val = val;
  }
  public  map = (fn: Function) => fn(this._val);
  public fmap = (fn: Function) => wrap(this.map(fn));
}

const empty = () => new Empty();
class Empty {
  public  map = (_: Function) => this; // skip
  public fmap = (_: Function) => new Empty()
}

const e = empty();
e.map(R.identity); // = Empty
e.fmap(R.identity); // = Empty

const isEven = (n: number) => Number.isFinite(n) && (n % 2 === 0);
const half = (n: number) => isEven(n)
  ? wrap(n / 2)
  : empty();

half(4); // = 2
half(3); // = Empty
half(3).fmap((x: number) => x * 2).fmap(R.identity) // = Empty                                                           

console.log(l);
}