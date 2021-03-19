/**
 * @function 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个
 * @params{array} arr
 * @return{string} str
 * 思路:
 * a和b两个数字可以有两种组合：ab和ba，若ab<ba则ab应该排在ba前面，否则ab应该排在ba后面。
 * */
function printMinNumber(arr) {
  if(!arr || arr.length == 0) return null
  return arr.sort(compare).join('') // sort底层是快排
}
function compare(a,b) {
  let front = `${a}${b}`
  let after = `${b}${a}`
  console.log(front, after, 'front');
  return front - after
}

let arr = [3, 32, 321]
console.log(printMinNumber(arr), 'print');


function findAlone(str) {
  let arr = str.split('')
  let aloneArr = [...new Set(arr)]
  let val = ''
  for (let i = 0; i <=  aloneArr.length -1  ; i++) {
    if(arr.filter(item => item == aloneArr[i]).length == 1) {
      val = aloneArr[i]
      break
    }
  }
  return val ? arr.indexOf(val) : -1
}

let str = 'abcabcde'
console.log(findAlone(str), 'find');

/**
 * 找到字符串第一个不重复字符的下标
 * 思路: 使用map存储每个字符出现的次数
 *      第一次循环字符串，第二次循环map，找到map中第一个值为1的字符
 *      该方法时间复杂度和空间复杂度均为O(n), 从时间上来说，要比第一种方法快
 * */
function firstNotRepeatingChar(str) {
  if(!str) return -1
  let map = {}
  let arr = str.split('')
  arr.forEach(item => {
    let val = map[item]
    map[item] = val ? val + 1 : 1
  })
  for (let i = 0; i < arr.length  ; i++) { // 使用for循环的好处是可以中断
    if(map[arr[i]] == 1) {
      return i
    }
   }
  return -1
}

console.log(firstNotRepeatingChar(str), 'useMap');

/**
 * 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分
 * 思路: 设定两个指针
 *第一个指针start从数组第一个元素出发，向尾部前进
 *第二个指针end从数组的最后一个元素出发，向头部前进
 *start遍历到偶数，end遍历到奇数时，交换两个数的位置
 *当start>end时，完成交换
 * */
function exchangeOddEven(arr) {
  let start = 0
  let end = arr.length -1
  while (start < end) {
    while(arr[start]%2 === 1) {
      start ++
    }
    while(arr[end]%2 === 0) {
      end --
    }
    if(start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]] // 交换arr的对应位置的元素
    }
  }
  return arr
}

let test = [2,4,5,3,1]
console.log(exchangeOddEven(test), 'oddEven');

// 交换数组中的元素位置
function exchangeArr(start,end, arr) {
  [arr[start], arr[end]] = [arr[end], arr[start]]
}

function FindNumbersWithSum(arr, sum) {
  let small = 0
  let big = arr.length-1
  while (small < big) {
    let current = arr[small] + arr[big]
    console.log(current, 'current');
    if(current < sum) {
      small++
    } else if(current >sum) {
      big--
    } else if (current === sum) {
      console.log(small,big, 'big');
      return [arr[small] , arr[big]]
    }
  }
}

console.log(FindNumbersWithSum([1, 2, 3, 4, 5, 6, 7, 8, 9], 11), 'number');

/**
 * @function 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个
 * @params{array} arr
 * @return{string} str
 * 思路:
 * a和b两个数字可以有两种组合：ab和ba，若ab<ba则ab应该排在ba前面，否则ab应该排在ba后面。
 * */
function printMinNumber(arr) {
  if(!arr || arr.length == 0) return null
  return arr.sort(compare).join('') // sort底层是快排
}
function compare(a,b) {
  let front = `${a}${b}`
  let after = `${b}${a}`
  console.log(front, after, 'front');
  return front - after
}

console.log(printMinNumber([3, 32, 321]), 'print');


function findAlone(str) {
  let arr = str.split('')
  let aloneArr = [...new Set(arr)]
  let val = ''
  for (let i = 0; i <=  aloneArr.length -1  ; i++) {
    if(arr.filter(item => item == aloneArr[i]).length == 1) {
      val = aloneArr[i]
      break
    }
  }
  return val ? arr.indexOf(val) : -1
}

