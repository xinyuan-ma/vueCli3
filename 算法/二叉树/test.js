function Node(data, left=null, right=null) {
  this.data = data
  this.left = left
  this.right = right
}
Node.prototype = {
  show () {
    console.log(this.data);
  }
}
function Tree() {
  this.root = null
}

Tree.prototype = {
  insert (data) {
    var node = new Node(data, null, null);
    if (!this.root) {
      this.root = node;
      return;
    }
    var current = this.root;
    var parent = null;
    while (current) {
      parent = current;
      if (data < parent.data) {
        current = current.left;
        if (!current) {
          parent.left = node;
          return;
        }
      } else {
        current = current.right;
        if (!current) {
          parent.right = node;
          return;
        }
      }
    }
  },
  preOrder (node) {
    if (node) {
      node.show()
      this.preOrder(node.left)
      this.preOrder(node.right)
    }
  },
  middleOrder (node) {
    if (node) {
      this.middleOrder(node.left)
      node.show()
      this.middleOrder(node.right)
    }
  },
  laterOrder (node) {
    if (node) {
      this.laterOrder(node.left)
      this.laterOrder(node.right)
      node.show()
    }
  },
  getMin() {
    var current = this.root
    while (current) {
      if (!current.left) {
        return current
      }
      current = current.left
    }
  },
  getMax() {
    var current = this.root
    while (current) {
      if (!current.right) {
        return current
      }
      current = current.right
    }
  },
  getDeep (node, deep =0) {
    if (!node) {
      return deep
    }
    deep ++
    let left = this.getDeep(node.left, deep)
    let right = this.getDeep(node.right, deep)
    return Math.max(left, right)
  }
}


var t = new Tree()
// t.insert(5)
// t.insert(3)
// t.insert(6)
// t.insert(2)
// t.insert(4)
// t.insert(7)
// t.insert(8)
// t.insert(1)
// t.insert(9)

function getNode(data,node) {
  if (node) {
    if (data === node.data) {
      return node
    } else if (data < node.data) {
      return this.getNode(data, node.left)
    } else {
      return this.getNode(data, node.right)
    }
  } else {
    return null
  }
}

var nums = [2,1,3];

for (let i = 0; i < nums.length; i++) {
  t.insert(nums[i])
}
console.log(t, 't');

// t.laterOrder(t.root)
// console.log(getNode(3, t.root), 'node');

var inorderTraversal = function (root, array = []) {
  if (root) {
    inorderTraversal(root.left, array);
    array.push(root.data);
    inorderTraversal(root.right, array);
  }
  return array;
};

// 递归实现中序遍历
function middleOrder(node, array = []) {
  if (node) {
    middleOrder(node.left, array)
    array.push(node.data)
    middleOrder(node.right, array)
  }
  return array
}

// 非递归实现中序遍历
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

function preTraversal(node) {
  let result = []
  let stack = []
  let current = node
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      result.push(current.data)
      current = current.left
    }
    current = stack.pop()
    current = current.right
  }
  return result
}


console.log(middleOrder(t.root));
console.log(middleTraversal(t.root));
console.log(preTraversal(t.root));

function reconstruction (pre, mid) {
  if (pre.length == 0) {
    return null
  }
  if (pre.length == 1) {
    return new Node(pre[0])
  }
  let value = pre[0]
  let index = mid.indexOf(value)
  let midLeft = mid.slice(0, index)
  let midRight = mid.slice(index+1)
  let preLeft = pre.slice(1, index+1)
  let preRight = pre.slice(index+1)
  let node = new Node(value)
  node.left = reconstruction(preLeft, midLeft)
  node.right = reconstruction(preRight, midRight)
  return node
}

// 重建二叉树
function reConstructBinaryTree(pre, vin) {
  if(pre.length === 0){
    return null;
  }
  if(pre.length === 1){
    return new Node(pre[0]);
  }
  const value = pre[0];
  const index = vin.indexOf(value);
  const vinLeft = vin.slice(0,index);
  const vinRight = vin.slice(index+1);
  const preLeft = pre.slice(1,index+1);
  const preRight = pre.slice(index+1);
  const node = new Node(value);
  node.left = reConstructBinaryTree(preLeft, vinLeft);
  node.right = reConstructBinaryTree(preRight, vinRight);
  return node;
}

let pre = [1,2,4,7,3,5,6,8]
let vin = [4,7,2,1,5,3,8,6]
console.log(reconstruction(pre, vin), 123);
console.log(reConstructBinaryTree(pre, vin), 123);

// 判断二叉树是否对称（左子树的左节点和对应的右子树的右节点相同，同理左子树的右节点）
function symmetrical(node1,node2) {
  if (!node1 && !node2 ) {
    return true
  }
  if (!node1 || !node2) {
    return false
  }
  if (node1.data != node2.data) {
    return false
  }
  return symmetrical(node1.left, node2.right) && symmetrical(node1.right, node2.left)
}

// 二叉树的景象，思路：递归交换二叉树所有节点左右节点的位置。
function mirror(root) {
  if (root) {
    let temp = root.left
    root.left = root.right
    root.right = temp
    mirror(root.left)
    mirror(root.right)
  }
}

// 序列化 注意：所有的子节点后序列化为# #
// 先序遍历[2,1,3] 序列化后的值为 2,1，#，#，3,#,#
function serialize(root, arr=[]) {
  if(!root) {
    arr.push('#')
  } else {
    arr.push(root.data)
    serialize(root.left, arr)
    serialize(root.right, arr)
  }
  return arr.join(',')
}

console.log(serialize(t.root), 'serialize');

function deTravel(arr) {
  let node = null
  const current =  arr.shift()
  if (current != '#') {
    node = {data: current}
    node.left = deTravel(arr)
    node.right = deTravel(arr)
  }
  return node
}
