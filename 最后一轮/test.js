class TreeNode {
  constructor(data,left =null, right =null) {
    this.data = data
    this.left = left
    this.right = right
  }
}
let tree = {
  root: {
    data: 5,
    left: {
      data: 4,
      left: {
        data: 3
      }
    },
    right: {
      data: 4,
      left: {
        data: 3,
        left: {
          data: 2
        }
      }
    }
  }
}
function searchPath(node, target, sum = 0, result = [], stack = []) {
  if(node) {
    sum += node.data
    stack.push(node.data)
    if(sum == target) {
      result.push(stack.slice(0))
    }
    searchPath(node.left, target, sum , result , stack)
    searchPath(node.right, target, sum , result , stack)
    stack.pop()
  }
  return result
}

console.log(searchPath(tree.root, 14), 'path');

function GetLeastNumbers(input, k) {
  createHeap(input, k);
  for (let i = k; i < input.length; i++) {
    if (input[i] < input[0]) {   // 当前值比最小的k个值中的最大值小
      [input[i], input[0]] = [input[0], input[i]];
      ajustHeap(input, 0, k);
    }
  }
  return input.splice(0, k);
}

// 构建大顶堆
function createHeap(arr, length) {
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) { // 堆中，父节点为i，则子节点为2*i+1、2*i+2；反过来，知道了子节点为length,则最后一个父节点为Math.floor(length / 2) - 1。
    ajustHeap(arr, i, length); // 调整大顶堆，将最大值逐步替换成根节点
  }
}

// 调整大顶堆，从右到左，从下到上，将最大值逐步替换成根节点，当调节根节点时，对应的子节点如果发生替换，要重新调整下对应子节点，保证都满足子节点不大于父节点的条件
// 比如，当调节根节点时，[a0, a1, a2], a2> a0, a2替换a0，则要重新调节a2这个分支上的节点，保证都满足子节点不大于父节点的条件
function ajustHeap(arr, index, length) {
  for (let i = 2 * index + 1; i < length; i = 2 * i + 1) { // 父节点为i，则子节点为2*i+1
    if (i + 1 < length && arr[i + 1] > arr[i]) { // 找到子节点为2*i+1、2*i+2的最大值
      i++;
    }
    if (arr[index] < arr[i]) {
      [arr[index], arr[i]] = [arr[i], arr[index]]; // 子节点中的最大值和父节点替换位置
      index = i;
    } else {
      break;
    }
  }
}
console.log(GetLeastNumbers([2, 9, 3,6, 7, 4, 5], 5), 'get');

function heapSort(list, k) {
  for (let i = Math.floor(k/2-1); i >=0 ; i--) {
    justHeap(list, i, k)
  }
  for (let i = k; i < list.length; i++) {
    if(list[i] < list[0]) {
      [list[i] , list[0]] = [list[0] , list[i]]
      justHeap(list, 0, k)
    }
  }
  return list.splice(0, k)
}
function justHeap(list, index, k) {
  for (let i = 2*index+1; i < k; i=2*i+1) {
    if(list[i+1] > list[i]) {
      i++
    }
    if(list[i] > list[index]) {
      [list[i] , list[index]] = [list[index] , list[i]]
      index = i
    } else {
      break
    }
  }
}
console.log(heapSort([2, 9, 6, 7, 4, 5,3], 3), 'get1');

function findStrGroup(list = [], result =[], current ='', temp='' ) {
  current += temp
  if(list.length == 0) {
    return result.push(current)
  }
  for (let i = 0; i < list.length; i++) {
    temp = list.shift()
    findStrGroup(list , result, current , temp)
    list.push(temp)
  }
  return result
}
// console.log(findStrGroup('abc'.split('')));

function findTreePath(node, target, sum=0, stack=[], result=[]) {
  if(node) {
    sum += node.data
    stack.push(node.data)
    if(sum === target) {
      result.push(stack.slice())
    }
    findTreePath(node.left, target, sum, stack, result)
    findTreePath(node.right, target, sum, stack, result)
    stack.pop()
  }
  return result
}


function quickSort(list) {
  if(list.length <=1) return list
  let mid = Math.floor(list.length/2)
  let base = list.splice(mid, 1)
  let left =[]
  let right = []
  for (let i = 0; i < list.length; i++) {
    if(list[i] < base) {
      left.push(list[i])
    } else {
      right.push(list[i])
    }
  }
  return quickSort(left).concat(base, quickSort(right))
}
console.log(quickSort([33, 42, 4, 99,222, 1, 46, 3, 5]));

function arrGroup(list = [], k, current='', temp = '', result =[]) {
  if(temp) {
    current = current ? current + `,${temp}` : temp
  }
  if(current.split(',').length == k) {
    return result.push(current.split(',').map(item => Number(item)))
  }
  for (let i = 0; i < list.length; i++) {
    temp = list.shift().toString()
    arrGroup(list,k, current, temp, result)
    list.push(temp)
  }
  return result
}
// console.log(arrGroup([1,2,3,4,5], 2));

// 长度为n的数组，随机取出k个数，求多少种组合
// 思路：参考一个字符串，任意切换位置，有多少种组合
// 注意：用current存储已选择的组合，先将数组每一项转化为字符串，为了累加使用，然后再转回去
function findArrGroup(list, k, current='', temp='', result = []) {
  if(temp) {
    current = current ? current + `,${temp}` : temp //
  }
  if(current.split(',').length == k) { // 当前字符串的长度等于k
    return result.push(current.split(',').map(item => Number(item))) // 添加时再将元素转化为数字
  }
  for (let i = 0; i < list.length; i++) {
    temp = list.shift().toString()
    findArrGroup(list, k, current, temp, result)
    list.push(temp)
  }
  return result
}
// console.log(findArrGroup([1,2,3,4,5], 2));

