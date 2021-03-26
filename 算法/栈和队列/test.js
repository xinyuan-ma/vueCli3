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
  print() {
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
  print() {
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
      if (priority < this.arr[i].priority) {
        this.arr.splice(i, 0, node)
        result = true
        break
      }
    }
    if (!result) {
      this.arr.push(node)
    }
    return node
  }
  del() {
    return this.arr.shift()
  }
  print() {
    let str = ''
    this.arr.forEach(item => {
      str += `${item.val}:${item.priority} `
    })
    console.log(str)
  }
}
let priorityQueue = new PriorityQueue()
priorityQueue.insert(3, 3)
priorityQueue.insert(2, 2)
priorityQueue.insert(4, 4)
priorityQueue.insert(1, 1)
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
    for (let i = this.lowestCount + 1; i < this.count; i++) {
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
 *  思路： 利用双端队列（队列两侧都可以剔除元素），窗口移动的过程中，始终保证window中最左侧的元素为当前窗口的最大值
 * */
function maxSlidingWindow(nums, k) {
  const window = []; // 存储当前窗口中的数据
  const result = []; // 存储窗口中的最大值
  for (let i = 0; i < nums.length; i++) {
    if (i - window[0] > k - 1) { // 窗口不断往右移动，当最大值在窗口最左侧，但窗口的长度超出k时的情况，就要把左侧的最大值剔除，比如窗口为【3,-1,-3】，继续往右时，就要把左侧的3剔除
      window.shift(); // 剔除窗口长度超出范围时左侧的最大值
    }
    let j = window.length - 1; // 获取窗口中元素最后一个值的下标
    while (j >= 0 && nums[window[j]] <= nums[i]) { // 当前窗口的值依次和要插入的值做比较，如果小于要插入的值，剔除掉该值，直到window为空为止（保证window中最左侧的值为最大值）
      j--;  // 依次比较
      window.pop();
    }
    window.push(i); // 添加右侧新加入的值，插入新值时有两种情况：1、新值为最大值时，则window此时为空；2、新值不为最大值时，window已剔除掉比新值小的值。 始终保证window中最左侧的值为最大值
    if (i >= k - 1) { // 窗口是从0开始移动，当移动的距离，大于等于目标范围后，以后再往后移动一次，就要写入当前窗口的最大值
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
// function hotPotato(elementsList, num) {
//   // 创建一个容器
//   const queue = new Queue()
//   const elimitatedList = []
//   // 把元素(参赛者)加入队列中
//   for (let i = 0, len = elementsList.length; i < len; i++) {
//     queue.enqueue(elementsList[i])
//   }
//
//   /**
//    * 击鼓传花
//    * 首先队列规则: 先进先出
//    * 那么在传花过程中,任何一个元素都可能是前端, 在传花的过程中应该就是前端位置不断变化.
//    * 当喊停的时(num 循环完), 也就是花落在谁手(谁在前端)则会被淘汰*（移除队列）
//    */
//
//   while (queue.size() > 1) {
//     for (let j = 0; j < num; j++) {
//       queue.enqueue(queue.dequeue())
//     }
//     elimitatedList.push(queue.dequeue())
//   }
//   return {
//     winer: queue.dequeue(),
//     elimitatedList
//   }
// }
//
// const arrT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//
// console.log(hotPotato(arrT, Math.ceil(Math.random() * 10))) // { winer: 5, elimitatedList: [4, 8, 2, 7, 3,10, 9, 1, 6]}
// console.log(hotPotato(arrT, Math.ceil(Math.random() * 10))) // { winer: 5, elimitatedList: [4, 8, 2, 7, 3,10, 9, 1, 6]}
// console.log(hotPotato(arrT, Math.ceil(Math.random() * 10))) // { winer: 8, elimitatedList: [10, 1, 3, 6, 2,9, 5, 7, 4]}

/**
 * @function 用两个栈实现一个队列
 * 栈的特点： 先进后出。 队列的特点：先进先出（注意：队列不存在从后面删除最后一个元素的情况，只能从头开始删除）
 * */
class StackMakeQueue {
  constructor() {
    this.stack1 = [] // 该栈存入push的值
    this.stack2 = [] // 该栈用于删值使用
  }
  push(val) {
    this.stack1.push(val)
  }
  del() {
    if(this.stack2.length === 0) { // 注意：只有stack2为空值，才将stack1的值批量插入进来，否则会造成顺序错乱
      while(this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop())
      }
    }
    return this.stack2.pop() || null
  }
}
/**
 * @function 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。
 * 例如序列1,2,3,4,5是某栈的压入顺序，判断序列4,5,3,2,1是否为该栈对应的一个弹出序列
 * 思路：（重点：任何一个元素入栈后，都有可能出栈。所以辅助栈每次入栈后，都要和弹出序列的对应的位置做对比）
 * 1、使用一个辅助栈来模拟压入、弹出的过程。将压入顺序的元素依次入栈。
 * 2、设置一个索引idx，记录popV（出栈序列）栈顶的位置
 * 3、任何一个元素入栈后，都有可能出栈。所以辅助栈每次入栈后，都要和弹出序列的对应的位置做对比，如果元素相同，辅助栈出栈，索引idx+1
 * 4、当所有数据入栈完成，如果出栈顺序正确，那么辅助栈应该为空。
 * */
function isSameStack(pushArr, popArr) {
  if(!pushArr || pushArr.length == 0 || !popArr || popArr.length == 0) return false
  let stack = []
  let id = 0 // 弹出序列对应的id
  for (let i = 0; i < pushArr.length; i++) {
    stack.push(pushArr[i]) // 将压入序列的元素依次加入辅助栈
    while (stack.length && stack[stack.length-1] === popArr[id]) { // 辅助栈每次入栈后，都要和弹出序列对应位置的值做对比
      stack.pop() // 入栈元素相同时，将该元素出栈
      id++        // id 递增
    }
  }
  return stack.length == 0 // 如果弹出序列和入栈序列一致，则辅助栈长度为0
}
console.log(isSameStack([1, 2, 3, 4, 5], [4, 5, 4, 2, 1]), 'isSame');
/**
 * @function 使用两个队列，实现栈的功能
 * 注意： 队列，只能从后面插入，从前面删除，所以删除只能使用shift方法，不能使用pop方法
 * 思路：
 * 1、队列插入的时候，先插入两个队列中为空的那个（都为空时，优先插入队列1），然后再将另一个队列的元素依次弹出队列，然后依次插入该队列中（相当于将插入的元素倒序）
 * 2、弹出时，判断哪个队列不为空，就使用shift方法，删除该队列第一个元素（实现了栈后进先出的功能）
 * */
class QueueMakeStack {
  constructor() {
    this.queue1 = []
    this.queue2 = []
  }
  push(x) { // 插入两个队列中为空的那个，然后将另一个队列的依次弹出，并依次插入该队列中
    if (this.queue1.length === 0) {
      this.queue1.push(x)
      while (this.queue2.length) {
        this.queue1.push(this.queue2.shift())
      }
    } else if (this.queue2.length === 0) {
      this.queue2.push(x)
      while (this.queue1.length) {
        this.queue2.push(this.queue1.shift())
      }
    }
  };
  pop() {
    if (this.queue1.length !== 0) {
      return this.queue1.shift()
    } else {
      return this.queue2.shift()
    }
  }
}
let queueMakeStack = new QueueMakeStack()
queueMakeStack.push(1)
queueMakeStack.push(2)
queueMakeStack.push(3)
console.log(queueMakeStack.pop(3), 'pop');
console.log(queueMakeStack.pop(2), 'pop');
