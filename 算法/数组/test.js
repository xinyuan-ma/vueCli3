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