console.log(findAlone('abcabcde'), 'find');

/**
 * 找到字符串第一个不重复字符的下标
 * 思路: 使用map存储每个字符出现的次数
 *      第一次循环字符串，第二次循环map，找到map中第一个值为1的字符
 *      该方法时间复杂度和空间复杂度均为O(n), 从时间上来说，要比第一种方法快
 * */
function firstNotRepeatingChar(str) {
  if(!str) return -1
  let map = {}
  let arr = str.split('')
  arr.forEach(item => {
    let val = map[item]
    map[item] = val ? val + 1 : 1
  })
  for (let i = 0; i < arr.length  ; i++) { // 使用for循环的好处是可以中断
    if(map[arr[i]] == 1) {
      return i
    }
  }
  return -1
}

console.log(firstNotRepeatingChar(str), 'useMap');

/**
 * 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分
 * 思路: 设定两个指针
 *第一个指针start从数组第一个元素出发，向尾部前进
 *第二个指针end从数组的最后一个元素出发，向头部前进
 *start遍历到偶数，end遍历到奇数时，交换两个数的位置
 *当start>end时，完成交换
 * */
function exchangeOddEven(arr) {
  let start = 0
  let end = arr.length -1
  while (start < end) {
    while(arr[start]%2 === 1) {
      start ++
    }
    while(arr[end]%2 === 0) {
      end --
    }
    if(start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]] // 交换arr的对应位置的元素
    }
  }
  return arr
}

console.log(exchangeOddEven([2,4,5,3,1]), 'oddEven');


// 交换数组中的元素位置
function exchangeArr(start,end, arr) {
  [arr[start], arr[end]] = [arr[end], arr[start]]
}


/**
 * 输入一个正数S，打印出所有和为S的连续正数序列。例如：输入15，有序1+2+3+4+5 = 4+5+6 = 7+8 = 15 所以打印出3个连续序列1-5，5-6和7-8。
 * 思路:
 * 创建一个容器child，用于表示当前的子序列，初始元素为1,2
 * 记录子序列的开头元素small和末尾元素big
 * big向右移动子序列末尾增加一个数 small向右移动子序列开头减少一个数
 * 当子序列的和大于目标值，small向右移动，子序列的和小于目标值，big向右移动
 * */
function FindContinuousSequence(sum) {
  let result = []
  let child = [1,2]
  let big = 2
  let small = 1
  let currentSum = 3
  while(big < sum) { // big等于sum时，child中只剩一个数，不满足连续正数序列的要求，结束循环
    while (currentSum < sum && big < sum) {
      child.push(++big)
      currentSum += big // currentSum为当前child的和
    }
    while (currentSum > sum && small < big) {
      child.shift()
      currentSum -= small ++ // 因为删除了最小值，所以small也要响应变化，增加1
    }
    if(currentSum === sum && child.length > 1) { // child.length大于1，剔除一个数等于sum的情况
      result.push(child.slice()) // child.slice返回一个新的数组
      child.push(++big)
      currentSum += big
    }
  }
  return result
}

/**
 * 多个连续数字之和
 * 如【1,2,3,4,5】 =（1+5）*5/2
 * */
function sum(arr) {
  let length = arr.length
  return (arr[0] + arr[length-1])*length/2
}


/**
 * @function 扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。2-10为数字本身，A为1，J为11...大小王可以看成任何数字，可以把它当作0处理，数组中0表示大小王
 * 思路：
 * 1、先将数组从小到大排序, 如果有大小王，就会排到最前面
 * 2、用kingNum记录下大小王的个数
 * 3、计算出除了大小王以为的间隔差集总和
 * 4、大小王的个数 - 间隔差集总和， 如果>=0,表示连续，否则不连续(因为大小王可以当做任何数字，假如差集总和为2，但同时有两个王，也是连续的；假如差集为1或0，有1个或两个王，也是连续的)
 * */

