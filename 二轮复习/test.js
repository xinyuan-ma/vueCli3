// 手写call
Function.prototype.selfCall = function (target, ...args) {
  let self = this
  target = target || window
  let symbol = Symbol()
  target[symbol] = self
  let result = target[symbol](...args)
  delete target[symbol]
  return result
}

// 手写apply
Function.prototype.selfApply = function (target, args) {
  let self = this
  target = target || window
  let symbol = Symbol()
  target[symbol] = self
  let result = target[symbol](...args)
  delete target[symbol]
  return result
}

// 手写bind
Function.prototype.selfBind = function (target, ...args) {
  let self = this
  target = target || window
  let symbol = Symbol()
  target[symbol] = self
  let result = () => {
    target[symbol](...args)
  }
  delete target[symbol]
  return result
}
let obj = {name: 'yuan'}

function fn() {
  // console.log(this.name);
  return this.name
}

let f1 = fn.bind(obj)
// console.log(f1(), obj);

// 使用call 实现bind
Function.prototype.bindUseCall = function (target, ...args) {
  let self = this
  return () => {
    self.call(target, ...args)
  }
}

let obj1 = Object.create(obj)
// console.log(obj1.__proto__ === obj); // true

// 手写create 利用了寄生组合基础的原理
function create(obj) {
  function Fn() {
  }

  Fn.prototype = obj
  return new Fn()
}

let obj2 = create(obj)
// console.log(obj1.__proto__ === obj); // true

// 寄生组合继承
function Parent(name) {
  this.name = name
}

Parent.prototype.getName = function () {
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

// es6 extends
class Par {
  constructor(name) {
    this.name = name
  }
}

class Cld extends Par {
  constructor() {
    super();
  }
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

// es6 class
class Person {
  constructor() {
  }

  static getName() { // 静态方法，只能通过构造函数调用
    // console.log(1111);
  }
}

let per1 = new Person()

// console.log(per1)

class Type { // 构造函数，属性的简写
  name = '12'
  age = '213'
}

let type = new Type()
// console.log(type);

// 手写promise
class Promise1 {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.resolveList = []
    this.rejectList = []
    this.finallyList = []
    let resolve = value => {
      if (this.state == 'pending') {
        this.state = 'fulfilled'
        this.value = value
        if (this.resolveList.length > 0) {
          this.resolveList.forEach(fn => fn(value))
        }
        if (this.finallyList.length > 0) {
          this.finallyList.forEach(fn => fn(value))
        }
      }
    }
    let reject = reason => {
      if (this.state == 'pending') {
        this.state = 'rejected'
        this.reason = reason
        if (this.rejectList.length > 0) {
          this.rejectList.forEach(fn => fn(reason))
        }
        if (this.finallyList.length > 0) {
          this.finallyList.forEach(fn => fn(reason))
        }
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(fn) {
    if (this.state == 'pending') {
      this.resolveList.push(fn)
    } else if (this.state == 'fulfilled') {
      fn(this.value)
    }
    return this
  }

  catch(fn) {
    if (this.state == 'pending') {
      this.rejectList.push(fn)
    } else if (this.state == 'rejected') {
      fn(this.reason)
    }
    return this
  }

  finally(fn) {
    if (this.state == 'pending') {
      this.finallyList.push(fn)
    } else {
      fn(this.value ? this.value : this.reason)
    }
  }
}

let p = new Promise1((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  })
})
// p.then(res => {
//   console.log(res);
// }).catch(err=> {
//   console.log(err, 'err');
// }).finally(fia => {
//   console.log(fia, 'fia');
// })

// 深拷贝
function deepClone(target, hash = new WeakMap()) {
  if (!isObject(target)) return target
  if (hash.get(target)) return hash.get(target) // 解决重复引用和引用自身的情况
  let obj = Array.isArray(target) ? [] : {}
  hash.set(target, obj)
  for (const key in target) {
    if (target.hasOwnProperty(key)) { // 不拷贝原型上的方法
      if (isObject(target[key])) {
        obj[key] = deepClone(target[key], hash)
      } else {
        obj[key] = target[key]
      }
    }
  }
  return obj
}

function isObject(target) {
  return typeof target === 'object' && target !== null
}

let target = {
  a: {
    b: 1
  },
  arr: [{name: 'ming'}]
}
target.target = target
let target1 = deepClone(target)
target.a.b = 2
target.arr[0].name = 'ls'
// console.log(target, target1);

// 判断变量类型
function targetType(target) {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

// console.log(targetType(Symbol()), targetType([]), targetType(null));


// sleep 函数
function sleep(time) {
  let start = new Date().getTime() + parseInt(time)
  while (new Date().getTime() < start) {
  }
}

// sleep(2000);
function sleep1(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

(async function (time) {
  await sleep1(time)
  // console.log('暂停2s');
})(2000)


// plugin
class MyPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('myplugin', () => {
      console.log('myplugin');
    })
  }
}

function loader(source) {
  let style = `
  let style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = ${source};
  document.head.appendChild(style);
  `
  return style
}

function BabelPlugin(babel) {
  let t = babel.types
  return {
    visitor: {
      VariableDeclarator(path) {
        if (path.node.id.name == 'a') {
          path.node.id = t.Identifier('b')
        }
      }
    }
  }
}

// 算法
// 二叉树
function Node(data, left = null, right = null) {
  this.data = data
  this.left = left
  this.right = right
}

Node.prototype = {
  show() {
    console.log(this.data);
  }
}

function Tree() {
  this.root = null
}

Tree.prototype = {
  insert(data) {
    let node = new Node(data)
    if (!this.root) {
      this.root = node
      return
    }
    let current = this.root
    let parent = null
    while (current) {
      parent = current
      if (data < parent.data) {
        current = current.left
        if (!current) {
          parent.left = node
          return;
        }
      } else {
        current = current.right
        if (!current) {
          parent.right = node
          return;
        }
      }
    }
  },
  preOrder(node) {
    if (node) {
      node.show()
      this.preOrder(node.left)
      this.preOrder(node.right)
    }
  },
  midOrder(node) {
    if (node) {
      this.midOrder(node.left)
      node.show()
      this.midOrder(node.right)
    }
  },
  afterOrder(node) {
    if (node) {
      this.afterOrder(node.left)
      this.afterOrder(node.right)
      node.show()
    }
  },
  getMin() {
    let current = this.root
    while (current) {
      if (!current.left) {
        return current
      }
      current = current.left
    }
  },
  getMax() {
    let current = this.root
    while (current) {
      if (!current.right) {
        return current
      }
      current = current.right
    }
  },
  getDeep(node, deep = 0) {
    if (!node) {
      return deep
    }
    let left = this.getDeep(node.left, deep)
    let right = this.getDeep(node.right, deep)
    return Math.max(left, right)
  }
}

let t = new Tree()
let t1 = new Tree()
let nums = [5, 3, 4, 1, 6]
for (let i = 0; i < nums.length; i++) {
  t.insert(nums[i])
  t1.insert(nums[i])
}

// console.log(t, t1, 't');

function preOrder(node, arr = []) {
  if (node) {
    arr.push(node.data)
    preOrder(node.left, arr)
    preOrder(node.right, arr)
  }
  return arr
}

// 中序遍历
function midOrder(node, arr = []) {
  if (node) {
    midOrder(node.left, arr)
    arr.push(node.data)
    midOrder(node.right, arr)
  }
  return arr
}

function afterOrder(node, arr = []) {
  if (node) {
    afterOrder(node.left, arr)
    afterOrder(node.right, arr)
    arr.push(node.data)
  }
  return arr
}

// console.log(preOrder(t.root));
// console.log(afterOrder(t.root));

var middleTraversal = function (root) {
  const result = []
  const stack = []
  let current = root
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack.shift()
    result.push(current.data)
    current = current.right
  }
  return result
};

function midTraversal(root) {
  let result = []
  let stack = []
  let current = root
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    result.push(current.data)
    current = current.right
  }
  return result
}

