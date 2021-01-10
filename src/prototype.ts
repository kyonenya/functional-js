/*
 * メソッドチェーンでログ出力（prototype拡張）
 * うまくimportできず、このファイル内でしか使えない
 * @url https://kakkoyakakko2.hatenablog.com/entry/2018/06/12/003000
 */
declare global {
  interface Object {
    log(): void;
  }
}

Object.prototype.log = function() {
  console.log(this); // getter
};

export {};

const x = 'no pointer log';
x.log();
