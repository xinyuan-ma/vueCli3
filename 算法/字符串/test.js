/**
 * @function 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。 例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。
 * 教程：https://blog.csdn.net/weixin_40271182/article/details/84307076
 *      http://www.conardli.top/docs/dataStructure/%E5%AD%97%E7%AC%A6%E4%B8%B2/%E8%A1%A8%E7%A4%BA%E6%95%B0%E5%80%BC%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2.html#%E9%A2%98%E7%9B%AE
 *
 * 思路：
*      1 e/E后面必须跟数字，且只能有一个e/E；
       2 第一次出现的符号（+/-）要么在开头，要么紧接在e/E后面，第二次出现的符号（+/-）只能在e/E后面；
       3 小数点只能出现一次，并且只能出现在e/E前面；
       4 不能出现除了0~9 +/- . e/E以外的字符
 * */
function isNumeric(s) {
  if (s == undefined) {
    return false;
  }
  let hasPoint = false;
  let hasExp = false;
  for (let i = 0; i < s.length; i++) {
    const target = s[i];
    if (target >= 0 && target <= 9) { // 数字直接跳过
      continue;
    } else if (target === 'e' || target === 'E') { // e或E表示科学计数法
      if (hasExp || i === 0 || i === s.length - 1) { // e只能出现1次，且不能出现在开头或最后
        return false;
      } else {
        hasExp = true; // 第一次出现，hasExp改成true
        continue;
      }
    } else if (target === '.') {
      if (hasPoint || hasExp) { // .只能出现一次，并且只能出现在e前面；如果hasExp为true,表示前面已出现，不符合规范
        return false;
      } else {
        hasPoint = true;
        continue;
      }
    } else if (target === '-' || target === '+') {
      if (i === 0 || s[i - 1] === 'e' || s[i - 1] === 'E') { // - + 要么在开头，要么紧接在e/E后面
        continue;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

console.log(isNumeric('1E-16'));


/**
 * @function 将字符串中的空格全部替换成‘%20’，如字符‘1 2 3’，替换成‘1%202%203’
 * */
function replaceStr1(str) { // 利用split先把字符串分割成字符串数组，然后再用join组合成字符串
  if(!str) return null
  return str.split(' ').join('%20')
}
function replaceStr2(str) { // 利用正则 进行替换
  return str.replace(/\s/g, '%20')
}

/**
 * @function 拓展: 将字符串中连续的空格替换成一个“%20”
 * */
function replaceAllStr(str) { // 利用正则，+表示多个，如/a+/ 表示多个a
  return str.replace(/\s+/g, '%20')
}

/**
 * @function 找到字符串中第一次出现一次的字符
 * 思路：使用map存储字符串每个字符出现的次数
 * 重点：拿到map时，如何查找到第一个字符，最简单的就是再循环一遍字符串，然后匹配map，返回第一个出现一次的字符
 * */
function findFirst(str) {
  if(!str) return null
  let map = {}
  for (let i = 0; i < str.length; i++) {
    let val = map[str[i]]
    if(val) {
      map[str[i]] = val + 1
    } else {
      map[str[i]] = 1
    }
  }
  for (let i = 0; i < str.length; i++) {
   if(map[str[i]] == 1) return str[i]
  }
}

console.log(findFirst('abbadde'), 'first');

/**
 * @function 输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba
 * 思路： 利用回溯法（将删除的元素递归后，重新添加到数据中）
 * 1、每次递归，固定开头的字母，比如abc，先固定a,然后交换bc的位置，拿到两个结果 abc acb
 * 2、然后利用回溯法，交换字符串位置，比如abc递归一轮后，位置变化为 bca
 * 3、第二轮，固定b，然后交换ca的位置，拿到两个结果 bca bac
 * 4、同理，依次将字符串中的字符放到头部，并固定，拿到所有情况的结果
 * */
function searchGroup(str) {
  if(!str) return null
  let list = []
  let current = ''
  let temp = ''
  let queue = str.split('')
  findStrGroup(current, queue, temp, list)
  return [...new Set(list)] // 这里去重是解决str中有重复的字母，比如str为'aacd'
}
function findStrGroup(current, queue, temp, list) {
  current += temp
  if(queue.length ===0) { // 递归的出口，将对应结果添加到list中
    return list.push(current)
  }
  for (let i = 0; i < queue.length; i++) {
    temp = queue.shift() // 每次递归 固定第一个字符
    findStrGroup(current, queue, temp, list)
    queue.push(temp) // 将删除的temp 重新添加到queue尾部，实现将数组反转的效果，如[a,b,c]反转为[c,b,a]
  }
}
console.log(searchGroup('abcd'));
/**
 * @function 请实现一个函数用来匹配包括'.'和''的正则表达式。 模式中的字符'.'表示任意一个字符，而''表示它前面的字符可以出现任意次（包含0次）。 在本题中，匹配是指字符串的所有字符匹配整个模式。 例如，字符串"aaa"与模式"a.a"和"abaca"匹配，但是与"aa.a"和"ab*a"均不匹配
 * 思路：（重点处理模式中的第二个字符是“*”时的情况）
 *  当模式中的第二个字符不是“*”时：
 1、如果字符串第一个字符和模式中的第一个字符相匹配，那么字符串和模式都后移一个字符，然后匹配剩余的。
 2、如果 字符串第一个字符和模式中的第一个字符相不匹配，直接返回false。

 而当模式中的第二个字符是“*”时：
 如果字符串第一个字符跟模式第一个字符不匹配，则模式后移2个字符，继续匹配。
 如果字符串第一个字符跟模式第一个字符匹配，可以有3种匹配方式：
  1、模式后移2字符，相当于x*被忽略；  例如ab 匹配 a*ab 这种情况
  2、字符串后移1字符，模式后移2字符； 例如ab 匹配 a*b 这种情况
  3、字符串后移1字符，模式不变，即继续匹配字符下一位，因为*可以匹配多位  例如aaab 匹配 a*b 这种情况
 * */

function match(s, pattern) {
  if(s==undefined || pattern==undefined) return false
  return matchStr(s, pattern, 0, 0)
}
function matchStr(s, pattern, sId, pId) {
  if(sId == s.length && pId == pattern.length) {
    return true
  }
  if(sId !== s.length && pId === pattern.length) {
    return false
  }
  if(pId + 1 < pattern.length && pattern[pId+1] === '*') {
    if(sId < s.length && (s[sId === pattern[pId]] || pattern[pId] === '.')) {
      return matchStr(s, pattern, sId, pId + 2) ||
        matchStr(s, pattern, sId+1, pId + 2) ||
        matchStr(s, pattern, sId+1, pId)
    } else {
      return matchStr(s, pattern, sId, pId +2)
    }
  }
  if(sId < s.length && (s[sId] === pattern[pId] || pattern[pId] ==='.')) {
    return matchStr(s, pattern, sId+1, pId +1)
  }
  return false
}

console.log(match('aaa', 'ab*ac*a'));


