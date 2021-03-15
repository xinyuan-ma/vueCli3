// 链表中的元素在内存中不是连续的。每个元素存储着自身的节点和一个指向下一个元素的指针
// 好处是: 添加或移除元素的时候不需要移动其他元素。缺点是查找的时候 需要遍历，从头开始查找，不能直接访问到该节点(查询慢、插入删除快)
// 基础教程：https://juejin.cn/post/6844904023531716616#heading-9

function Node(element) {
  this.data = element
  this.next = null
}
Node.prototype = {
  show () {
    console.log(this.data);
  }
}

class LinkedList {
  constructor() {
    this.count = 0 // 链表长度
    this.head = null // 链表开头
  }
  push(element) {
    let node = new Node(element)
    if(!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.count ++
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      let node = new Node(element)
      let current = this.head
      if(index == 0) { // 插到表头
        this.head = node
        node.next = current
      } else {
        for (let i = 0; i < index -1; i++) { // 找到要插入位置的前一个元素
          current = current.next
        }
        let next = current.next // 暂存next以后的节点信息
        current.next = node
        node.next = next
      }
      this.count ++
      return true
    } else {
      return false
    }
  }
  getIndexNode(index) {
    if(index >=0 && index < this.count) {
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
    if(index >=0 && index < this.count) {
      if(index ==0) {
        this.head = this.head.next
      } else {
        let current = this.head
        const pre = this.getIndexNode(index -1) // 找到要删除元素的前一个元素
        current = pre.next // 获取要删除的元素
        pre.next = current.next
      }
      this.count --
      return true
    } else {
      return false
    }
  }
  indexOf(element) { // 查找对应元素的位置
    let current = this.head
    for (let i = 0; i < this.count; i++) {
      if(element === current.data) {
        return i
      }
      current = current.next
    }
  }
  isEmpty () {
    return this.count == 0
  }
  toString () {
    let current = this.head
    let string = `${current.data}`
    for (let i = 1; i < this.count; i++) {
      string = `${string},${current.data}`
      current = current.next
    }
    return string
  }
}

const link = new LinkedList()
// link.push(0)
link.push(1)
link.push(2)
// link.insert(3, 1)
link.push(3)
link.push(4)
link.push(5)

let current = link.head
let secondNode = null
for (let i = 0; i <= link.count -1; i++) {
  if(i == 1) {
    secondNode = current
  }
  if(i == link.count -1) {
    current.next = secondNode
  }
  current = current.next
}
console.log(link, 'link');

function toString(node) {
  let current = this.root
  let str = `${current.data}`
  for (let i = 1; i < this.count; i++) {
    str = `${str}${current.data}`
    current = current.data
  }
  return str
}

// 反向输入链表（从表尾到表头输入）
function reversal(head) {
  let arr = []
  while (head) {
    arr.unshift(head.data)
    head = head.next
  }
  return arr
}

var reverseList = function (head) {
  let currentNode = null;
  let headNode = head;
  while (head && head.next) {
    currentNode = head.next;
    head.next = currentNode.next;
    currentNode.next = headNode;
    headNode = currentNode;
  }
  return headNode;
};
// console.log(reverseList(link.head), '123');

function EntryNodeOfLoop(head) {
  if(!head || !head.next) {
    return null
  }
  let p1 = head.next
  let p2 = head.next.next // p2一次跳两步
  while (p1 != p2) { // 循环判断是否有环
    if(p1 == null || p2.next === null) {
      return null
    }
    p1 = p1.next
    p2 = p2.next.next
  }
  console.log(p1, 'p1');
  // 获取环的长度
  let temp = p1 // 此时p1 是p1 p2重合的点
  let length = 1
  p1 = p1.next
  while (p1 !== temp) {
    p1 = p1.next
    length ++
  }
  // 找公共节点
  p1 = p2 = head // 此时为什么要将p1 p2重新赋值，因为p2只是重合的点，不一定是入口节点
  while (length-- >0) {
    p2 = p2.next
  }
  while (p1 !== p2) {
    p1 = p1.next
    p2 = p2.next
  }
  return p1
}

console.log(EntryNodeOfLoop(link.head), 'entry');

function findKnode(head, k) {
  if(!head || !k) return null
  let current = head
  let target = head
  let length = 1
  while (current.next){
    current = current.next
    length ++
    if(length > k) {
      target = target.next
    }
  }
  if(k > length) return null
  return target
}

function findCircle(head) {
  if(!head || !head.next) return null
  let step = head.next
  let step1 = head.next.next
  while (step != step1) {
    step = step.next
    step1 = step1.next.next
  }
  let length = 1
  while (step != step1) {
    length ++
    step = step.next
  }
  step = step1 = head
  while (length -- > 0) {
    step = step.next
  }
  while (step != step1) {
    step = step.next
    step1 = step1.next
  }
  return step
}

function findCommonNode(head1, head2) {
  if(!head1 || !head2) return null
  let length1 = length2 = 0
  let current1 = head1
  while (current1) {
    current1 = current1.next
    length1 ++
  }
  let current2 = head2
  while (current2) {
    current2 = current2.next
    length2 ++
  }
  current2 = head2
  current1 = head1
  let dec = Math.abs(length2 - length1)
  while (dec -- > 0) {
    if (length2 > length1) {
      current2 = current2.next
    } else {
      current1 = current1.next
    }
  }
  while (current1 != current2) {
    current1 = current1.next
    current2 = current2.next
  }
  return current1
}


function findLastNode(n, m) {
  if(n <1 || m < 1) return null
  let head = {val: 0}
  let current = head
  for (let i = 1; i < n ; i++) {
    current.next = {val: i}
    current = current.next
  }
  current.next = head // 此时current是最后一个节点
  while (current != current.next) { // 最后一个节点 current 等于 current.next
    for (let i = 0; i < m -1; i++) {
      current = current.next
    }
    current.next = current.next.next
  }
  return current.val
}

function delNode(head, node) {
  if(head === node) { // node是头节点
    head = node = null
  } else if (node.next) { // node是中间节点
    node.next = node.next.next
    node.val = node.next.val
  } else { // node是最后一个节点
    node = head
    while (node.next.next) {
      node = node.next
    }
    node.next = null
    node = null
  }
  return node
}

// 删除重复的节点
function delRepeatNode(head) {
  if(!head) return null
  let map = {}
  let node = head
  while (node) {
    let val = map[node.val]
    map[node.val] = val ? val + 1 : 1
    node = node.next
  }
  node = head
  while (node) {
    let val = map[node.val]
    if(val > 1) {
      if(head === node) { // node是头节点
        head = node = null
      } else if (node.next) { // node是中间节点
        node.next = node.next.next
        node.val = node.next.val
      } else { // node是最后一个节点
        node = head
        while (node.next.next) {
          node = node.next
        }
        node.next = null
        node = null
      }
    } else {
      node = node.next
    }
  }
  return head
}
