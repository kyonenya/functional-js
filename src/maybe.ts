import * as R from 'ramda';
{
let l;

class Maybe {
  static fromNullable = <T>(a: T) => (a !== null) && (a !== undefined)
    ? new Just(a)
    : new Nothing;
  static of = <T>(a: T) => new Just(a);
}

class Just {
  private _val;
  constructor(val: unknown) {
    this._val = val;
  }
  public map = (fn: Function): Just|Nothing => Maybe.fromNullable(
    fn(this._val)
  );
  public getOrElse = (_: unknown) => this._val;
  get value() {
    return this._val;
  }
}

class Nothing {
  public map = (fn: Function) => this; // => Nothing
  get value() {
    throw new TypeError('Can not extract the value of a Nothing.');
  }
  public getOrElse = (other: unknown) => other;
}

/**
 * safe search
 */
const idsDb = { 'Alex': 1, 'Bob': 2, 'Catherine': 3 };

type findIdUseCase = (name: string) => Just|Nothing;
const selectById = (ids: { [k: string]: number }): findIdUseCase => {
  return (name: string) => Maybe.fromNullable(R.prop(name, ids));
};
const findId = selectById(idsDb);

findId('Catherine')
  .map((x:unknown) => x) // = Just(3)
//  .map(R.tap(console.log)); // -> 3

const queryResult = findId('Takashi')
  .map((x:unknown) => x); // = Nothing
//queryResult.value; // -> TypeError: Can not extract the value of a Nothing.

findId('Takashi')
  .getOrElse('Try again by another Name.'); // = 'Try again...' if Nothing

console.log(l);
}