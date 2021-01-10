{
let l;
// right curry
const curry2 = (fn: Function) => {
  return (second: unknown) => {
    return (first: unknown) => {
      return fn(first, second);
    }
  }
};

const toTuple = (first: string, last: string) => [first, last];

const name = curry2(toTuple);
const addLastName = name('Last'); // start by last (right)
const fullName = addLastName('First');
console.log(fullName); // -> [First, Last]

/** 
 * factory pattern
 */
// insert id to Db or to Array
let useDb = false;
const db = { DAO: '...' };

// interface
type IInsertId = (id: number) => string;

// implements                   common    variation
const  insertIdtoDb = curry2((id: number, db: any) => `id: ${id} Inserted`);
const insertIdtoArr = curry2((id: number, array: number[]) => [...array, id].toString());

insertIdtoArr([1, 2])(3); // -> [1, 2, 3]
const insertIdToSpecifiedArr = insertIdtoArr([1, 2]);
insertIdToSpecifiedArr(3); // [1, 2, 3]

// polymorphic functon
const insertId: IInsertId = useDb
  ? insertIdtoDb(db) // -> Function (owing to curry2)
  : insertIdtoArr([1, 2, 3]); // -> Function

insertId(4); // -> Inserted to Db or to Array

console.log(l);
}
