let l;

const toInt = (numStr: string) => parseInt(numStr);
const taxize = (price: number) => price * 1.1;
taxize(toInt('100')); // 110

const compose2 = (fn1: Function, fn2: Function) => {
  return (x: unknown) => fn1(fn2(x));
};

// from right to left
const strToTax = compose2(taxize, toInt);
strToTax(100).log();

console.log(l);
