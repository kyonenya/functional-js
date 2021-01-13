import * as R from 'ramda';
{
let l;

type f<T, U> =(x: T) => U;
//type Either<T> = Left<T>|Right<T>;

const ofRight = <T>(val: T) => new Right(val);
const ofLeft = <T>(val: T) => new Left(val);

interface Either<T> {
  map: <U>(fn: f<T, U>) => Left<T>|Right<U>;
  getOrElse: <U>(other: U) => U|T;
  orElse: <U>(fn: f<T, U>) => U|Right<T>;
  value: void|T;
}

class Left<T> implements Either<T> {
  constructor(private _value: T) {}
  public map = (_: Function) => this; // => Left (skipped)
  get value() { throw new TypeError('Can not extract the value of Left') }
  public getOrElse = <U>(other: U) => other;
  public orElse = <U>(fn: f<T, U>)=> fn(this._value); // => U
}

class Right<T> implements Either<T> {
  constructor(private _value: T) {}
  public map = <U>(fn: f<T, U>) => ofRight(fn(this._value)); // => Right<U>
  get value() { return this._value };
  public getOrElse = (_: unknown) => this.value;
  public orElse = (_: Function) => this; // => Right (skipped)
}

/** 
 * Maybe-like Either (Safe execution)
 */
const ofEither = <T>(a: T) => (a !== null && a !== undefined)
  ? new Right(a)
  : new Left(a);

const idsDb = { 'Alex': 1, 'Bob': 2, 'Catherine': 3 };
const selectById = (ids: { [k: string]: number }) => {
  return (name: string) => ofEither(R.prop(name, ids)); // from nullable
};
const safeFindId: (name: string) => Either<number> = selectById(idsDb);

safeFindId('Catherine') // = Right(3)
  .orElse(R.tap(console.log)) // (skipped)
  .map(R.tap(console.log)); // -> 3
//safeFindId('Takashi')
//  .value; // -> Uncaught TypeError: Can not extract the value of Left
safeFindId('Takashi')
  .orElse(R.tap(console.log)); // -> undefined



console.log(l);
}