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
link.insert(3, 1)
// link.insert(4, 2)
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
  debugger
  while (head && head.next) {
    currentNode = head.next;
    head.next = currentNode.next;
    currentNode.next = headNode;
    headNode = currentNode;
  }
  return headNode;
};
console.log(reverseList(link.head), '123');