function preTraversal(root) {
  let result = []
  let stack = []
  let current = root
  while (current || stack.length > 0) {
    while (current) {
      result.push(current.data)
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    current = current.right
  }
  return result
}

// console.log(midTraversal(t.root));

// 重建二叉树
function rebuild(pre, mid) {
  if (pre.length == 0) return null
  if (pre.length == 1) return new Node(pre[0])
  let root = pre[0]
  let index = mid.indexOf(root)
  let preLeft = pre.slice(1, index + 1)
  let preRight = pre.slice(index + 1)
  let midLeft = mid.slice(0, index)
  let midRight = mid.slice(index + 1)
  let node = new Node(root)
  node.left = rebuild(preLeft, midLeft)
  node.right = rebuild(preRight, midRight)
  return node
}

let pre = [1, 2, 4, 7, 3, 5, 6, 8]
let mid = [4, 7, 2, 1, 5, 3, 8, 6]
// console.log(rebuild(pre, mid), 123);

// 判断二叉树是否对称 只有所有的节点比对完，最后一层的节点都不存在的情况下 二叉树才是对称的
function isSame(node1, node2) {
  if (!node1 && !node2) {
    return true
  }
  if (!node1 || !node2) {
    return false
  }
  if (node1.data != node2.data) {
    return false
  }
  return isSame(node1.left, node2.right) && isSame(node1.right, node2.left)
}

// console.log(isSame(t.root, t1.root));

// 序列化 注意：所有的节点下不存在的节点序列化为#
// 先序遍历[2,1,3] 序列化后的值为 2,1，#，#，3,#,#
function serialize(node, arr = []) {
  if (!node) {
    return arr.push('#')
  }
  arr.push(node.data)
  serialize(node.left, arr)
  serialize(node.right, arr)
  return arr.join(',')
}

// console.log(serialize(t.root), 'serialize');

// 反序列化
function deTravel(arr) {
  let node = null
  let current = arr.shift()
  if (current != '#') {
    node = {data: current}
    node.left = deTravel(arr)
    node.right = deTravel(arr)
  }
  return node
}

// console.log(deTravel([5, 3, 1, "#", "#", 4, "#", "#", 6, "#", "#"]));

function reservel(node, arr = []) {
  if (!node) {
    return arr.push('#')
  }
  arr.push(node.data)
  reservel(node.left, arr)
  reservel(node.right, arr)
  return arr
}

// console.log(reservel(t.root));

function deServel(arr) {
  let node = null
  let current = arr.shift()
  if (current != '#') {
    node = {data: current}
    node.left = deServel(arr)
    node.right = deServel(arr)
  }
  return node
}

// console.log(deServel([5, 3, 1, "#", "#", 4, "#", "#", 6, "#", "#"]));

function getDeep(node, deep = 0) {
  if (!node) return deep
  deep++
  let left = getDeep(node.left, deep)
  let right = getDeep(node.right, deep)
  return Math.max(left, right)
}

// console.log(getDeep(t.root));
// 找到和为某一直的路径

function findPath(root, target) {
  let result = []
  if (root) {
    searchPath(root, target, result)
  }
  return result
}

function searchPath(root, target, result, sum = 0, stack = []) {
  sum += root.data
  stack.push(root.data)
  if (sum === target) {
    result.push(stack.slice(0))
  }
  if (root.left) {
    searchPath(root.left, target, result, sum, stack)
  }
  if (root.right) {
    searchPath(root.right, target, result, sum, stack)
  }
  stack.pop()
}

// console.log(findPath(t.root, 8));

// 链表
function LinkNode(data) {
  this.data = data
  this.next = null
}

class LinkList {
  constructor() {
    this.count = 0 // 链表长度
    this.head = null
  }

  push(data) {
    let node = new LinkNode(data)
    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }

  insert(data, index) {
    if (index >= 0 && index <= this.count) {
      let node = new LinkNode(data)
      let current = this.head
      if (index == 0) {
        this.head = node
        this.head.next = current
      } else {
        for (let i = 0; i < index - 1; i++) {
          current = current.next
        }
        let next = current.next
        current.next = node
        node.next = next
      }
      this.count++
      return true
    } else {
      return false
    }
  }

  getIndex(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      for (let i = 0; i < index; i++) {
        current = current.next
      }
      return current
    } else {
      return null
    }
  }

  removeNode(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index == 0) {
        this.head = current.next
      } else {
        for (let i = 0; i < index - 1; i++) {
          current = current.next
        }
        current.next = current.next.next
      }
      this.count--
      return true
    } else {
      return false
    }
  }

  getDataIndex(data) {
    let current = this.head
    for (let i = 0; i < this.count; i++) {
      if (current.data === data) {
        return i
      }
      current = current.next
    }
  }

  toString() {
    let str = ''
    let current = this.head
    for (let i = 0; i < this.count; i++) {
      str += `${current.data},`
      current = current.next
    }
    return str.substring(0, str.length - 1)
  }
}

