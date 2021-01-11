import * as R from 'ramda';
{
let l;

/**
 * - constructor: 型コンストラクター 静的型付けはここでやる
 * -   of(): wrap モナドで包む ユニット関数
 * -  map(): fmap モナドからモナドへ バインド関数
 * - join():  map モナドを剥がす w(w(w())) => w()
 */
class Wrapper {
  private _val;
  constructor(val: unknown) {
    this._val = val;
  }

  static of = (a: unknown) => new Wrapper(a);

  public map = (fn: Function) => Wrapper.of(
    fn(this._val)
  );

  public join = (): Wrapper => {
    if (!(this._val instanceof Wrapper)) return this;
    return this._val.join();
  }

  public get = () => this._val;
  public toString = () => `Wrapper (${this._val})`;
}

const www = Wrapper.of(Wrapper.of(Wrapper.of('Bob')));
www
  .join() // = Wrapper('Bob')
  .map(R.tap(console.log)); // -> 'Bob'

console.log(l);
}
