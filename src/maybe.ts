import * as R from 'ramda';
{
let l;

const nullableToMonad = <T>(a: T) => (a !== null) && (a !== undefined)
  ? new Just(a)
  : new Nothing;
//const ofMonad = <T>(a: T) => new Just(a);

interface Maybe {
  map: (fn: Function) => Just|Nothing;
  getOrElse: (other: unknown) => this|unknown;
  value: unknown|Error;
}

class Just implements Maybe {
  private _val;
  constructor(val: unknown) {
    this._val = val;
  }
  public map = (fn: Function): Just|Nothing => nullableToMonad(
    fn(this._val)
  );
  public getOrElse = (_: unknown) => this._val;
  get value() {
    return this._val;
  }
}

class Nothing implements Maybe {
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
  return (name: string) => nullableToMonad(R.prop(name, ids));
};
const findId = selectById(idsDb);

findId('Catherine')
  .map((x:unknown) => x) // = Just(3)
  .map(R.tap(console.log)); // -> 3

const queryResult = findId('Takashi')
  .map((x:unknown) => x); // = Nothing
queryResult.value; // -> TypeError: Can not extract the value of a Nothing.

findId('Takashi')
  .getOrElse('Try again by another Name.'); // = 'Try again...' if Nothing

console.log(l);
}
