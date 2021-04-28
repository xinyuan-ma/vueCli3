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
 * 定义：偏函数会固定你传入的几个参数，再一次性接受剩下的参数
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

// 最简单的偏函数
function partialFn(fn, ...arg) {
  return (...arg1) => fn.apply(this, [...arg, ...arg1])
}

let f2 = partialFn(fn,1,2)
console.log(f2(3, 4));

// 支持占位符的偏函数，但只支持第一次调用的参数可以使用占位符
function partialNewFn(fn, ...arg) {
  let place = 0;
  return (...arg1) => {
    arg1.forEach(val => {
      let index = arg.findIndex(item => item === '_')
      if(index < 0) return
      arg[index] = val
      place ++
    })
    if(place.length < arg1.length) {
      arg1 = arg1.slice(place, arg1.length)
    }
    return fn.apply(this, [...arg, ...arg1])
  }
}
let f3 = partialNewFn(fn,1,2)
console.log(f3(3, 4));



/**
 * 函数防抖，应用场景搜索框输入文字后调用搜素接口
 * 原理：利用闭包，不管触发频率多高，在停止触发n秒后才会执行，如果重复触发，会清空之前的定时器，重新计时，直到最后一次n秒后执行
 * 坑点：debounce的返回值，不能是箭头函数，箭头函数的this指向定义时的执行上下文的this
 * 知识点：
 * 1、使用setTimeout后，timer值不变，只是把对应的定时器清空。所以函数执行后，要设置timer为null，以便以后调用第一次扔可以执行
 * 2、flag控制第一次是否触发
 * 3、一段时间内重复触发，会清空之前的定时器，然后重新计时
 * http://www.conardli.top/docs/JavaScript/%E9%98%B2%E6%8A%96.html#%E5%8E%9F%E7%90%86
 * */
function debounce (fn, time, flag) { // flag 控制第一次是否立即执行
  let timer = null
  return function (...args)  { // 不能返回箭头函数
    timer && clearTimeout(timer) // 在time时间段内重复执行，会清空之前的定时器，然后重新计时
    if(flag && !timer) { // flag为true 第一次默认执行
      fn.apply(this, args)
    }
    timer = setTimeout(() => { // 使用setTimeout后，timer值不变，只是把对应的定时器清空
      fn.apply(this, args)
      timer = null // 函数执行完后，初始化timer，方便下次再调用时，第一次仍然会执行
    },time)
  }
}
let debounceFn = debounce(fn, 1000, true)
debounceFn(1,2)

/**
 * 函数节流,应用场景：下拉滚动加载
 * 原理：利用闭包，不管触发频率多高，每隔一段时间内执行一次
 * 坑点：throttle的返回值，不能是箭头函数，箭头函数的this指向定义时的执行上下文的this
 * 知识点：
 * 1、利用闭包，每隔一段时间内，执行一次函数，同时重置timer
 * 2、flag控制第一次是否立即触发
 *
 * 在vue中如何使用
 * <div class="scale" @scroll="handleScroll()">
 * 正确的方式：scrollData: throttle(function () {this.makeData(this.name,this.age)}, 500, true)
 * 错误的方式：scrollData: throttle(this.makeData, 500, true) // this为undefined
 * handleScroll () {this.scrollData()},
 * makeData (a,b) {console.log(a, b, 'ab');}
 *
 * http://www.conardli.top/docs/JavaScript/%E8%8A%82%E6%B5%81.html#%E5%AE%9A%E4%B9%89
 * */
function throttle(event, time, flag) {
  let timer = null;
  return function (...args) { // 不能返回箭头函数
    if(flag && !timer) { // flag控制第一次是否立即执行
      event.apply(this, args);
    }
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        event.apply(this, args);
      }, time);
    }
  }
}


