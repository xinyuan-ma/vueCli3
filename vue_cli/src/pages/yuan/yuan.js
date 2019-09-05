import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Mixin from './mixin'
import 'animate.css'
import '@/style/reset.css'
import '@/style/main.css'
import '@/style/flexible.less'
// if (process.env.NODE_ENV !== 'production') {
const Vconsole = require('vconsole')
const vConsole = new Vconsole()
Vue.use(vConsole)
// }
Vue.config.productionTip = false
// Vue.mixin(Mixin)
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