function searchString(list, result = [], current = '', temp='') {
  current += temp
  if(!list.length) return result.push(current)
  for (let i = 0; i < list.length; i++) {
    temp = list.shift()
    searchString(list, result, current, temp)
    list.push(temp)
  }
  return result
}

// console.log(searchString('abc'.split('')));

Promise.retry = function (fn, n=0, delay=0) {
  let index = 0
  return new Promise((resolve, reject) => {
    function f() {
      index ++
      fn.then(res => {
        resolve(res)
      }).catch(err => {
        if(index === n) {
          resolve(err)
        } else {
          setTimeout(() => {
            f()
          }, delay)
        }
      })
    }
    f()
  })
}

function typeObj(obj) {
  return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
}

class Single {
  constructor(name) {
    this.name = name
  }
  static getInstance () {
    if(!this.instance) {
      this.instance = new Single(name)
    }
    return this.instance
  }
}

// 代理模式
let imgLoad = (function () {
  let img = document.querySelector('#img')
  return {
    setSrc(src) {
      img.src= src
    }
  }
})()
let proxyImgLoad = (function () {
  let img = document.createElement('img')
  img.onload = function () {
    imgLoad.setSrc(img.src)
  }
  return {
    setSrc(src) {
      img.src= src
    }
  }
})()
// proxyImgLoad.setSrc('img')

let test = {name: 1}
let proxyTest = new Proxy(test, {
  get(target, p, receiver) {
    console.log('获取');
    return Reflect.get(target,p)
  },
  set(target, p, value, receiver) {
    console.log('更新');
    return Reflect.set(target, p ,value)
  }
})
// proxyTest.name = 2
// console.log(proxyTest.name);

function fn1(val) {
  console.log(1, val);
}
function fn2() {
  console.log(2);
}
function fn3() {
  console.log(3);
}
Function.prototype.before = function (fn) {
  let self = this
  return function (val) {
    fn(val)
    self(val)
  }
}
Function.prototype.after = function (fn) {
  let self = this
  return function (val) {
    self(val)
    fn(val)
  }
}
// fn1.before(fn2).after(fn3)(5)

function myFlat (deep=1) {
  let self = this.slice()
  if(deep <=0) return self
  return self.reduce((pre, cur) => {
    if(Array.isArray(cur)) {
      return [...pre, ...cur.myFlat(deep-1)]
    } else {
      return [...pre, cur]
    }
  }, [])
}
Array.prototype.myFlat = myFlat
let manyList = [1,[2,[3,[4]]]]
let flatList1 = manyList.myFlat()
// console.log(flatList1, manyList);

function curry(fn) {
  if(fn.length <=1) return fn
  function generator(...args) {
    if(fn.length === args.length) {
      return fn(...args)
    } else {
      return (...args1) => {
        return generator(...args1, ...args)
      }
    }
  }
  return generator
}
function testFn(a,b,c,d) {return a+b+c+d}
let curryFn = curry(testFn)
console.log(curryFn(1)(2)(3)(4));

function debouce(fn, time) {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}

function throttle(fn, time) {
  let timer = null
  return function () {
    if(timer) return
    timer = setTimeout(() => {
      fn()
      timer = null
    }, time)
  }
}

function deepClone(obj, map = new WeakMap()) {
  if(!isObj(obj)) return obj
  if(map.has(obj)) return map.has(obj)
  let val = Array.isArray(obj) ? [] : {}
  map.set(obj, val)
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      let value = obj[key]
      if(isObj(value)) {
        val[key] = deepClone(value, map)
      } else {
        val[key] = value
      }
    }
  }
  return val
}
function isObj(obj) {
  return typeof obj == 'object' ? true : false
}

function observerList() {
  let imgList = document.querySelector('.img')
  let observer = new IntersectionObserver(list => {
    list.forEach(item => {
      if(item.intersectionRatio > 0) {
        let dom = item.target
        dom.src = dom.getAttribute('src-img')
        observer.unobserve(dom)
      }
    })
  })
  imgList.forEach(img => {
    observer(img)
  })
}

function myNew(Fn) {
  let obj = {}
  let instance = Fn.call(obj)
  return typeof instance ? instance : obj
}

function myClass(Fn, ...args) {
  let obj = Object.create(Fn.prototype)
  let instance = Fn.apply(obj, args)
  return typeof instance == 'object' ? instance : obj
}

function myInstance(obj, Fn) {
  let proto = obj.__proto__
  if(proto) {
    if(proto) {
      if(proto === Fn.prototype) {
        return true
      } else {
        return myInstance(proto, Fn)
      }
    }
  } else {
    return false
  }
}

function minxArr(list) {
  for (let i = 0; i < list.length; i++) {
    let index = Math.floor(Math.random() * (list.length-1))
    [list[i], list[index]] = [list[index], list[i]]
  }
  return list
}

1,1,2,3,5

function myFib(n) { // n从1开始
  if(n<=2) return 1
  let list = [1,1]
  for (let i = 2; i < n; i++) {
    list[i] = list[i-1] + list[i-2]
  }
  return list[n]
}


function selfNew (fn, ...args) {
  let obj = Object.create(fn.prototype)
  let instance = fn.apply(obj, args)
  return typeof instance == 'object' ? true : false
}
