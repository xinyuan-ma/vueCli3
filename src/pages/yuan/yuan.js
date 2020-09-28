import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Mixin from './mixin'
import "babel-polyfill"

import 'animate.css'
import '@/style/reset.css'
import '@/style/main.css'
import '@/style/flexible.less'
import '@/views/vue_extend/index.js'
import '@/views/vue_extend1/toast.js'
import {
  Table,
  TableColumn
} from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
// if (process.env.NODE_ENV !== 'production') {
const Vconsole = require('vconsole')
const vConsole = new Vconsole()
Vue.use(vConsole)

// }
function fa() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log('fn')
      resolve(22)
    }, 1000)
  })
}

let task = [fa]

function fn1(task) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      task.forEach(item => {
        resolve(item())
      })
    }, 1000)
  })
}


async function ff() {
  let a = await fn1(task)
  // console.log(a)
}

ff()

Vue.config.productionTip = false
// Vue.mixin(Mixin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