const link = new LinkList()
link.push(1)
link.push(2)
link.push(3)
link.push(4)
// console.log(link);
// console.log(link.toString());

// 从头到尾打印链表
function getLinkData(node, arr = []) {
  while (node) {
    arr.push(node.data)
    node = node.next
  }
  return arr
}

// 从尾到头打印链表
function reverseLinkData(node, arr = []) {
  while (node) {
    arr.unshift(node.data)
    node = node.next
  }
  return arr
}

// console.log(getLinkData(link.head));
// console.log(reverseLinkData(link.head));

// 反转链表跳过

// 查找链表中是否有环，找到对应环的入口
function findLinkLoop(head) {
  if (!head || !head.next) return null
  let p1 = head.next
  let p2 = head.next.next
  while (p1 != p2) {
    if (p1 == null) return null
    p1 = p1.next
    p2 = p2.next.next
  }
  let temp = p1
  let length = 1
  p1 = p1.next
  while (p1 != temp) {
    p1 = p1.next
    length++
  }
  p1 = p2 = head
  while (length-- > 0) {
    p2 = p2.next
  }
  while (p1 != p2) {
    p1 = p1.next
    p2 = p2.next
  }
  return p1
}

function makeLinkLoop(head) { // 制造一个环
  let lastNode = link.getIndex(link.count - 1)
  let secondNode = link.getIndex(1)
  // console.log(lastNode, secondNode);
  lastNode.next = secondNode
}

makeLinkLoop(link.head)
// console.log(findLinkLoop(link.head));

// 约瑟夫环问题 一个环  n从0开始,每隔m个数删除第m个数
function findLastNode(n, m) {
  if (n < 1 || m < 1) return null
  let head = {data: 0}
  let current = head
  for (let i = 1; i < n; i++) { //生成一个链表
    current.next = {data: i}
    current = current.next // 将next下一项赋值给current
  }
  current.next = head // 形成闭环（此时current为最后一项）
  // console.log(head);
  while (current != current.next) { // 只剩最后一个节点时， current 等于 current.next，跳出while循环
    for (let i = 0; i < m - 1; i++) { // 找到要删除元素的前一个元素，所以范围是m-1
      current = current.next
    }
    current.next = current.next.next // 将m-1位的next指向m+1位的元素，删除第m个元素
  }
  return current.data
}

