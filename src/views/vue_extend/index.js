// 注意点: Vue.extend 生成vue实例的构造函数， 生成的实例必须调用$mount()
// 原理： 将toast方法加到vue的原型中，组件中使用this.$toast 就可以调用toast弹框
import Vue from 'vue'
import index from './index.vue'
let toast = ''
Vue.prototype.$toast = ({ content }) => {
	if (toast) {
		return toast
	}
	let Constructor = Vue.extend(index)
	toast = new Constructor({
		data: function () {
			return {
				content: content
			}
		}
	})
	toast.$mount()
	document.body.appendChild(toast.$el)
}
