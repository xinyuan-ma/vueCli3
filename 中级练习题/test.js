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