// console.log(findLastNode(5, 3));

// 数组
// 将正整数数组中，所有的数字组合起来形成一个整数，要求这个整数是所有组合中最小的一个
// 其实就是ab 和 ba比较
function printMinNumber(arr) {
  if (!arr || arr.length == 0) return null
  return arr.sort((a, b) => {
    let first = `${a}${b}`
    let second = `${b}${a}`
    return first - second
  }).join('')
}

// console.log(printMinNumber([3, 32, 321]));

let str = 'abcabcde'

// 找到字符串中第一个不重复字母的下标
function findFirstAlone(str) {
  if (!str) return -1
  let map = {}
  let arr = str.split('')
  arr.forEach(item => {
    let value = map[item]
    map[item] = value ? value + 1 : 1
  })
  for (let i = 0; i < arr.length; i++) {
    if (map[arr[i]] == 1) return i
  }
}

// console.log(findFirstAlone(str));

// 正整数数组，将奇数放到数组的前半部分，偶数放到数组的后半部分
function exchangeArr(arr) {
  let start = 0
  let end = arr.length - 1
  while (start < end) {
    while (arr[start] % 2 == 1) { // 如果是奇数，继续向后执行,一直到找到第一个不是奇数的下标
      start++
    }
    while (arr[end] % 2 == 0) { // 如果是偶数，继续向前执行,一直到找到第一个不是偶数的下标
      end--
    }
    if (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]]
    }
  }
  return arr
}

// console.log(exchangeArr([1, 4, 6, 3, 8, 9]));

// 输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S
function findNumbersWithSum(arr, sum) {
  let start = 0
  let end = arr.length - 1
  while (start < end) {
    let count = arr[start] + arr[end]
    if (count < sum) {
      start++
    } else if (count > sum) {
      end--
    } else if (count == sum) {
      return [arr[start], arr[end]]
    }
  }
}

// console.log(findNumbersWithSum([1, 2, 3, 4, 5, 6, 7, 8, 9], 11), 'number');

// 输入一个正数S，打印出所有和为S的连续正数序列。例如：输入15，有序1+2+3+4+5 = 4+5+6 = 7+8 = 15 所以打印出3个连续序列1-5，4-6和7-8
function findGroup(target) {
  let arr = [1, 2]
  let small = 1
  let big = 2
  let sum = 3
  let result = []
  while (big < target) {
    while (sum < target && big < target) {
      arr.push(++big)
      sum += big
    }
    while (sum > target && small < big) {
      arr.shift()
      sum -= small
      small++
    }
    while (sum === target && arr.length > 1) {
      result.push(arr.slice(0))
      arr.push(++big)
      sum += big
    }
  }
  return result
}

// console.log(findGroup(15));

// 数组 两数之和等于target
function twoAdd(arr, target) {
  let map = {}
  for (let i = 0; i < arr.length; i++) {
    if (map[target - arr[i]] != undefined) {
      return [map[target - arr[i]], i]
    } else {
      map[arr[i]] = i
    }
  }
}

// console.log(twoAdd([1, 2, 3, 4, 5], 8));


// 三数之和
function findThree(arr, target) {
  arr.sort()
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (i && arr[i] === arr[i - 1]) continue; // 跳过循环的元素，因为arr[i-1]这种情况已经查找完毕，无需再查找
    let left = i + 1
    let right = arr.length - 1
    while (left < right) {
      let sum = arr[i] + arr[left] + arr[right]
      if (sum < target) {
        left++
      } else if (sum > target) {
        right--
      } else {
        result.push([arr[i], arr[left++], arr[right--]]) // 找到符合的元素后，left向后移动，right向前移动
        while (arr[left] === arr[left - 1]) { // 跳过重复的元素，因为这种情况已经统计了
          left++
        }
        while (arr[right] === arr[right + 1]) { // 跳过重复的元素，因为这种情况已经统计了
          right--
        }
      }
    }
  }
  return result
}

// console.log(findThree([1,2,3,2,4,5,6,2,3,5,7], 11), 'result');

// 找到数组中重复的元素的个数超过数组长度一半的元素
function findHalfLength(arr) {
  let map = {}
  for (let i = 0; i < arr.length; i++) {
    let value = map[arr[i]]
    map[arr[i]] = value ? value + 1 : 1
    if (map[arr[i]] > arr.length / 2) {
      return arr[i]
    }
  }
  return null
}

// console.log(findHalfLength([1, 2, 2, 2, 2, 3, 3, 3,2]));

function sum1(n) {
  return n ? sum1(n - 1) + n : 0
}

// console.log(sum1(3));

function findThr(arr, target) {
  arr.sort()
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (i && arr[i] === arr[i - 1]) continue;
    let left = i + 1
    let right = arr.length - 1
    while (left < right) {
      let sum = arr[i] + arr[left] + arr[right]
      if (sum < target) {
        left++
      } else if (sum > target) {
        right--
      } else {
        result.push([arr[i], arr[left++], arr[right--]])
        while (arr[left] === arr[left - 1]) {
          left++
        }
        while (arr[right] === arr[right + 1]) {
          left--
        }
      }
    }
  }
  return result
}

