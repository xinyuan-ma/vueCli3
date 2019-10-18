import Vue from 'vue'
import index from './index.vue'
let toast = ''
console.log(11111)
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
