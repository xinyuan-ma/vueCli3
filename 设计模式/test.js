// 单例模式
class Single {
  constructor(name) {
    this.name = name
  }
  getName() {
    console.log(this.name);
  }
  static getInstance (name) {
    if(!this.instance) {
      this.instance = new Single(name)
    }
    return this.instance
  }
}

let single1 = Single.getInstance('1')
let single2 = Single.getInstance('2')
console.log(single1 === single2);

// 策略模式
let demo = {
  'demo1': function (value) {
    return value * 1
  },
  'demo2': function (value) {
    return value * 2
  }
}
function getDemo(type, value) {
  return demo[type](value)
}

console.log(getDemo('demo1', 1));
console.log(getDemo('demo2', 1));

/**
 * @type 代理模式
 * 虚拟代理实现图片的预加载
 * */
const relImage = (function () {
  let imageNode = document.createElement('img')
  document.body.appendChild(imageNode)
  return {
    setSrc: function (src) {
      imageNode.src = src
    }
  }
})()
const proxyImage = (function () {
  let image = new Image()
  image.onload = function () {
    setTimeout(() => {
      relImage.setSrc(image.src)
    }, 2000)
  }
  return {
    setSrc: function (src) {
      image.src = src
      relImage.setSrc('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3429961294,3288641148&fm=26&gp=0.jpg')
    }
  }
})()

proxyImage.setSrc('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F035%2F063%2F726%2F3ea4031f045945e1843ae5156749d64c.jpg&refer=http%3A%2F%2Fyouimg1.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620722264&t=0e694870625d3918bd8f17d3b7d36bd1')

/**
 * 缓存代理
 * */
function mult() {
  console.log(arguments, 'mult');
  let s = 1
  for (let i = 0, num; num=arguments[i] ; i++) {
    s = s*num
  }
  return s
}

const proxyMult = (function () {
  let cache = {}
  return function () {
    let tag = Array.prototype.join.call(arguments) // 将传入的参数转化成字符串
    if(cache[tag]) {
      return cache[tag]
    } else {
      cache[tag] = mult.apply(this, arguments) // 关键代码 使用apply 将proxyMult中的参数传给mult函数
    }
    console.log(cache);
    return cache[tag]
  }
})()
console.log(proxyMult(1, 2, 3));


/**
 * @type 迭代器模式
 * 迭代器模式  能够访问到对象的顺序和元素
 * */
function iterator(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn(i, arr[i])
  }
}

function compare(arr1, arr2) {
  iterator(arr1, function (key,value) {
    if(arr2[key] != value) {
     return console.log('不相等')
    }
    console.log('相等')
  })
}
compare([1,2,3], [1,2,3])

/**
 * @type 发布订阅模式
 * */
class Event {
  constructor() {
    this.event = {}
  }
  on(type, fn) {
    if(!this.event[type]) {
      this.event[type] = []
    }
    this.event[type].push(fn)
  }
  emit(type, ...args) {
    let list = this.event[type]
    for (let i = 0; i < list.length; i++) {
      list[i].apply(this, args)
    }
  }
}

let event = new Event()
event.on('click', function (a) {
  console.log(a);
})
event.on('click', function (a,b) {
  console.log(a,b);
})
event.emit('click', 1,2)

/**
 * @type 观察者模式
 * 当观察的数据对象发生变化时, 自动调用相应函数。比如 vue 的双向绑定;
 * */
let data = {
  name: 'ming',
  age: 18
}
Object.keys(data).forEach(key => {
  let value = data[key]
  Object.defineProperty(data, key, {
    get() {
      console.log('get');
      return value
    },
    set(newValue) {
      console.log('更新');
      value = newValue
    }
  })
})
data.name = '佩奇'
console.log(data.name);

/**
 * @type 装饰者模式  https://juejin.cn/post/6844903503266054157#heading-4
 * 适用场景： 动态地给函数赋能，在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法
 * */
Function.prototype.before = function (beforeFn) {
  let self = this // this指向func
  return function () {
    beforeFn.apply(this, arguments) // this指向windows
    return self.apply(this, arguments)
  }
}
Function.prototype.after = function (afterFn) {
  let self = this // this指向 before返回的函数
  return function () {
    let ret = self.apply(this, arguments) // this指向windows
    afterFn.apply(this, arguments)
    return ret
  }
}
var func = function() {
  console.log('2');
}
//func1和func3为挂载函数
var func1 = function() {
  console.log('1');
}
var func3 = function() {
  console.log('3');
}
func = func.before(func1).after(func3)
func()
