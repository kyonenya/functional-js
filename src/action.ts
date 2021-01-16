import fs from 'fs';
{
let l: any = 'End';

type pure<T>       =        (a: T) => () => T;
type f<T, U>       = (x: T)      =>         U;
type invoker<T, U> =        (a: T) => () => U;
type action<U>     =                  () => U;

const bind = <T>(action: a<T>) => <U>(invoker: i<T, U>): action<U> => {
  const result: T = action();
  const composed: action<U> = invoker(result);
  return invoker(action());
};

const wrap = <T, U>(fn: f<T, U>): invoker<T, U> => {
  return (arg: T): action<U> => {
    return () => fn(arg);
  }
}

const log = (x: unknown) => console.log(x);
  // (x)    =>    fn(x): void
const logInvoker: invoker<unknown, void> = wrap(console.log.bind(console));
  // (x) => () => fn(x): void
const specifiedLogAction: action<void> = logInvoker('Error: ...');
  //        () => fn(a): void

const read: f<string, string> = (path: string): string => fs.readFileSync(path, 'utf-8');
  // (x)    =>    fn(x): string
const fsInvoker: invoker<string, string> = wrap(read);
  // (x) => () => fn(x): stirng
const specifiedFsAction: action<string> = fsInvoker(__dirname + '/assets/data1.txt');
  //        () => fn(a): string

const binded = bind   //                  action<void>
  (specifiedFsAction) // action<string>
  (logInvoker);       //        string => action<void>

const main = binded;

/**
 * 副作用をアクションとして扱う純粋関数
 * 通常の関数を、引数をとってアクションを返す関数（invoker）にラップする。
 * 通常の関数は引数を入れると即時実行されるが、invokerには引数を入れてもまだ実行されず、
 * さらに()とすることで初めて実行される。引数適用から実行までに()が挟まっている（＝実行が遅延されている）。
 * 先に実行されたアクションに、その結果を加工する関数をバインドすることで、合成されたアクションを作れる。
 * 先行する関数はアクションとして、後続する関数はinvokerとして、この順でbind関数に入力することで得られる。
 * 最後に合成された巨大な関数（エントリーポイント）を一回だけ実行する。
 * 自力で実行せず、システムに実行してもらうのが望ましい。
 * @url https://qiita.com/hiruberuto/items/810ecdff0c1674d1a74e#fn7
 */
const pure: pure<any> = (a) => () => a;

const exec = <T>(action: a<T>): T => action();
exec(main);

type i<T, U>  = (a: T) => () => U;
type a<U>     =           () => U;

console.log(l);
}
