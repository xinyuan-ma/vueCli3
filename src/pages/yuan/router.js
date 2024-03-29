import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
// import Title from 'components/title/title.vue'
const Directive = () => import(/* webpackChunkName: "directive" */ '@/views/directive_demo.vue')
const Dropdown = () => import(/* webpackChunkName: "directive" */ '@/views/dropDown.vue')
const ScrollTest = () => import(/* webpackChunkName: "directive" */ '@/views/scrollTest.vue')
const PhotoLiu = () => import(/* webpackChunkName: "directive" */ '@/views/photoLiu.vue')
const OrderPhotoLiu = () => import(/* webpackChunkName: "directive" */ '@/views/orderPhotoLiu.vue')
const SpritePhoto = () => import(/* webpackChunkName: "directive" */ '@/views/spritePhoto')
const AudioTest = () => import(/* webpackChunkName: "directive" */ '@/views/audioTest.vue')
const VideoDemo = () => import(/* webpackChunkName: "directive" */ '@/views/videoDemo')
const Commit = () => import(/* webpackChunkName: "directive" */ '@/views/commit_animation')
const MapHot = () => import(/* webpackChunkName: "directive" */ '@/views/map-hot/index.vue')
const Iconfont = () => import(/* webpackChunkName: "directive" */ '@/views/iconfont/index.vue')
const ScaleX = () => import(/* webpackChunkName: "directive" */ '@/views/scaleX/index.vue')
const OnePx = () => import(/* webpackChunkName: "directive" */ '@/views/1px/index.vue')
const Transition = () => import(/* webpackChunkName: "directive" */ '@/views/transition_demo')
const TransitionGroup = () => import(/* webpackChunkName: "directive" */ '@/views/transition_group')
const Jump = () => import(/* webpackChunkName: "directive" */ '@/views/jump')
const ScrollJump = () => import(/* webpackChunkName: "scrollJump" */ '@/views/scrollJump')
const DownloadExcel = () => import(/* webpackChunkName: "directive" */ '@/views/download_Excel')
const ChoujiangPrize = () => import(/* webpackChunkName: "directive" */ '@/views/choujiangPrize')
const TestFilter = () => import(/* webpackChunkName: "directive" */ '@/views/filter')
const Ttml2canvas = () => import(/* webpackChunkName: "directive" */ '@/views/html2canvas')
const TestJinjiangCalendar = () => import(/* webpackChunkName: "directive" */ '@/views/testJinjiangCalendar')
const TestProp = () => import(/* webpackChunkName: "testProp" */ '@/views/testProp')
const GuideBtn = () => import(/* webpackChunkName: "testProp" */ '@/views/guideBtn')
const Echarts = () => import(/* webpackChunkName: "testProp" */ '@/views/test_echarts')
const Html2canvas = () => import(/* webpackChunkName: "testProp" */ '@/views/test_html2canvas')
const WebpackLogo = () => import(/* webpackChunkName: "testProp" */ '@/views/webpackLogo')
const Compoent = () => import(/* webpackChunkName: "testProp" */ '@/views/compoent.vue')

Vue.use(Router)

export default new Router({
// mode: 'history', // http://localhost:8081/yuan/#/
// base: process.env.BASE_URL,
	routes: [
    {
      path: '/compoent',
      name: 'Compoent',
      component: Compoent
    },
		{
			path: '/webpackLogo',
			name: 'WebpackLogo',
			component: WebpackLogo
		},
    {
			path: '/guideBtn',
			name: 'GuideBtn',
			component: GuideBtn
		},
		{
			path: '/html2canvas',
			name: 'Html2canvas',
			component: Html2canvas
		},
		{
			path: '/echarts',
			name: 'Echarts',
			component: Echarts
		},
		{
			path: '/testProp',
			name: 'TestProp',
			component: TestProp
		},
		{
			path: '/test-jinjiang-calendar',
			name: 'testJinjiangCalendar',
			component: TestJinjiangCalendar
		},
		{
			path: '/drop-down',
			name: 'dropdown',
			component: Dropdown
		},
		{
			path: '/html2canvas',
			name: 'html2canvas',
			component: Ttml2canvas
		},
		{
			path: '/choujiangPrize',
			name: 'ChoujiangPrize',
			component: ChoujiangPrize
		},
		{
			path: '/filter',
			name: 'filter',
			component: TestFilter
		},
		{
			path: '/download_Excel',
			name: 'download_Excel',
			component: DownloadExcel
		},
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
			path: '/mapHot',
			name: 'mapHot',
			component: MapHot
		},
		{
			path: '/iconfont',
			name: 'iconfont',
			component: Iconfont
		},
		{
			path: '/scaleX',
			name: 'scaleX',
			component: ScaleX
		},
		{
			path: '/onePx',
			name: 'onePx',
			component: OnePx
		},
		{
			path: '/transition',
			name: 'transition',
			component: Transition
		},
		{
			path: '/transitionGroup',
			name: 'transition',
			component: TransitionGroup
		},
		{
			path: '/jump',
			name: 'jump',
			component: Jump
		},
		{
			path: '/scrollJump',
			name: 'scrollJump',
			component: ScrollJump
		},
		{
			path: '/photoLiu',
			name: 'photoLiu',
			component: PhotoLiu
		},
		{
			path: '/audioTest',
			name: 'audioTest',
			component: AudioTest
		},
		{
			path: '/videoDemo',
			name: 'videoDemo',
			component: VideoDemo
		},
		{
			path: '/commit_animation',
			name: 'commit_animation',
			component: Commit
		},
		{
			path: '/orderPhotoLiu',
			name: 'orderPhotoLiu',
			component: OrderPhotoLiu
		},
		{
			path: '/sprite',
			name: 'spritePhoto',
			component: SpritePhoto
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
