{
let l;

const identity = (x: unknown) => x;
const tap = (fn: Function) => (x: unknown) => fn(x);

class Wrapper {
  private _value;
  constructor(value: unknown) {
    this._value = value;
  }
  
  /** 
   * map: Does not wrap, simply return lifted value.
   */
  public  map = (fn: Function) => fn(this._value);
  /**
   * functor: Open container, lift value & apply function, then wrap by container again.
   */
  public fmap = (fn: Function) => wrap(fn(this._value));
}

const wrap = (val: unknown) => new Wrapper(val);

const wrappedVal = wrap('Get Functional');

wrappedVal.map((x: string) => console.log(x)); // -> 'Get Functional'
wrappedVal.map(identity); // = 'Get Functional'

//                       ↑returns value  ↓returns Function

wrappedVal.fmap(identity); // -> [Function] = wrap('Get Functional')
wrappedVal
  .fmap((x: string) => x.toUpperCase()) // = wrap('GET FUNCTIONAL')
  .fmap(tap(console.log)); // -> 'GET FUNCTIONAL'

console.log(l);
}
