{
let l = 'End';

/** Function.prototype.bind */
const multiple = (a: number, b: number) => a * b;
const getTaxed = multiple.bind(null, 1.1);
getTaxed(100); // 110

/** 
 * partial application
 */
const partial1 = (fn: Function, ...args: unknown[]) => {
  return fn.bind(undefined, args[0]);
};
const getPrevTaxed = partial1(multiple, 1.05);
getPrevTaxed(100); // 105

const partial2 = (fn: Function, ...args: unknown[]) => {
  const bound1 = fn.bind(undefined, args[0]);
  return bound1.bind(undefined, args[1]);
};

/** apply any number of arguments */
const partial = (fn: Function, ...args: unknown[]) => {
  return args.reduce((acc: Function, arg) => {
    acc = acc.bind(undefined, arg);
    return acc;
  }, fn);
};

const logger3 = (a: unknown, b: unknown, c: unknown) => console.log(a, b, c)
const logWithParams = (partial(logger3, '2020/1/10', 'Error'));
logWithParams(404); // -> 2020/1/10 Error 404

console.log(l);
}
