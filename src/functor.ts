{
let l;

const identity = (x: unknown) => x;

class Wrapper {
  private _value;
  constructor(value: unknown) {
    this._value = value;
  }
  
  public  map = (fn: Function) => fn(this._value);
  
  public fmap = (fn: Function) => wrap(fn(this._value));
}

const wrap = (val: unknown) => new Wrapper(val);

const wrappedVal = wrap('Get Functional');

wrappedVal.map((x: unknown) => x); // identity
wrappedVal.map((x: string) => console.log(x)); // tap like

/** fmap */
wrappedVal.fmap((x: unknown) => x); // -> [Function]
wrappedVal
  .fmap((x: string) => x.toUpperCase()) // = wrap('GET FUNCTIONAL')
  .fmap(identity)
  .fmap((x: string) => console.log(x)); // -> 'GET FUNCTIONAL'

console.log(l);
}