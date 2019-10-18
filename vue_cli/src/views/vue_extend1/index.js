import Vue from 'vue'
import index from './index.vue'
let toast = ''
export default function () {
	if (toast) {
		return toast
	}
	let Constructor = Vue.extend(index)
	toast = new Constructor()
	toast.$mount()
	document.body.appendChild(toast.$el)
	return toast
}
