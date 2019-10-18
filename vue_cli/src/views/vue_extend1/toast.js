// 这是打开toast弹框的第二种方法，重点是直接通过实例调用其方法
// 注意点: Vue.extend 生成vue实例的构造函数， 生成的实例必须调用$mount()
// index.js 改方法返回的是一个toast 实例，直接通过实例调用method中的openShow方法，将this.show = true，从而将组件打开

import toast from './index.js'
let toastDom = toast()
toastDom.openShow()
