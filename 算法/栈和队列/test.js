
/**
 * 队列的教程 https://segmentfault.com/a/1190000018132297
 * @function 队列的实现（先进先出，从后面插入，从前面删除）
 * */
class Queue {
  constructor() {
    this.arr = []
  }
  insert(val) {
    this.arr.push(val)
  }
  del() {
    return this.arr.shift()
  }
  print () {
    console.log(this.arr.toString());
  }
}
let queue = new Queue()
queue.insert(1)
queue.insert(2)
queue.del()
queue.print()


/**
 * @function 栈的实现（先进后出，从后面插入，从后面删除）
 * */
class Stack {
  constructor() {
    this.arr = []
  }
  insert(val) {
    this.arr.push(val)
  }
  del() {
   return this.arr.pop()
  }
  print () {
    console.log(this.arr.toString())
  }
}

let stack = new Stack()
stack.insert(1)
stack.insert(2)
stack.insert(3)
stack.del()
stack.print()

/**
 * @function 优先队列（在插入的时候会根据优先级的高低顺序进行插入操作。priority越小，优先级越高，插入越靠前）
 * */
class Element {
  constructor(val, priority) {
    this.val = val
    this.priority = priority
  }
}
class PriorityQueue {
  constructor() {
    this.arr = []
  }
  insert(val, priority) {
    let node = new Element(val, priority)
    let result = false
    for (let i = 0; i < this.arr.length; i++) {
      if(priority < this.arr[i].priority) {
        this.arr.splice(i,0, node)
        result = true
        break
      }
    }
    if(!result) {
      this.arr.push(node)
    }
    return node
  }
  del () {
    return this.arr.shift()
  }
  print () {
    let str = ''
    this.arr.forEach(item => {
      str += `${item.val}:${item.priority} `
    })
    console.log(str)
  }
}
let priorityQueue = new PriorityQueue()
priorityQueue.insert(3,3)
priorityQueue.insert(2,2)
priorityQueue.insert(4,4)
priorityQueue.insert(1,1)
priorityQueue.del()
priorityQueue.print()


/**
 * @function 双端队列的实现 https://www.jb51.net/article/196728.htm
 *
 * */
class Deque {
  constructor() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }
  addFront(ele) {
    if (this.isEmpty()) {
      this.items[this.count] = ele
    } else if (this.lowestCount > 0) {
      this.lowestCount -= 1
      this.items[this.lowestCount] = ele
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.items[0] = ele
    }
    this.count++
    return ele
  }

  removeFront() {
    if (this.isEmpty()) {
      return
    }
    const delEle = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return delEle
  }

  addBack(ele) {
    this.items[this.count] = ele
    this.count++
  }

  removeBack() {
    if (this.isEmpty()) {
      return
    }

    const delEle = this.items[this.count - 1]
    delete this.items[this.count - 1]
    this.count--
    return delEle
  }

  peekFront() {
    if (this.isEmpty()) {
      return
    }
    return this.items[this.lowestCount]
  }

  peekBack() {
    if (this.isEmpty()) {
      return
    }
    return this.items[this.count - 1]
  }

  size() {
    return this.count - this.lowestCount
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++){
      objString = `${objString}, ${this.items[i]}`
    }
    return objString
  }

}

/**
 * @function 判断回文(串字符从左至右读和从右至左读相同，那么这串字符就是回文)下面我们通过双端队列来实现同样的功能
 * 教程：https://www.jb51.net/article/196728.htm
 * */

function palindromeChecker(aString) {
  if (!aString || typeof aString !== 'string' || !aString.trim().length) {
    return false
  }
  const deque = new Deque()
  const lowerString = aString.toLowerCase().split(' ').join('')
  // 加入队列
  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString[i])
  }
  let isEqual = true
  let firstChar = ''
  let lastChar = ''

  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()
    lastChar = deque.removeBack()
    if (firstChar != lastChar) {
      isEqual = false
    }
  }
  return isEqual
}

console.log(palindromeChecker('abcba'), 123) // true 当前为回文

/**
 * @function 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口 k 内的数字。滑动窗口每次只向右移动一位.返回滑动窗口最大值。
 * 教程：http://www.conardli.top/docs/dataStructure/%E6%A0%88%E5%92%8C%E9%98%9F%E5%88%97/%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3%E7%9A%84%E6%9C%80%E5%A4%A7%E5%80%BC.html#%E9%A2%98%E7%9B%AE
*       https://mp.weixin.qq.com/s/RORQ-2KMMnPMGUxfIjTn3A
 * */
function maxSlidingWindow(nums, k) {
  const window = [];
  const result = [];
  debugger
  for (let i = 0; i < nums.length; i++) {
    if (i - window[0] > k - 1) {
      window.shift();
    }
    let j = window.length - 1;
    while (j >= 0 && nums[window[j]] <= nums[i]) {
      j--;
      window.pop();
    }
    window.push(i);
    if (i >= k - 1) {
      result.push(nums[window[0]]);
    }
  }
  return result;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));

/**
 * @function 队列的应用
 击鼓传花游戏
 击鼓传花游戏: 简单描述就是一群人围成一个圈传递花,喊停的时花在谁手上就将被淘汰(每个人都可能在前端,每个参与者在队列位置会不断变化)，最后只剩下一个时就是赢者.
 https://mp.weixin.qq.com/s/RORQ-2KMMnPMGUxfIjTn3A
 * */

function hotPotato(elementsList, num) {
  // 创建一个容器
  const queue = new Queue()
  const elimitatedList = []
  // 把元素(参赛者)加入队列中
  for (let i = 0, len = elementsList.length; i < len; i++) {
    queue.enqueue(elementsList[i])
  }

  /**
   * 击鼓传花
   * 首先队列规则: 先进先出
   * 那么在传花过程中,任何一个元素都可能是前端, 在传花的过程中应该就是前端位置不断变化.
   * 当喊停的时(num 循环完), 也就是花落在谁手(谁在前端)则会被淘汰*（移除队列）
   */

  while (queue.size() > 1) {
    for (let j = 0; j < num; j++) {
      queue.enqueue(queue.dequeue())
    }
    elimitatedList.push(queue.dequeue())
  }
  return {
    winer: queue.dequeue(),
    elimitatedList
  }
}

const arrT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(hotPotato(arrT, Math.ceil(Math.random() * 10))) // { winer: 5, elimitatedList: [4, 8, 2, 7, 3,10, 9, 1, 6]}
console.log(hotPotato(arrT, Math.ceil(Math.random() * 10))) // { winer: 5, elimitatedList: [4, 8, 2, 7, 3,10, 9, 1, 6]}
console.log(hotPotato(arrT, Math.ceil(Math.random() * 10))) // { winer: 8, elimitatedList: [10, 1, 3, 6, 2,9, 5, 7, 4]}