// console.log(findThr([1, 2, 3, 4, 5, 6, 7, 8], 11));

// 打印矩阵
function printMatrix(arr) {
  let map = (arr, result) => {
    let n = arr.length
    for (let i = 0; i < n; i++) {
      if (i == 0) {
        result.push(...arr[i])
      } else if (i == n - 1) {
        result.push(...arr[i].reverse())
      } else {
        result.push(arr[i].pop())
      }
    }
    arr.shift()
    arr.pop()
    for (let i = n - 3; i >= 0; i--) {
      result.push(arr[i].shift())
    }
    if (arr.length) {
      return map(arr, result)
    } else {
      return result
    }
  }
  return map(arr, [])
}

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

// console.log(printMatrix(matrix), 'matrix1');

// 二分查找数组中指定数据的下标
function binarySearch(arr, start, end, target) {
  if (start > end) return -1
  let mid = Math.floor((start + end) / 2)
  if (arr[mid] == target) {
    return mid
  } else if (arr[mid] < target) {
    return binarySearch(arr, mid + 1, end, target)
  } else {
    return binarySearch(arr, start, mid - 1, target)
  }
}

let orderList = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// console.log(binarySearch(orderList, 0, orderList.length, 6));

function findTwo(arr, target) {
  let map = {}
  for (let i = 0; i < arr.length; i++) {
    if (map[target - arr[i]] != undefined) {
      return [target - arr[i], arr[i]]
    } else {
      map[arr[i]] = i
    }
  }
}

// console.log(findTwo([1, 2, 3, 4, 6], 9));

// 堆排序 堆是完全二叉树 分为大顶推和小顶堆
function heapSort(A) {
  for (let i = Math.floor(A.length / 2 - 1); i >= 0; i--) {
    shiftDown(A, i, A.length);
  }
  // 排序，每一次for循环找出一个当前最大值，数组长度减一
  for (let i = Math.floor(A.length - 1); i > 0; i--) {
    swap(A, 0, i); // 根节点与最后一个节点交换
    shiftDown(A, 0, i); // 从根节点开始调整，并且最后一个结点已经为当
    // 前最大值，不需要再参与比较，所以第三个参数
    // 为 i，即比较到最后一个结点前一个即可
  }
}

function shiftDown(A, i, length) {
  let temp = A[i]; // 当前父节点
// j<length 的目的是对结点 i 以下的结点全部做顺序调整
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    temp = A[i];  // 将 A[i] 取出，整个过程相当于找到 A[i] 应处于的位置
    if (j + 1 < length && A[j] < A[j + 1]) {
      j++;   // 找到两个孩子中较大的一个，再与父节点比较
    }
    if (temp < A[j]) {
      swap(A, i, j) // 如果父节点小于子节点:交换；否则跳出
      i = j;  // 交换后，temp 的下标变为 j
    } else {
      break;
    }
  }
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

let Arr = [49, 38]
heapSort(Arr)

// console.log(Arr);

function getMinNumber(arr, k) {
  createHeap(arr, k)
  for (let i = k; i < arr.length; i++) {
    if (arr[i] < arr[0]) {
      [arr[i], arr[0]] = [arr[0], arr[i]]
      ajustHeap(arr, 0, k)
    }
  }
}

function createHeap(arr, length) {
  for (let i = Math.floor(length / 2) - 1; i >= 0; i++) {
    ajustHeap(arr, i, length)
  }
}

function ajustHeap(arr, index, length) {
  for (let i = 2 * index + 1; i < length; i = 2 * i + 1) {
    if (i + 1 < length && arr[i + 1] > arr[i]) {
      i++
    }
    if (arr[index] < arr[i]) {
      [arr[index], arr[i]] = [arr[i], arr[index]]
      index = i
    } else {
      break
    }
  }
}

// 栈和队列
class Queue {
  constructor() {
    this.arr = []
  }

  insert(data) {
    this.arr.push(data)
  }

  del() {
    return this.arr.shift()
  }

  toString() {
    return this.arr.toString()
  }
}

let queue = new Queue()
queue.insert(1)
queue.insert(2)
queue.insert(3)
queue.del()
console.log(queue.toString());

class Stack {
  constructor() {
    this.arr = []
  }

  insert(data) {
    this.arr.push(data)
  }

  del() {
    return this.arr.pop()
  }

  toString() {
    return this.arr.toString()
  }
}

let stack = new Stack()
stack.insert(1)
stack.insert(2)
stack.insert(3)
stack.del()
console.log(stack.toString());

function maxSlidingWindow(arr, k) {
  let window = []
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (i - window[0] > k - 1) {
      window.shift()
    }
    let j = window.length - 1
    while (j >= 0 && arr[window[j]] <= arr[i]) {
      j--
      window.pop()
    }
    window.push(i)
    if (i >= k - 1) {
      result.push(arr[window[0]])
    }
  }
  return result
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));

