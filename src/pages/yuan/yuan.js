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

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import FilterExcel from '../../components/FilterExcel'
// import XEUtils from 'xe-utils'

// import {install} from 'yjy-ui'

// console.log(install, 'install');

// install(Vue)
Vue.use(Table)
Vue.use(TableColumn)
// if (process.env.NODE_ENV !== 'production') {
const Vconsole = require('vconsole')
const vConsole = new Vconsole()
Vue.use(vConsole)
Vue.component(FilterExcel.name, FilterExcel)


Vue.use(VXETable)
// 创建一个实现Excel的筛选器
VXETable.renderer.add('FilterExcel', {
  // 不显示底部按钮，使用自定义的按钮
  isFooter: false,
  // 筛选模板
  renderFilter (h, renderOpts, params) {
    return [
      <filter-excel params={ params }></filter-excel>
  ]
  },
  // 重置数据方法
  filterResetMethod ({ options }) {
    options.forEach(option => {
      option.data = { vals: [], sVal: '', fMenu: '', f1Type: '', f1Val: '', fMode: 'and', f2Type: '', f2Val: '' }
    })
  },
  // 筛选数据方法
  filterMethod ({ option, row, column }) {
    const cellValue = XEUtils.get(row, column.property)
    const { vals, f1Type, f1Val } = option.data
    if (cellValue) {
      if (f1Type) {
        return cellValue.indexOf(f1Val) > -1
      } else if (vals.length) {
        // 通过指定值筛选
        return vals.includes(cellValue)
      }
    }
    return false
  }
})


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

console.log('加载main');

Vue.config.productionTip = false
// Vue.mixin(Mixin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
