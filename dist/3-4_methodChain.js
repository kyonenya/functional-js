"use strict";
/**
 * メソッドチェーンをクロージャで実装
 * @url https://mnivore.com/blogs/archives/49
 */
const SimpleCalc = () => {
    let val = 0;
    return {
        add: function (num) {
            val += num;
            // 値ではなくこの関数自身への参照を返す
            return this;
        },
        val: () => val,
    };
};
const simpleCalc = SimpleCalc();
simpleCalc
    .add(3)
    .add(4)
    .add(5);
const result = simpleCalc
    .val(); // 遅延実行
console.log(result); // -> 12
