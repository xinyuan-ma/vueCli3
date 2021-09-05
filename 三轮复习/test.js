class Node {
  constructor(data, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
  show() {
    console.log(this.data);
  }
}
class Tree {
  constructor() {
    this.root = null
  }
  insert(data) {
    let node = new Node(data)
    if(!this.root) {
      this.root = node
      return
    }
    let current = this.root
    let parent = null
    while (current) {
      parent = current
      if(data < current.data) {
        current = current.left
        if(!current) {
          parent.left = node
        }
      } else {
        current = current.right
        if(!current) {
          parent.right = node
        }
      }
    }
  }
}
let tree = new Tree()
tree.insert(10)
tree.insert(7)
tree.insert(8)
tree.insert(11)
tree.insert(12)
tree.insert(13)
console.log(tree);

function  midOrder(node) {
  let result = []
  let stack = []
  let current = node
  while (current || stack.length) {
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
console.log(midOrder(tree.root));

function getMinDeep(node,deep=0) {
  if(!node) return deep
  deep++
  let left = getMinDeep(node.left, deep)
  let right = getMinDeep(node.right, deep)
  return Math.max(left,right)
}
console.log(getMinDeep(tree.root));

function rebuildTree(preArr, midArr) {
  if(preArr.length == 0) return null
  if(preArr.length == 1) return new Node(preArr[0])
  let value = preArr[0]
  let index = midArr.indexOf(value)
  let preLeftArr = preArr.slice(1, index+1)
  let preRightArr = preArr.slice(index+1)
  let midLeftArr = midArr.slice(0, index)
  let midRightArr = midArr.slice(index+1)
  let root = new Node(value)
  root.left = rebuildTree(preLeftArr, midLeftArr)
  root.right = rebuildTree(preRightArr, midRightArr)
  return root
}
let preArr = [1,2,4,7,3,5,6,8]
let midArr = [4,7,2,1,5,3,8,6]
console.log(rebuildTree(preArr, midArr));

function threeGroup(arr, target) {
  arr.sort((a,b) => a-b)
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if(i && arr[i] == arr[i-1]) continue;
    let start = i+1
    let end = arr.length -1
    while (start < end) {
      let sum = arr[i] + arr[start] + arr[end]
      if(sum < target) {
        start ++
      } else if (sum > target) {
        end--
      } else {
        result.push([arr[i], arr[start++], arr[end--]])
        while (arr[start]==arr[start-1]) {
          start++
        }
        while (arr[end]==arr[end+1]) {
          end--
        }
      }
    }
  }
  return result
}
console.log(threeGroup([1, 2, 3, 4, 5, 6, 7], 9));

function printMatrix(arr, result = []) {
  let n = arr.length-1
  for (let i = 0; i <= n ; i++) {
    if (i == 0) {
      result.push(...arr[i])
    } else if(i==n) {
      result.push(...arr[i].reverse())
    } else {
      result.push(arr[i].pop())
    }
  }
  arr.shift()
  arr.pop()
  for (let i = n-2; i >=0 ; i--) {
    result.push(arr[i].shift())
  }
  if(arr.length) {
    printMatrix(arr, result)
  }
  return result
}
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
console.log(printMatrix(matrix));

function halfSearch(arr, target, start=0, end=arr.length-1) {
  if(start > end) return -1
  let mid = Math.floor((start+end)/2)
  if(arr[mid] ===target) {
    return mid
  } else if(mid<target){
    return halfSearch(arr, target, mid+1, end)
  } else {
    return halfSearch(arr, target, start, mid-1)
  }
}
console.log(halfSearch([1, 2, 3, 4, 5, 6, 7, 8], 8, 0));

function findTwo(arr,target) {
  let map = {}
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if(map[target- arr[i]] !== undefined) {
      result.push([arr[i], target-arr[i]])
    } else {
      map[arr[i]] = i
    }
  }
  return result
}
console.log(findTwo([1, 2, 3, 4, 5, 6, 7], 8));


function GetLeastNumbers(input, k) {
  if (k > input.length) {
    return [];
  }
  createHeap(input, k);
  for (let i = k; i < input.length; i++) {
    if (input[i] < input[0]) {   // ???????k????????
      [input[i], input[0]] = [input[0], input[i]];
      ajustHeap(input, 0, k);
    }
  }
  return input.splice(0, k);
}

// ?????
function createHeap(arr, length) {
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) { // ???????i??????2*i+1?2*i+2????????????length,?????????Math.floor(length / 2) - 1?
    ajustHeap(arr, i, length); // ??????????????????
  }
}

// ???????????????????????????????????????????????????????????????????????????????
// ???????????[a0, a1, a2], a2> a0, a2??a0???????a2??????????????????????????
function ajustHeap(arr, index, length) {
  for (let i = 2 * index + 1; i < length; i = 2 * i + 1) { // ????i??????2*i+1
    if (i + 1 < length && arr[i + 1] > arr[i]) { // ??????2*i+1?2*i+2????
      i++;
    }
    if (arr[index] < arr[i]) {
      [arr[index], arr[i]] = [arr[i], arr[index]]; // ????????????????
      index = i;
    } else {
      break;
    }
  }
}
console.log(GetLeastNumbers([100,90,2, 7, 4, 5, 8,6], 4), 'get');

function quickOrder(arr) {
  if(arr.length <=1) return arr
  let mid = Math.floor(arr.length/2)
  let base = arr.splice(mid, 1)[0]
  let left = []
  let right = []
  arr.forEach(item => {
    if(item > base) {
      right.push(item)
    } else {
      left.push(item)
    }
  })
  return quickOrder(left).concat([base], quickOrder(right))
}

console.log(quickOrder([1, 9, 8, 12, 5, 6]));

Promise.race = function (list) {
  return new Promise((resolve,reject) => {
    for (let i = 0; i < list.length; i++) {
      list[i].then( res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }
  })
}
Promise.all = function (list) {
  let index = 0
  let result = []
  return new Promise((resolve,reject) => {
    for (let i = 0; i < list.length; i++) {
      list[i].then( res => {
        result[i] = res
        index ++
        if(index === list.length) {
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
}

function arrOrder(arr) {
  if (!arr) return null
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  for (let i = 0; i < arr.length -1 ; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

function promisify(fn,context){
  return (...args) => {
    return new Promise((resolve,reject) => {
      fn.apply(context,[...args,(err,res) => {
        return err ? reject(err) : resolve(res)
      }])
    })
  }
}
let ff1 =  promisify(testBack, null)
ff1(1,2).then(res => {
  console.log(res, 'res1');
})
function testBack(a,b) {
  return a + b
}
function callBack() {
  return 12345
}

function retry(fn, times, delay) {
  return new Promise((resolve, reject) => {
    function fuc() {
      fn().then(res => {
        resolve(res)
      }).catch( err => {
        if(times !== 0) {
          times --
          setTimeout(() => {
            fuc()
          }, delay)
        } else {
          reject(err)
        }
      })
    }
    fuc()
  })
}

function findTreeNode1(id, list) {
  for (let i = 0; i < list.length; i++) {
    if(list[i].id == id) {
      return list[i]
    }
    if(list[i].child && list[i].child.length > 0) {
      let node = findTreeNode1(list[i].child)
      if(node) return node
    }
  }
  return null
}


function myCall(target, ...args) {
  let fn = this
  let symbol = Symbol()
  target[symbol] = fn
  let result = target[symbol](args)
  delete target[symbol]
  return result
}