/**
 * 图片的懒加载（当图片出现在屏幕中时再加载对应的图片）
 * 原理：判断图片出现在视口时，给img.src 赋值对应的图片链接。使用IntersectionObserver 监听元素来判断是否出现了视口
 *
 * IntersectionObserver 的教程http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
 * IntersectionObserver的用法
 * 1、let observer = new IntersectionObserver( targetList=> console.log(targetList) // 通过回调函数获取元素的状态
 * 2、observer.observe(dom) // 监听元素； observer.unobserve(dom) // 取消对应的监听
 * 3、回调的数据是一个数组，表示监听的所有元素的状态; 数组中的target表示监听的dom对象
 * 4、intersectionRatio大于0，来判断元素是否出现在视口，intersectionRatio初始值为0
 * 5、元素出现和离开视口，这两种情况下都可以触发回调
 * 6、IntersectionObserver去掉了监听scroll事件来判断元素是否在视口中，性能更高
 * 7、IntersectionObserver的兼容性还好，高版本的浏览器都已支持
 *
 * http://www.conardli.top/docs/JavaScript/%E5%9B%BE%E7%89%87%E6%87%92%E5%8A%A0%E8%BD%BD.html#intersectionobserver
 * */

// html内容 <img src="loading.gif" data-src="https://img-pub01.visitshanghai.com.cn/district_chongming.jpg" alt="">
function observerImg() {
  let imgList = document.getElementsByTagName('img') // 获取所有的图片元素
  let observer = new IntersectionObserver(list => { // 回调的数据是一个数组
    list.forEach(item => {
      if(item.intersectionRatio > 0) { // 判断元素是否出现在视口
        item.target.src = item.target.getAttribute('data-src') // 设置img的src属性
        observer.unobserve(item.target) // 设置src属性后，停止监听
      }
    })
  })
  for (let i = 0; i < imgList.length; i++) {
    observer.observe(imgList[i]) // 监听每个img元素
  }
}

/**
 * new 关键字
 *
 * js的new操作符到底做了什么？
 * 1、生成一个对象
 * 2、该对象的原型指向构造函数的原型
 * 3、调用构造函数，构造函数的this指向生成的对象
 * 4、判断构造函数是否有返回值，如果有返回值则返回值是一个对象，则返回该值；否则返回新生成的对象
 *
 *  构造函数有返回值的案例：
 * function Dog(name) { this.name = name return {test:1} }
 * let obj = new Dog('ming') // obj为 {test:1}
 * 备注：如果返回值不是一个对象，则返回构造函数的实例
 * new关键字的教程 https://juejin.cn/post/6844903937405878280
 * */
const selfNew = function (fn, ...args) {
  let instance = Object.create(fn.prototype) // 创建一个对象，该对象的原型是fn.prototype
  let res = fn.apply(instance, args) // 调用构造函数，this指向新生成的对象，给新生成的对象上添加对应的属性
  return res instanceof Object ? res : instance // 如果fn函数有返回值，并且返回值是一个对象，则返回该对象，否则返回新生成的对象
}

/**
 * 实现instanceof 判断对象是否为该构造函数的实例
 * obj instanceof Object :表示Object的prototype是否在obj的原型链上
 * */
function isInstance(obj, origin) {
  let proto = obj.__proto__;
  if(proto) {
    if(proto === origin.prototype) {
      return true
    } else {
      return isInstance(proto, origin)
    }
  } else {
    return false
  }
}
function Dog() {}
let dog = new Dog()
console.log(isInstance(dog, Dog), isInstance(dog, Object)); // true true

/**
 * 洗牌算法
 * */
function disorder(arr) {
  for (let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * (arr.length-1)); // 获取随机数
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]; // 交互位置
  }
  return arr
}

console.log(disorder([1,2,3,4,5, 6, 7, 8]));

/**
 * 单例模式
 * */
class Single {
  constructor(name) {
    this.name = name
  }
  static getInstance (name) {
    if(!this.instance) {
      this.instance = new Single(name)
    }
    return this.instance
  }
}

let instance1 = Single.getInstance('1')
let instance2 = Single.getInstance('2')
console.log(instance1 === instance2);


/**
 * 优雅处理async await
 * 备注：以后所有使用async await的地方都要加上try catch
 * 查看案例1，当promise 发生错误返回reject时, async await 没有then函数，无法捕获异常，所以要使用try catch捕获错误
 * */

// 案例1
let p = new Promise((resolve, reject) => {
  reject(1)
})
async function tryFn() {
  try {
    let res = await p
  } catch (e) {
    console.log(e, 'e');
  }
}
tryFn()

// 优雅处理
async function capture(promise) {
  try {
    let res = await promise
    return [null, res]
  } catch (e) {
    return [e, null]
  }
}
async function fnc () {
  let [err, res] = await capture(p)
  console.log(err, res, 'res');
}
fnc()