function findThreeSum(arr, target) {
  arr.sort()
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (i && arr[i] === arr[i - 1]) continue;
    let left = i + 1
    let right = arr.length - 1
    while (left < right) {
      let sum = arr[i] + arr[left] + arr[right]
      if (sum < target) {
        left++
      } else if (sum > target) {
        right--
      } else {
        result.push([arr[i], arr[left++], arr[right--]])
        while (arr[left] === arr[left - 1]) {
          left++
        }
        while (arr[right] === arr[right + 1]) {
          right--
        }
      }
    }
  }
  return result
}

console.log(findThreeSum([1, 2, 3, 4, 5, 6, 7], 10));

// 用两个栈实现一个队列
class StackMakeQueue {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }

  add(data) {
    this.stack1.push(data)
  }

  del() {
    if (this.stack2.length == 0) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop())
      }
    }
    return this.stack2.pop()
  }
}

let queue1 = new StackMakeQueue()
queue1.add(1)
queue1.add(2)
queue1.add(3)
console.log(queue1.del(), queue1.del());

class QueueMakeStack {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }

  add(data) {
    this.stack1.push(data)
  }

  del() {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.shift())
    }
    return this.stack2.shift()
  }
}

let stack1 = new QueueMakeStack()
stack1.add(1)
stack1.add(2)
stack1.add(3)
console.log(stack1.del(), stack1.del());
stack1.add(4)
console.log(stack1.del(), stack1.del());

// 判断两个整数序列，第一个序列为入栈顺序，第二个序列是否为出栈顺序
function isSameStack(arr, arr1) {
  let stack = []
  let id = 0
  for (let i = 0; i < arr.length; i++) {
    stack.push(arr[i])
    while (stack.length && stack[stack.length - 1] === arr1[id]) {
      stack.pop()
      id++
    }
  }
  return stack.length == 0
}

console.log(isSameStack([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]), 'isSame');

function findWindow(arr, k) {
  let result = []
  let window = []
  for (let i = 0; i < arr.length; i++) {
    if (i > window[0] > k - 1) {
      window.shift()
    }
    let j = window.length - 1
    while (j >= 0 && arr[window[j]] <= arr[i]) {
      window.pop()
      j--
    }
    window.push(i)
    if (i >= k - 1) {
      result.push(arr[window[0]])
    }
  }
  return result
}

console.log(findWindow([1, 2, 3, -1, -2, 4, 6], 3));

// 字符串
function replaceStr(str) {
  if (!str) return null
  return str.replace(/\s/g, '%20')
}

console.log(replaceStr('1 2 3'));

// 将连续的空格替换成%20
function replaceManyStr(str) {
  if (!str) return null
  return str.replace(/\s+/g, '@')
}

// console.log(replaceManyStr('1  2   3'));

// 找到字符串中第一个出现一次的字符
function findFirst(str) {
  if (!str) return -1
  let map = {}
  for (let i = 0; i < str.length; i++) {
    let value = map[str[i]]
    map[str[i]] = value ? value + 1 : 1
  }
  for (let i = 0; i < str.length; i++) {
    if (map[str[i]] == 1) {
      return str[i]
    }
  }
}

// console.log(findFirst('abbdadeefefgmn'));

function searchGroup(str) {
  let result = []
  let current = ''
  let temp = ''
  let arr = str.split('')
  findStrGroup(arr, result, current, temp)
  return [...new Set(result)]
}

function findStrGroup(arr, result, current, temp) {
  current += temp
  if (arr.length === 0) {
    result.push(current)
  }
  for (let i = 0; i < arr.length; i++) {
    temp = arr.shift()
    findStrGroup(arr, result, current, temp)
    arr.push(temp)
  }
}

// console.log(searchGroup('abc'));


/**
 * @function 快速排序
 * 教程：https://www.jianshu.com/p/c6e51a046d67
 * 思路：
 * 1.以一个数为基准(中间的数)，比基准小的放到左边，比基准大的放到右边
 * 2.再按此方法对这两部分数据分别进行快速排序（递归进行）
 * 3.不能再分后退出递归，并重新将数组合并
 * */
function quickSort(arr) {
  if (arr.length <= 1) return arr
  let mid = Math.floor(arr.length / 2)
  let base = arr.splice(mid, 1)[0]
  let left = []
  let right = []
  arr.forEach(val => {
    if (val < base) {
      left.push(val)
    } else {
      right.push(val)
    }
  })
  return quickSort(left).concat(base, quickSort(right))
}

// console.log(quickSort([11, 9, 8, 2, 6, 45]));


function orderQuick(arr) {
  if (arr.length <= 1) return arr
  let mid = Math.floor(arr.length / 2)
  let base = arr.splice(mid, 1)[0]
  let left = []
  let right = []
  arr.forEach(val => {
    if (val > base) {
      right.push(val)
    } else {
      left.push(val)
    }
  })
  return orderQuick(left).concat(base, orderQuick(right))
}

