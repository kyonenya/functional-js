import * as R from 'ramda';
{
let l;

const wrap = (val: unknown) => new Wrapper(val);
class Wrapper {
  private _value;
  constructor(value: unknown) {
    this._value = value;
  } 
  public  map = (fn: Function) => fn(this._value);
  public fmap = (fn: Function) => wrap(fn(this._value));
}

const compose2 = (fn1: Function, fn2: Function) => {
  return (x: unknown) => fn1(fn2(x));
};

/**
 * nested functors
 */
const idsRepo = { 'Alex': 1, 'Bob': 2, 'Catherine': 3 };

const findStudent = (ids: { [k: string]: number }) => {
  return (name: string) => wrap(R.prop(name, ids));
    // prop: immutable object searcher
};
findStudent(idsRepo)('Catherine') // Wrapper(3)
  .map((x:unknown) => x); // = 3

const getAddress = (wrappedId: Wrapper) => {
  const addresses = [2260002, 1660004, 4960947];
  const id = wrappedId.map(R.identity);
  const address = addresses[id];
  return wrap(
    wrap(address)
  );
};

const studentAddress = compose2(
  getAddress,
  findStudent(idsRepo)
);
l = studentAddress('Bob'); // = Wrapper(Wrapper(1660004))

console.log(l);
}
