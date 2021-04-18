/**
 * 设计模式比较全，案例简单  https://juejin.cn/post/6844903607452581896
 * 案例以及对应模式的应用场景 https://juejin.cn/post/6844903918330347533#heading-3
 */

/**
 * @type 单例模式
 * 确保只有一个实例、可以全局访问
 *
 * 应用案例：弹框
 * */
class Single {
  constructor(name) {
    this.name = name
  }
  getName() {
    console.log(this.name);
  }
  static getInstance (name) { // 静态方法
    if(!this.instance) { // 关键代码 this指向的是Single这个构造函数，构造函数也是一个对象，相当于在Single这个对象上添加了一个instance属性
      this.instance = new Single(name)
    }
    return this.instance
  }
}

let single1 = Single.getInstance('1')
let single2 = Single.getInstance('2')
console.log(single1 === single2);

/**
 * @type 根据不同的类型执行不同的策略
 * 策略模式一般要用到复杂函数
 * */
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
proxyImage.setSrc('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2530486543,113586312&fm=26&gp=0.jpg')

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
event.on('click', function (a) {console.log(a);})
event.on('click', function (a,b) {console.log(a,b);})
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
function fuc() {
  console.log(2);
}
Function.prototype.before = function (beFn) {
  let self = this
  return function () {
    beFn.apply(this, arguments) // 先执行插入到前面的方法，类似于二叉树的前序遍历
    return self.apply(this, arguments) // 后执行当前的方法
  }
}
Function.prototype.after = function (afFn) {
  let self = this
  return function () {
    self.apply(this,arguments) // 先执行当前的方法
    return afFn.apply(this,arguments) // 后执行插入到后面的方法
  }
}

function fuc1() {
  console.log(1);
}
function fuc3() {
  console.log(3);
}
function fuc4() {
  console.log(4);
}

fuc = fuc.before(fuc1).before(fuc4).after(fuc3)
fuc()

/**
 * @type 装饰者模式
 * 原理：为对象添加新功能；不改变其原有的结构和功能，即原有功能还继续会用，且场景不会改变。
 * 案例：在原来方法的基础上去装饰一些针对特别场景所适用的方法，即添加一些新功能
 * 案例教程： https://juejin.cn/post/6844903918330347533#heading-18
 * */
class Dop {
  constructor() {}
  draw () {
    console.log('draw');
  }
}
class Decorator {
  constructor(obj) {
    this.obj = obj
  }
  draw () {
    this.obj.draw()
    this.append()
  }
  append () {
    console.log('append');
  }
}

let dre = new Dop()
let dec = new Decorator(dre)
dec.draw() // 它重写了实例对象的draw方法，给其方法新增了一个setRedBorder()，因此最后为其输出结果进行了装饰


/**
 * @type 组合模式
 *
 * 组合模式在对象间形成树形结构;
   组合模式中基本对象和组合对象被一致对待;
   无须关心对象有多少层, 调用时只需在根部进行调用;
 **/
class Combine {
  constructor() {
    this.list = []
  }
  add(fn) {
    this.list.push(fn)
    return this // 链式调用
  }
  excute() {
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].excute()
    }
  }
}
let comb1 = new Combine()
comb1.add({excute () {console.log(1);}}).add({excute () {console.log(2);}})

let comb2 = new Combine()
comb2.add({excute () {console.log(3);}}).add({excute () {console.log(4);}})

let comb3 = new Combine()
comb3.add({excute () {console.log(5);}}).add({excute () {console.log(6);}})
comb2.add(comb3)

let comb4 = new Combine()
comb4.add(comb1).add(comb2)
console.log(comb4, 'comb4');
comb4.excute()

/**
 * @type 工厂模式：工厂模式最直观的地方在于，创建产品对象不是通过直接new产品类实现，而是通过工厂方法实现。
 * 1、将 new 操作单独封装，只对外提供相应接口（直观的表现生成一个对象，没有看到new的过程）
 * 2、遇到new 时，就要考虑是否应该使用工厂模式
 *
 * 应用场景
 * 使用jquery时，直接用window.$很方便，不需要自己调用new jQuery。底层已经将new出来的对象挂载到window.$上， 代码： window.$ = function(selector) {return new jQuery(selector)}
 * */
class Car {
  constructor(name, color) {
    this.name = name
    this.color = color
  }
}
class Factory {
  static create (type) {
    switch (type) {
      case 'car': return new Car('汽车', '白色'); break;
      case 'bicycle': return new Car('自行车', '白色'); break;
      default: console.log('没有该类型');
    }
  }
}
let p1 = Factory.create('car')
let p2 = Factory.create('bicycle')
console.log(p1, p1 instanceof Car, 'Factory');
console.log(p2, p2 instanceof Car, 'Bicycle');