// console.log(orderQuick([1, 882, 23, 5, 7]));

function arrOrder(arr) {
  if (!arr) return null
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

// console.log(arrOrder([1, 882, 23, 5, 7]));

// 设计模式
// 单例模式
class Single{
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
let single1 = Single.getInstance('1')
let single2 = Single.getInstance('2')
// console.log(single1 === single2);

// 策略模式
let demo = {
  typ1: function (val){
    return val
  },
  typ2: function (val){
    return val * 2
  }
}
function strategy(type, value) {
  return demo[type](value)
}
let type1 = strategy('typ1', 1)
let type2 = strategy('typ1', 2)
// console.log(type1, type2);

// 代理模式
let relImage = (function () {
  let imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc(src) {
      imgNode.src = src
    }
  }
})()
let proxyImage = (function () {
  let img = new Image()
  img.onload = function () {
    setTimeout(()=> {
      relImage.setSrc(img.src)
    }, 2000)
  }
  return {
    setSrc(src) {
      img.src = src
      relImage.setSrc('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3429961294,3288641148&fm=26&gp=0.jpg')
    }
  }
})()
proxyImage.setSrc('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2530486543,113586312&fm=26&gp=0.jpg')
// https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3429961294,3288641148&fm=26&gp=0.jpg
// https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2530486543,113586312&fm=26&gp=0.jpg

// 发布订阅模式
class Event {
  constructor() {
    this.map = {}
  }
  on(type, fn) {
    if(!this.map[type]) {
      this.map[type] = []
    }
    this.map[type].push(fn)
  }
  emit(type, ...args) {
    this.map[type].forEach(fn => {
      fn.apply(this, args)
    })
  }
}
let event = new Event()
event.on('click', function (a) {
  console.log(a, 'a');
})
event.on('click', function (a,b) {
  console.log(a,b,'ab');
})
event.emit('click', 1,2)

// 观察者模式
let per = {name: 'pre', age: 18}
let proxy = new Proxy(per, {
  get(target, key, receiver) {
    console.log('获取数据');
    return Reflect.get(target,key)
  },
  set(target, key, value) {
    console.log('更新视图');
    return Reflect.set(target,key,value)
  }
})
proxy.age = 20

// 装饰者模式 动态地给函数添加方法
function fuc() {
  console.log(2);
}
function fuc1() {
  console.log(1);
}
function fuc3() {
  console.log(3);
}
function fuc4() {
  console.log(4);
}
Function.prototype.before = function (fn) {
  let self = this
  return function () {
    fn.apply(this, arguments)
    self.apply(this, arguments)
  }
}
Function.prototype.after = function(fn) {
  let self = this
  return function () {
    self.apply(this, arguments)
    fn.apply(this, arguments)
  }
}
fuc.before(fuc1).before(fuc3).after(fuc4)()

// 工厂模式 最直观的体现生成一个对象不是直接通过new方法生成，而是调用工厂的方法生成
class Car {
  constructor(name) {
    this.name = name
  }
}
class Bicycle {
  constructor(name) {
    this.name = name
  }
}
class Factory {
  static create(type) {
    switch (type) {
      case 'car':
        return new Car('car')
        break;
      case 'bicycle':
        return new Bicycle('bicycle')
        break;
      default:
        console.log('没有该类型');
    }
  }
}

let car = Factory.create('car')
let bicycle = Factory.create('bicycle')
console.log(car, bicycle, 'car');

// fileRender web应用异步读取计算机上的文件
// fileRender readAsDataUrl readAsDataUrl readAsDataUrl

// 大文件上传和断点续传

function selfMap(fn, content) {
  let arr = this.slice()
  let list = []
  for (let i = 0; i < arr.length; i++) {
    if(!arr.hasOwnProperty(i)) continue;
    list[i] = fn.call(content, arr[i])
  }
  return list
}
Array.prototype.selfMap = selfMap;
console.log([1, 2, 3].selfMap(item => item * 2));

function selfFlat(deep=1) {
  let arr = this.slice()
  if(deep == 0) return arr
  return arr.reduce((pre,cur) => {
    if(Array.isArray(cur)) {
      return [...pre, ...cur.selfFlat(deep-1)]
    } else {
      return [...pre, cur]
    }
  }, [])
}
Array.prototype.selfFlat = selfFlat;
console.log([1, 2, 3,[4,[5]]].selfFlat(1));

function curry(fn) {
  if(fn.length <=1) return fn
  function generator(...args) {
    if(args.length === fn.length) {
      return fn(...args)
    } else {
      return (...arg1) => {
        return generator(...arg1, ...args)
      }
    }
  }
  return generator
}
function testFn(a,b,c,d) {
  console.log(a + b + c + d, 'abcd');
  return a+b+c+d
}
let curryFn = curry(testFn)
console.log(curryFn(1)(2)(3)(4));

// 函数防抖
function debounce(fn, time, flag) { // flag 控制第一次是否执行
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    if(flag && !timer) {
      fn.apply(this, args)
    }
    timer = setTimeout(()=> {
      fn.apply(this, args)
      timer = null
    },time)
  }
}
let debounceFn = selfDebounce(testFn, 2000, true)
debounceFn(...[1,1,2,3])
debounceFn(...[1,1,2,3])
debounceFn(...[1,1,2,3])
debounceFn(...[1,1,2,3])

