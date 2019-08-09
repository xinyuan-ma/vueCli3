import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
// import Title from 'components/title/title.vue'
const Directive = () => import(/* webpackChunkName: "directive" */ '@/views/directive_demo.vue')
const ScrollTest = () => import(/* webpackChunkName: "directive" */ '@/views/scrollTest.vue')
const PhotoLiu = () => import(/* webpackChunkName: "directive" */ '@/views/photoLiu.vue')
Vue.use(Router)

export default new Router({
  // mode: 'history', // http://localhost:8081/yuan/#/
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'scrollTest',
      component: ScrollTest
    },
    {
      path: '/directive',
      name: 'directive',
      component: Directive
    },
    {
      path: '/photoLiu',
      name: 'photoLiu',
      component: PhotoLiu
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