function continuityNum(arr) {
  let kingNum = 0 // 大小王的个数
  let spaceNum = 0 // 所有间隔的总和
  arr.sort() // 进行sort排序，有两个作用： 1）将大小王放到最前面，不会出现大小王为倒数第二项而造成最后一项不被计算的情况  2）排序后，进行差集计算
  for (let i = 0; i < arr.length -1; i++) { // 注意范围arr.length -1，因为下面差集的计算方式为arr[i+1] - arr[i]；最后一项不需要再被减
    if(arr[i] === 0) {// 用0表示大小王
      kingNum ++
    } else {
      let space = arr[i+1] - arr[i] // 计算差集
      if(space == 0) {
        return
      } else {
        spaceNum += space -1
      }
    }
  }
  return kingNum - spaceNum >= 0 // 有几种情况，spaceNum为0,1,2; 只要大小王个数>=spaceNum 即可
}

console.log(continuityNum([1, 2, 3, 0, 0]), 'continuityNum');


/**
 * @function 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
 * 思路:
 * 使用一个map将遍历过的数字存起来，值作为key，下标作为值。(典型的空间换时间)
 对于每一次遍历：取map中查找是否有key为target-nums[i]的值如果取到了，则条件成立，返回。如果没有取到，将当前值作为key，下标作为值存入map
 时间复杂度：O(n) 空间复杂度O(n)
 * */
function twoNumAdd(arr, target) {
  if(Array.isArray(arr)) {
    let map = {}
    for (let i = 0; i < arr.length; i++) {
      if(map[target- arr[i]] != undefined) {
        return [map[target- arr[i]], i]
      } else {
        map[arr[i]] = i
      }
    }
  }
  return []
}

/**
 * @function 给定一个包含 n 个整数的数组nums，判断 nums 中是否存在三个元素a，b，c ，使得 a + b + c = 0 找出所有满足条件且不重复的三元组
 * 思路：
 * 题目中说明可能会出现多组结果，所以我们要考虑好去重
 1.为了方便去重，我们首先将数组排序
 2.对数组进行遍历，取当前遍历的数nums[i]为一个基准数，在寻找数组中设定两个起点，最左侧的left(i+1)和最右侧的right(length-1)，遍历数后面的数组为寻找数组
 4.判断nums[i] + nums[left] + nums[right]是否等于0，如果等于0，加入结果，并分别将left和right移动一位
 5.如果结果大于0，将right向左移动一位，向结果逼近
 5.如果结果小于0，将left向右移动一位，向结果逼近
 6.一轮遍历结束后，i++,进入下一轮查询
 注意整个过程中要考虑去重，时间复杂度为O(n²)
 * */
function findThree(arr, target) {
  arr.sort()
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if(i && arr[i] === arr[i-1]) continue // 跳过重复的arr[i]值, 比如[1,1,2],跳过第二个1
    let left = i+1
    let right = arr.length -1
    while (left < right) {
      let sum = arr[i] + arr[left] + arr[right]
      if(sum > target) {
        right --
      } else if(sum < target) {
        left ++
      } else {
        result.push([arr[i], arr[left ++], arr[right --]]) // arr[left ++], 先取arr[left]，然后left++, 两步合成一步； arr[right--]同样的逻辑
        while (arr[left] === arr[left-1]) { // 跳过重复的arr[left]值,
          left ++
        }
        while (arr[right] === arr[right + 1]) { // 跳过重复的arr[right]值
          right --
        }
      }
    }
  }
  return result
}
console.log(findThree([-1, 0, 1, 2, -1, -4], 0), 'result');


/**
 * @function 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0
 * 思路:
 * 该题和数组中，求两数之和为target的题一致，利用map,空间换时间
 * */
function findNumbers(arr) {
  let map = {}
  for (let i = 0; i < arr.length; i++) {
    let val = map[arr[i]]
    map[arr[i]] = val ? val + 1 : 1
    if(map[arr[i]] > arr.length/2) {
      return arr[i]
    }
  }
  return 0
}

console.log(findNumbers([1, 2, 3, 2, 2, 2, 5, 4, 2]), '1234');

function sum1(n) {
  return n ? sum1(n-1) + n : 0
}

