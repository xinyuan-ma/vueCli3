/**
 * 判断数据类型
 * */
function isType(target) {
  return Object.prototype.toString.call(target).slice(8,-1) // -1 表示最后一位
}
console.log(isType({}),isType([]),isType(new Date()), isType(new Set())); // Object Array Date Set

/**
 * 循环实现数组map方法(完整方法)
 * Array.prototype.slice.call(arguments) 将类数组转化为数组 https://www.cnblogs.com/wphl-27/p/10336591.html
 * */
const selfMap = function (fn,content) { // map中的第二个参数作为fn函数的this
  let arr = Array.prototype.slice.call(this) // 将类数组转化为数组，同Array.from, this为调用的数组（arr）
  let mappedArr = Array() // 创建一个空数组
  for (let i = 0; i < arr.length; i++) {
    // 判断稀疏数组的情况，跳过稀疏数组中的空值
    if(!arr.hasOwnProperty(i)) continue; // 稀疏数组：数组中元素的个数小于数组的长度，比如Array(2) 长度为2的稀疏数组
    mappedArr[i] = fn.call(content,arr[i])
  }
  return mappedArr
}
Array.prototype.selfMap = selfMap;
let arr = [1,2,3]
console.log(arr.selfMap(item => item * 2));

// 简易版
function myMap(fn) {
  let arr = []
  for (let i = 0; i < this.length; i++) {
    if(!this[i]) continue; // 判断稀疏数组的情况，跳过稀疏数组中的空值
    arr[i] = fn.call('',this[i])
  }
  return arr
}
Array.prototype.myMap = myMap;
let ar1 = Array(2) // 创建一个长度为2的稀疏数组
ar1.push(1)
console.log(ar1.myMap(item => item * 3));

/**
 * 使用reduce实现map方法
 * reduce方法介绍，如果提供了initialValue时，则作为pre的初始值，index从0开始； 如果没有提供initialValue，则数组中的第一项作为pre, index从1开始(pre作为累加器)
 * arr.reduce((pre, cur, index) => {}, initialValue)
 * */
function mapUseReduce(fn, context) {
  return this.reduce((pre, cur, index) => { // this表示调动的arr
    pre[index]= fn.call(context,cur)
    return pre // pre作为累加器
  },[]) // reduce函数提供初始值[], pre的初始值为[],
}
Array.prototype.mapUseReduce = mapUseReduce;
console.log([1, 2,,, 3].mapUseReduce(item => item + 1));

/**
 * 实现filter
 * */
function myFilter(fn) {
  let arr = []
  for (let i = 0; i < this.length; i++) {
    fn(this[i]) && arr.push(this[i])
  }
  return arr
}
Array.prototype.myFilter = myFilter;
console.log([,,1, 2, 3, -1].myFilter(item => item > 1));

/**
 * 用reduce实现filter
 * */
function filterUseReduce(fn) {
  return this.reduce((pre, cur) => { // this表用调用的arr
    return fn(cur) ? [...pre, cur] : pre
  }, [])
}
Array.prototype.filterUseReduce = filterUseReduce;
console.log([,,1, 2, 3, -1].filterUseReduce(item => item > 1));

console.log([1, 2, 3, 4].some(item => item > 3));

/**
 * 实现some方法
 * */
function mySome(fn) {
  let result = false
  for (let i = 0; i < this.length; i++) {
    if(fn(this[i])) {
      result = true
      break
    }
  }
  return result
}
Array.prototype.mySome = mySome;
console.log([1, 2, 3, 4].mySome(item => item > 3));


/**
 * 实现reduce方法，重点在于处理initialValue(reduce的第二个参数，初始值)
 * hasOwnProperty 用来判断对象中是否有该属性，即便该属性为null或undefined, 这里用来判断稀疏数组中的空值
 * 如 arr = Array(1); arr.hasOwnProperty(0) 为false; arr.push(undefined) arr.hasOwnProperty(1) 为true
 * */
function myReduce(fn, initialValue) {
  let pre,index;
  if(initialValue === undefined) {
    for (let i = 0; i < this.length; i++) { // 找到数组中第一个存在的元素，跳过稀疏数组中的空值
      if(!this.hasOwnProperty(i)) continue;
      pre = this[i] // pre 为数组中第一个存在的元素
      index = i+1 // index 下一个元素
      break // 重点：找到后，记得跳出循环
    }
  } else {
    index = 0;
    pre = initialValue
  }
  console.log(pre, index);
  for (let i = index; i < this.length; i++) {
    if(!this.hasOwnProperty(i)) continue; // 跳过稀疏数组中的空值
    pre = fn.call(null, pre, this[i])
  }
  return pre
}
Array.prototype.myReduce = myReduce;
console.log([,,,1, 2, 3, 4].myReduce((pre, cur) => pre + cur));


/**
 * 实现flat 数组扁平化
 * flat的基本用法 arr = [1,[2,3],[4,5]]  let a1 = arr.flat(1) // flat默认参数为1，返回一个新的数组
 * 多层数组时，arr.flat(Infinity) 参数为Infinity时，无论数组多少层，都可以转化为一维数组
 * */

function myFlat(deep = 1) {
  let arr = this
  if(deep == 0) return arr
  return arr.reduce((pre,cur) => {
    if(Array.isArray(cur)) {
      return [...pre, ...myFlat.call(cur, deep -1)]
    } else {
      return [...pre, cur]
    }
  }, [])
}
Array.prototype.myFlat = myFlat;
console.log([1, 2, 3, [4,5]].myFlat((pre, cur) => pre + cur));

