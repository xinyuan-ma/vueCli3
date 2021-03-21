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
console.log(Arr)
