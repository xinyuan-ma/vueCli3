/**
 * @function 冒泡排序
 * 时间复杂度为： O(n²)
 * 原理：
 * 1、比较相邻的元素。如果第一个比第二个大，就交换他们两个。依次类推，一趟下来将最大值放到最后
 * 2、确定比较的趟数，比如比如有6个数，就需要比较5趟，但是每一趟比较的次数，是递减的，范围为length -i-1（之前已比较出的值不再参与以后的比较）
 * 教程：https://blog.csdn.net/qq_38845858/article/details/93890367
 *      https://www.jianshu.com/p/2fd84fadab5f
 * */
function bubbleSort(arr) {
  let length = arr.length
  for (let i = 0; i < length; i++) { // 每轮循环找出当前范围的最大值
    for (let j = 0; j < length - i - 1; j++) { // 注意范围：每次循环，范围length -i-1（范围去掉之前已找到的最大值）
      if (arr[j] > arr[j + i]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]] // 交换位置
      }
    }
  }
  return arr
}

/**
 * @function 快速排序
 * 时间赋值度为O(nlogn)，空间复杂度为O(1)
 * 教程：https://www.jianshu.com/p/efd2484e8c05
 * 思路：
 * 1、以第一个元素或最后一个元素为基准值，将数组分成两部分，一部分比基准值小，另一部分比基准值大（比基准小的放到左边，比基准大的放到右边）
 * 2、将基准值放到中间对应的位置
 * 3、然后将这两部分数据也按照此方法递归进行排序
 *
 * 重点在于： 如何将数组分成两部分（在不创建新的数据情况下）
 * */
function fastSort(arr) {
  function sort(arr, start = 0, end = arr.length - 1) {
    if (start >= end) {
      return arr
    }
    let i = start
    let j = end
    let base = arr[j]
    while (i < j) {
      while (i < j && arr[i] < base) { // 找到左侧第一个大于基准值的下标
        i++
      }
      arr[j] = arr[i] // 将大于基准值放置到当前范围的最后
      while (i < j && arr[j] > base) { // 找到右侧第一个小于基准值的下标
        j--
      }
      arr[i] = arr[j] // 将小于基准值放置到当前范围的最前面
    }
    arr[j] = base // 将基准值放到中间位置，此时左侧都比基准值小，右侧都比基准值大（此时j等于i，就是基准值要放的位置）
    sort(arr, start, j - 1)
    sort(arr, j + 1, end)
  }
  sort(arr)
  return arr
}

let list = [7, -2, 4, 1, 6, 5, 0, -4, 2]
// console.log(fastSort(list));

/**
 * @function 快递排序，代码逻辑简单但空间复杂度较高，时间复杂度为O(nlogn)
 * 教程：https://www.jianshu.com/p/c6e51a046d67
 * 思路：
 * 1.以一个数为基准(中间的数)，比基准小的放到左边，比基准大的放到右边
 * 2.再按此方法对这两部分数据分别进行快速排序（递归进行）
 * 3.不能再分后退出递归，并重新将数组合并
 * */
function quickSort(arr) {
  if(arr.length <=1) {
    return arr
  }
  let mid = Math.floor(arr.length/2)
  let base = arr.splice(mid, 1)[0]
  let left = []
  let right = []
  arr.forEach(item => {
    if(item < base) {
      left.push(item)
    } else {
      right.push(item)
    }
  })
  return quickSort(left).concat([base], quickSort(right))
}

// console.log(quickSort(list));


/**
 * @function 选择排序
 * 时间复杂度为： O(n²)， 空间复杂度O(1)
 * 教程：https://www.jianshu.com/p/2237c41f099f
 * 思路：
 * 1、同冒泡排序类似，两层for循环，不同点在于，选择排序，每趟目的是找到最大（或最小值），将最值存放在起始位置
 * 2、然后将剩余元素中继续重复上述操作
 * */
function chioceSort(arr) {
  if(!arr) return arr
  let length = arr.length
  for (let i = 0; i < length -1; i++) { // 注意结束范围length-1, 不包含最后一个元素
    let min = i
    for (let j = i+1; j < length; j++) { // 注意开始范围 i+1
      if(arr[j]<arr[min]) {
        min = j
      }
    }
    if(min != i) {
      [arr[i], arr[min]] = [arr[min], arr[i]] // 将最值放置到起始位置
    }
  }
  return  arr
}

console.log(chioceSort([9, 3, -8, 2, 12]));


/**
 * @function 归并排序 教程：https://www.jianshu.com/p/e3cb5423f89c
 * */
function mergeSort(arr) {
  if(arr.length <= 1) return arr
  let mid = Math.floor(arr.length)/2
  let left = mergeSort(arr.slice(0, mid))
  let right = mergeSort(arr.slice(mid))
  return merge(left, right)
}
function merge(left, right) {
  let result = []
  let leftIndex = rightIndex = 0
  while (leftIndex < left.length && rightIndex < right.length) {
    if(left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex ++
    } else {
      result.push(right[rightIndex])
      rightIndex ++
    }
  }
  result = result.concat(left.slice(leftIndex))
  result = result.concat(right.slice(rightIndex))
  return result
}

console.log(mergeSort([1, 8, 6, 2, 4, 7, 9, 10]), 'merge');



















