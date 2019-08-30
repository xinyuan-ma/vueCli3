/** 教程: https://www.cnblogs.com/guangixn/p/10682131.html
*  使用雪碧图注意点：引入插件npm install webpack-spritesmith --save
*  配置注意点：SpritesmithPlugin中的 target 目标路径不要和图片路径放到一起，否则会雪碧图会一直循环生成
*  span元素的类名要和sprite.css 中的类名一致，注意给span元素一个宽高，因为雪碧图就是利用背景图生成的
*/
<template>
	<div class="tabberWarp" ref="tabberWarp" id="tabberWarp" @touchmove.prevent>
		<div class="warp">
			<Item :txt='item.txt' :page='item.page' @change='getVal' v-for='(item, index) in tabbarDes' :sel='selected'
				  :key="index">
				<span :class="item.normalImg" slot='normalImg'></span>
				<span :class="item.activeImg" slot='activeImg'></span>
			</Item>
		</div>
	</div>
</template>

<script>
import Item from './Item.vue'

export default {
	components: {
		Item
	},
	data: function () {
		return {
			selected: '',
			tabbarDes: [
				{
					txt: '首页',
					page: '',
					normalImg: 'icon-lab_home_normal icons', // sprite图  icons
					activeImg: 'icon-lab_home icons'
				},
				{
					txt: '特惠',
					page: 'special-off',
					normalImg: 'icon-lab_tehui_normal icons',
					activeImg: 'icon-lab_tehui icons'
				},
				{
					txt: '直供',
					page: 'direct-supply',
					normalImg: 'icon-lab_wode_normal icons',  // iconfont文字  iconfont
					activeImg: 'icon-lab_wode icons'
				},
				{
					txt: '投诉',
					page: 'helpView',
					normalImg: 'icon-lab_fuwu_normal icons',
					activeImg: 'icon-lab_fuwu icons'
				},
				{
					txt: '我的',
					page: 'my-info',
					normalImg: 'icon-lab_fujin_normal icons',
					activeImg: 'icon-lab_fujin icons'
				}
			]
		}
	},
	props: {
		curPage: { type: String, default: '' }
	},
	watch: {
		curPage (newVal) {
			this.selected = newVal
		}
	},
	methods: {
		getVal: function (res) {
			this.selected = res
			console.log(res)
		}
	}
}
</script>

<style scoped>
@import "../../static/image/sprite.css";
.warp {
	width: 100%;
	border-top: 1px solid #eee;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: space-around;
	font-size: 0;
	height: 128px;
}

.warp .icons {
	width: 40px;
	height: 40px;
	font-size: 40px;
	display: inline-block;
}

.tabberWarp .icons, .tabberWarp .iconfont {
	/*margin-top: 10px;*/
	margin-bottom: 16px;
	display: block;
	text-align: center;
}

.tabberWarp {
	position: absolute;
	z-index: 999;
	bottom: 0;
	left: 0;
	width: 100%;
	background: #fff;
	height: 128px;
}
</style>
