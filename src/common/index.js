/**
 * 格式化时间显示，补零对齐
 * eg：2:4  -->  02:04
 * @param {string} value - 形如 h:m:s 的字符串
 */
export function formatTimeStr (value) {
	var time = ''
	var s = value.split(':')
	var i = 0
	for (; i < s.length - 1; i++) {
		time += s[i].length === 1 ? ('0' + s[i]) : s[i]
		time += ':'
	}
	time += s[i].length === 1 ? ('0' + s[i]) : s[i]

	return time
}

/**
 * 异步加载js
 * @param {string} url 加载的url地址
 * @param {boolean} isLoadScript 是否强制加载
 */

export const asyncLoadJs = (url, isLoadScript) => {
	return new Promise((resolve, reject) => {
		if (!isLoadScript) {
			let srcArr = document.getElementsByTagName('script');
			let hasLoaded = false, aTemp = [];
			for (let i = 0; i < srcArr.length; i++) { // 判断当前js是否加载上
				if (srcArr[i].src) {
					aTemp.push(srcArr[i].src)
				}
			}
			hasLoaded = aTemp.indexOf(url) > -1
			if (hasLoaded) {
				resolve();
				return;
			}
		}

		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		document.body.appendChild(script);
		script.onload = () => {
			resolve();
		};
		script.onerror = () => {
			// reject();
		};
	});
}

// let obj = {
//   name: 'yuan',
//   arr: [1, [2, 3], 4],
//   fn: function () {
//     console.log('fn');
//   },
//   un: undefined,
//   nul: null,
//   reg: /boo/i
// }
// obj.test = obj

// yuan.js?0fad:79 Uncaught RangeError: Maximum call stack size exceeded
// 死循环

// let obj1 = deepClone(obj)
// obj1.arr = [1]
// console.log(obj, obj1, '123');

/**
 * 深拷贝
 * @param {any} val 要拷贝的数据(最终解决方案，可以拷贝所有的数据，包括自身和原型的)
 * @param {object} map weakMap用于记录已拷贝的对象，解决对象的属性直接的引用了自身的情况，避免循环调用
 */

export function deepClone(val, map = new WeakMap()) {
  // RegExp 和 Date 这两种类型 typeof date 为 ’object‘ 但这两种类型不可便利，即不能使用for in方法，要单独处理
  if (val instanceof Date) return new Date(val)
  if (val instanceof RegExp) return new RegExp(val)
  if (val === null) return null // typeof null 为’object‘，但是null没有constructor属性，直接返回null
  if (typeof val == 'object') {
    // weakMap对象里，放的是键值对，key值必须是对象，不可以便利，使用set get方法设置和获取对应的值，
    // 使用weakMap 是解决对象循环调用的情况，如obj.test = obj，如果不使用map，函数递归时会一直循环调用，进入死循环
    // weakMap的好处时，键是弱引用，便于垃圾回收器回收
    if (map.get(val)) return map.get(val) // 先判断key是否已有该对象，就是解决obj.test = obj，循环调用的情况
    let target = new val.constructor() // 复制一个新对象，包含之前原型的引用
    map.set(val, target) // 存储要处理的对象，便于以后查找
    for(let key in val) { // 获取对象的key集合，包括对象和数组
      if (val.hasOwnProperty(key)) { // 判断key是否对该对象自身的属性，不包括原型上的属性
        target[key] = deepClone(val[key], map) // 这一步是关键，对象所有要赋值的数据都通过该函数处理，还要传递map，即整个递归过程，只生成一个weakmap对象
      }
    }
    return target
  } else {
    return val
  }
}