console.log(sum1(3));

function findGroup(arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if(arr[j] > arr[i]) {
        result.push([arr[i], arr[j]])
      }
    }
  }
  return result
}
let list1 = [1,2,3,4]
console.log(findGroup(list1), 'findGroup');


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

/**
 * @function 打印矩阵(矩阵可以用二维数组表示)
 * 教程：https://blog.csdn.net/weixin_34116110/article/details/91434485
 *
 * */
function printMatrix(arr) {
  // map函数用来完成当前矩阵最外一圈的遍历
  // @param1{Array}二维数组 arr 表示当前矩阵
  // @param2{Array}一维数组 result 用来保存遍历结果
  let map = (arr, result) => {
    // 矩阵的高度即行数
    let n = arr.length
    // 遍历矩阵的每一行
    for(let i = 0; i < n; i++){
      // 若第一行 按顺序插入
      if(i === 0){
        result = result.concat(arr[i])
      } else if (i === n-1) {
        // 若最后一行 倒序插入
        result = result.concat(arr[i].reverse())
      } else {
        // 若中间行 插入该行最后一个元素 并将该元素从矩阵中删除
        result.push(arr[i].pop())
      }
    }
    // 将已经遍历的第一行和最后一行从矩阵中删除
    arr.pop()
    arr.shift()
    // 遍历插入最左侧一列 此时删除首位两行后矩阵高度已变为n-2
    for(let j = n - 3; j >= 0; j--){
      // 避免arr[j]长度为空时插入undefined
      if(arr[j].length){
        result.push(arr[j].shift())
      }
    }
    // 截止条件 矩阵有元素就继续递归
    if(arr.length){
      // 把已将遍历元素删除的矩阵进行递归
      return map(arr, result)
    }else{
      return result
    }
  }
  // 将初始矩阵传入, 保存结果的数组初始为空
  return map(arr, [])
}

let matrix = [
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
]

console.log(printMatrix(matrix), 'matrix');

/**
 * @function 给定一个包含 n 个整数的数组nums，判断 nums 中是否存在四个元素a，b，c，d ，使得 a + b + c + d = 0 ？找出所有满足条件且不重复的四元组。注意：答案中不可以包含重复的四元组。
 * 思路：
 * 到这里其实我们就能发现一些规律，我们可以像三数之和那样，我们可以通过大小指针来逼近结果，从而达到降低一层时间复杂度的效果（重点：将4个数相加，转化为三个数，降低层级）
 * 不管是几数之和，我们都用这种方法来进行优化
 * */
function findFour(arr, target) {
  if(arr.length < 4) return []
  let result = []
  arr.sort()
  for (let i = 0; i < arr.length -3; i++) { // 注意范围，起始值最小值是倒数第4位
    if(i && arr[i] === arr[i-1]) continue // 跳过数组中，重复的起始值
    if(arr[i] + arr[i+1] + arr[i+2] + arr[i+3] > target) break // 因为数组已进行排序，所有一旦超过模板值，那么以后的值也都比目标值大，所以可以直接结束循环
    for (let j = i+1; j < arr.length -2; j++) { // 注意范围，第二个值的最小值是倒数第3位（以下的代码和三个数求和的逻辑一致）
      if(j > i+1 && arr[j] === arr[j-1]) continue // 跳过数组中，第二个值重复的
      let left = j+1 // 第三个数的下标
      let right = arr.length -1
      while (left < right) {
        let sum = arr[i] + arr[j] + arr[left] + arr[right]
        if(sum > target) {
            right --
        } else if (sum < target) {
          left ++
        } else {
          result.push([arr[i], arr[j], arr[left++], arr[right--]]) // 重点，注意添加后，left++， right--, 确保循环继续执行（坑点，这里耽误了半天时间）
          while (arr[left] === arr[left -1]) { // 跳过重复的值
            left ++
          }
          while (arr[right] === arr[right+1]) { // 跳过重复的值
            right --
          }
        }
      }
    }
  }
  return result
}

console.log(findFour([-2, -1, -1, 0, 1, 1, 2, 3], 0), 'four');