function mydeepClone(target, hash= new WeakMap()) {
  if(!myIsObject(target)) return target
  if(hash.get(target)) return hash.get(target)
  let obj = Array.isArray(target) ? [] : {}
  hash.set(target, obj)
  for (const key in target) {
    if(target.hasOwnProperty(key)) {
      if(myIsObject(target[key])) {
        obj[key] = mydeepClone(target[key], hash)
      } else {
        obj[key] = target[key]
      }
    }
  }
  return obj
}
function myIsObject(target) {
  return target && typeof target === 'object'
}
let myObj = {name: {age:18}, arr: [{name:1}]}
myObj.target = myObj
let cloneObj = mydeepClone(myObj)
myObj.name.age = 20
myObj.arr[0].name = 2
console.log(myObj,cloneObj);

// 函数防抖 用于搜索框搜素
function selfDebounce(fn,time, flag) {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    if(flag && !timer) {
      fn.apply(this, args)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, time)
  }
}

function selfThrottle(fn, time, flag) {
  let timer = null;
  let control = flag;
  return function (...args) {
    if(control) {
      fn.apply(this, args)
      control = false
    }
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null;
      }, time)
    }
  }
}


function myThrottle(fn, time, flag) {
  let timer = null
  let control = flag
  return function (...args) {
    if(control) {
      fn.apply(this, args)
      control = false
    }
    if(!timer) {
      timer = setTimeout(()=> {
        fn.apply(this, args)
        timer = null
      }, time)
    }
  }
}

// 图片懒加载 原理：判断图片出现在视口时，给图片赋值对应的url链接，使用IntersectionObserver
function observerImg() {
  let imgList = document.getElementsByTagName('img')
  let observer = new IntersectionObserver(items => {
    items.forEach(item => {
      let dom = item.target
      if(item.intersectionRatio > 0) {
        dom.src = dom.getAttribute('data-src')
        observer.unobserve(dom)
      }
    })
  })
  for (let i = 0; i < imgList.length; i++) {
    observer.observe(imgList[i])
  }
}

function myClass(fn,...args) {
  let obj = Object.create(fn.prototype)
  let instance = fn.apply(obj,args)
  return instance instanceof Object ? instance : obj
}
function Dog(name) {
  this.name = name
}
let dog = new Dog('ming')
console.log(myClass(Dog, 'ming'));

function myInstance(obj, fn) {
  let proto = obj.__proto__
  if(proto) {
    if(proto === fn.prototype) {
      return true
    } else {
      return myInstance(proto, fn)
    }
  } else {
    return false
  }
}

console.log(myInstance(dog, Object));

// 洗牌算法
function mixInArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    let index = Math.floor(Math.random() * (arr.length -1))
    [arr[i], arr[index]] = [arr[index], arr[i]]
  }
  return arr
}

function newdebounce(fn, time, flag) {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    if(flag && !timer) {
      fn.apply(this, args)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    },time)
  }
}

function newthrottle(fn, time, flag) {
  let timer = null
  let control = flag
  return function (...args) {
    if(control) {
      fn.apply(this, args)
      control = false
    }
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      },time)
    }
  }
}


// vue3
// <p ref=box><p>
// 通过ref获取该dom
function setup() {
  let box = ref(null)
  onMounted( ()=> {
    console.log(box.value); // 获取p标签
  })
  return {box}
}

// 大文件上传
// 将大文件进行切片
function createFileList(file, size) { // size每个切片的大小
  let fileList = []
  let cur = 0
  while (cur < file.size) {
    fileList.push({file: file.slice(cur, cur + size)})
    cur += size
  }
  return fileList
}
// 请求逻辑
function request({url, method='post', data, headers={}, requestList}) {
  return new Promise(resolve => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, header[key])
    })
    xhr.send(data)
    xhr.upload.onprogress = e => {
      console.log(e.loaded); //获取已上传的文件大小
    }
    xhr.onload = e => {
      resolve({
        data: e.target.response
      })
    }
  })
}

function requestList(fileList) {
  let xhrList = []
  fileList.forEach(item => {
    let data = new FormData
    data.append('file', item.file)
    xhrList.push(request({data}))
  })
  Promise.all(xhrList).then(e => {
    console.log(e);
  })
}
// 斐波那契数列 1 1 2 3 5 8 13 21
function fib(n) {
  let dp = []
  dp[0] = 1n
  dp[1] = 1n
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2]
  }
  return dp[n]
}

console.log(fib(7));


function selfFib(n) {
  let arr = []
  arr[0] = 1
  arr[1] = 1
  for (let i = 2; i <=n ; i++) {
   arr[i] = arr[i-1] + arr[i-2]
  }
  return arr[n]
}

console.log(selfFib(7));


























































































































































































































































































































































































































































































































































































































































































































































































































































































































































