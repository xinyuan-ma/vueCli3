// //注意：数组下标是0~length-1
// //堆调整的范围由start~end
// function heapAdjust(arr, start, end) {
//   let heapTop = arr[start] //该元素将插入arr[start+1] ~ arr[end]的堆中，由于arr[start]还不确定插入哪里，所以先用变量保存
//   let i
//   for (i = 2 * start + 1; i <= end; i = 2 * i + 1) {
//     if (i + 1 <= end && arr[i] < arr[i + 1]) i = i + 1 //i+1<=length是为了确保arr[i+1]取值时，下标不越界，越界就会报错
//
//     if (heapTop > arr[i]) break
//     arr[start] = arr[i] //heapTop比子结点小，子节点往上移
//     start = i //注意:start一直更新着heapTop应该插入位置的下标
//   }
//   arr[start] = heapTop //来到这里说明heapTop应该插入这里
// }
// function createHeap(arr) {
//   let n = Math.floor(length / 2)
//   for (let i = n - 1; i >= 0; i--) {
//     //将arr[n-1]...arr[0]逐一进入堆中
//     heapAdjust(arr, i, length - 1)
//   }
// }
// function heapSort() {
//   createHeap(arr)
//   for (let i = length - 1; i > 0; i = i - 1) {
//     //进行length-1次将堆顶元素与未排序的序列最后一个元素进行交换，再进行堆调整，最终得到排序序列
//     let temp = arr[0]
//     arr[0] = arr[i]
//     arr[i] = temp
//     heapAdjust(arr, 0, i - 1) //第i位元素时已经排好序的元素，堆调整时不用再调整i-1后面的元素位置
//   }
//   console.log(arr)
// }
// var arr = [49, 38, 65, 97, 76, 13, 27, 49, 75, 165, -5]
// var length = arr.length
// heapSort()


// 交换两个节点
function swap(A, i, j) {
  let temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

// 将 i 结点以下的堆整理为大顶堆，注意这一步实现的基础实际上是：
// 假设 结点 i 以下的子堆已经是一个大顶堆，shiftDown函数实现的
// 功能是实际上是：找到 结点 i 在包括结点 i 的堆中的正确位置。后面
// 将写一个 for 循环，从第一个非叶子结点开始，对每一个非叶子结点
// 都执行 shiftDown操作，所以就满足了结点 i 以下的子堆已经是一大
//顶堆
function shiftDown(A, i, length) {
  let temp = A[i]; // 当前父节点
// j<length 的目的是对结点 i 以下的结点全部做顺序调整
  for(let j = 2*i+1; j<length; j = 2*j+1) {
    temp = A[i];  // 将 A[i] 取出，整个过程相当于找到 A[i] 应处于的位置
    if(j+1 < length && A[j] < A[j+1]) {
      j++;   // 找到两个孩子中较大的一个，再与父节点比较
    }
    if(temp < A[j]) {
      swap(A, i, j) // 如果父节点小于子节点:交换；否则跳出
      i = j;  // 交换后，temp 的下标变为 j
    } else {
      break;
    }
  }
}

// 堆排序
function heapSort(A) {
  // 初始化大顶堆，从第一个非叶子结点开始
  for(let i = Math.floor(A.length/2-1); i>=0; i--) {
    shiftDown(A, i, A.length);
  }
  // 排序，每一次for循环找出一个当前最大值，数组长度减一
  for(let i = Math.floor(A.length-1); i>0; i--) {
    swap(A, 0, i); // 根节点与最后一个节点交换
    shiftDown(A, 0, i); // 从根节点开始调整，并且最后一个结点已经为当
    // 前最大值，不需要再参与比较，所以第三个参数
    // 为 i，即比较到最后一个结点前一个即可
  }
}

let Arr = [49, 38, 65, 97, 76, 13, 27, 49, 75, 165, -5]
heapSort(Arr);
// console.log(Arr)



/**
 * @function 输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4
 * 时间复杂度： 先排序，再取前k个数，最小时间复杂度nlogn； 使用堆的话，时间复杂度为nlogk(这也是堆的最重要意义)
 * 思路：
 * 1）用n个整数，把前k个数构建一个大顶堆（大顶堆：所有子节点不大于父节点，根节点的值最大）
 * 2）从第k个数开始，和大顶堆的最大值进行比较，若比最大值小，交换两个数的位置，重新构建前k个数构建一个大顶堆
 * （目的是不断将最大值替换到最后）；比如用前k个数构建一次大顶堆，则这k个数中最大值就变成了根节点，然后跟节点又被后面的小值替换
 * 3）一次遍历之后大顶堆里的数就是整个数据里最小的k个数
 * */
function GetLeastNumbers(input, k) {
  if (k > input.length) {
    return [];
  }
  createHeap(input, k);
  for (let i = k; i < input.length; i++) {
    // 当前值比最小的k个值中的最大值小
    if (input[i] < input[0]) {
      [input[i], input[0]] = [input[0], input[i]];
      ajustHeap(input, 0, k);
    }
  }
  return input.splice(0, k);
}

// 构建大顶堆
function createHeap(arr, length) {
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) { // 堆中，父节点为i，则子节点为2*i+1、2*i+2；反过来，知道了子节点为length,则最后一个子节点为Math.floor(length / 2) - 1。
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
console.log(GetLeastNumbers([2, 7, 4, 5, 6], 3), 'get');