/**
 * 实现flat方法的两种方式
 * 方法1 使用concat方法进行拼接，concat() 参数可以是数组，也可以是元素 list.concat([1,2]) 或 list.concat(3)
 * 方法2 使用es6的数组解构 [...pre]
 *
 * 知识点：
 * 1）reduce参数说明，第一个参数是fn，第二个为初始值，fn中pre为累计值，cur表示当前元素
 * 2）flat的默认值为1， 当传入Infinity时，可以将无论多少层级的数组都转化为一维数组，Infinity表示无穷大，Infinity >0 为true
 * */
// 使用 reduce、concat 和递归展开无限多层嵌套的数组
var arr1 = [1, 2, 3, [2, 3, 4], [1, [8, 9]]];

function flatDeep(arr, d = 1) {
  console.log(d > 0, d, 'Infinity');
  return d > 0 ? arr.reduce((acc, val) =>
      acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
    [])
    : arr.slice();
};
console.log(flatDeep(arr1, 3));

// console.log(flatDeep(arr1, Infinity));

function myFlat(deep = 1) { // flat的默认值为1
  let arr = this.slice() // 浅拷贝一个数组
  if (deep == 0) return arr // 跳出递归的条件
  return arr.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      return [...pre, ...myFlat.call(cur, deep - 1)] // 注意使用call方法，要绑定this
    } else {
      return [...pre, cur]
    }
  }, [])
}

Array.prototype.myFlat = myFlat;
console.log(arr1.myFlat(Infinity));

/**
 * 实现es6的class
 * 知识点：
 * 1、es6 class extends 其实就是寄生组合继承
 * 2、Object.create（obj） 创建一个对象，该对象的原型是obj
 *   Object.create(obj,{constructor})方法，第二个参数可以设置对象上的属性描述符，设置constructor，可以取代这行代码 Child.prototype.constructor = Child
 * 3、subType.prototype = Object.create(subType.prototype, {constructor}) 子类继承父类原型上的属性和方法
 * 4、Object.setPrototypeOf(subType, superType) 作用 将subType的原型设置成superType，用来继承父类的静态属性和静态方法
 * */
function myInherit(subType, superType) {
  subType.prototype = Object.create(subType.prototype, { // 子类继承父类原型上的属性和方法
    constructor: {
      enumerable: false,
      configurable: false,
      writable: true,
      value: subType
    }
  })
  Object.setPrototypeOf(subType, superType)
}


let person = {
  name: 'per',
  fn() {
  }
}

// Object.create 创建一个对象，该对象的原型为第一个参数，第二个参数是指定创建对象的属性描述符
let pr = Object.create(person, {
  name: {
    writable: false,
    value: 'pr'
  }
})
pr.name = 'new'
console.log(pr);
console.log(pr.name);

let person1 = {
  name1: 'pre1'
}
// 修改一个对象的原型到另一个对象上
Object.setPrototypeOf(pr, person1)
console.log(pr);


let curry = function (fn) {
  let args = [].slice.call(arguments, 1); // 去掉第一个参数
  console.log(args);
  return function () {
    console.log(arguments, [].slice.call(arguments), 'arguments');
    let newArgs = args.concat([].slice.call(arguments))
    console.log(newArgs, this, 'newArgs');
    return fn.apply(this, newArgs)
  }
}

function add(a, b) {
  return a + b
}

let addCurry = curry(add, 1)
// console.log(addCurry, 'addCurry');
// console.log(addCurry(2));


function inherit(Child,Parent) {
  Child.prototype = Object.create(Parent.prototype, { // 继承父类原型上的属性和方法
    constructor: {
      enumerable: false, // 不可遍历
      writable:true,
      configurable: true,
      value: Child
    }
  })
  Object.setPrototypeOf(Child, Parent) // 继承父类的静态属性和方法
}
function Child() {}
function Parent() {}
inherit(Child,Parent)


/**
 * 函数柯里化：将使用多个参数的一个函数转换成一系列使用一个参数的函数
 * 柯里化函数的原理：用闭包把参数保存起来，当参数的数量等于原函数时，就开始执行原函数
 * 知识点， 柯里化的教程https://github.com/mqyqingfeng/Blog/issues/42
 * 1、函数的length属性，表示形参的个数，不包含剩余参数，仅包括第一个有默认值之前的参数个数， https://blog.csdn.net/u010176097/article/details/97257375
 *
 * */
function mycurry(fn) {
  if(fn.length <=1) return fn // fn.length 表示函数中参数的长度
  const generator = (...args) => {
    if(fn.length === args.length) {
      return fn(...args)
    } else {
      return (...args1) => {
        return generator(...args, ...args1)
      }
    }
  }
  return generator
}
function fn(a,b,c,d) {
  return a + b + c +d
}
let fn1 = mycurry(fn)
console.log(fn1(1)(2)(3)(4));

/**
 * 偏函数
 * */
const partialFunc = (func, ...args) => {
  let placeholderNum = 0
  return (...arg2) => {
    arg2.forEach(arg => {
      let index = args.findIndex(item => item === '_')
      if(index < 0) return
      args[index] = arg
      placeholderNum++
    })
    if(placeholderNum < arg2.length) {
      arg2 = arg2.slice(placeholderNum, arg2.length)
    }
    return func.apply(this, [...args, ...arg2])
  }
}

let partial = partialFunc(fn, 1,2)
console.log(partial(3, 4));

[1,3,3,4].forEach(item => {
  console.log(item);
  if(item > 2) {
    return
  }
  console.log(11);
})
