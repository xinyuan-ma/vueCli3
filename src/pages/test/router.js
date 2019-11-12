import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
// import Title from 'components/title/title.vue'
const Title = r => require.ensure([],
	() => r(require('@/components/title/title.vue')), 'title')
const Home = r => require.ensure([], () => r(require('@/views/Home.vue')),
	'home')
const People = r => require.ensure([], () => r(require('@/views/people.vue')),
	'people')
const MobileScroll = r => require.ensure([],
	() => r(require('@/views/mobileScroll/mobileScroll.vue')), 'mobileScroll')
Vue.use(Router)

export default new Router({
	// mode: 'history',
	// base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/title',
			name: 'title',
			component: Title
		},
		{
			path: '/people',
			name: 'people',
			component: People
		},
		{
			path: '/mobileScroll',
			name: 'mobileScroll',
			component: MobileScroll
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
		}
	]
})
