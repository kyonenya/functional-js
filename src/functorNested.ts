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

const compose = (..._fns: any[]) => {
  const fns = [..._fns];
  return <T>(x: T) => fns.reverse().reduce((acc, fn) => fn(acc), x);
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

const getAddress = (id: number) => {
  const addresses = [2260002, 1660004, 4960947];
  return wrap(addresses[id - 1]);
};
getAddress(3)
  .map((x:unknown) => x); // = 4960947

const then = (wrapped: Wrapper) => wrapped.map(R.identity);

/**
 * functorの限界
 * - Wrapを剥がして値をLiftする関数を挟まないと関数合成ができない
 * - あるいは合成するたびに新たにWrapされた値が返り、
 *   何回もLiftしないと値が取り出せない。
 */
const studentAddress: (name: string) => Wrapper = R.compose(
  getAddress,
  then, // Promise<value> => value
  findStudent(idsRepo),
);

studentAddress('Bob')
  .map(R.tap(console.log)); // -> 1660004

console.log(l);
}
