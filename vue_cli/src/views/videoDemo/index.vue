/**
* 注意点:  webkit-playsinline='true' playsinline='true' 设置ios可以小窗口播放
* poster="string" 解决安卓播放视频，第一秒显示播放图片的bug，教程：https://www.w3school.com.cn/tags/tag_video.asp
*/
<template>
	<div class="special_promo">
		<div class="container">
			<div class="videoClass">
				<video :src="topVideo" muted loop="loop" webkit-playsinline='true' playsinline='true' autoplay="autoplay" poster="string">
					<source type="video/mp4" />
					<!--<source type="video/ogg">-->
					您的浏览器不支持 video 标签
				</video>
			</div>
		</div>
		<!--<datepicker :value="date"></datepicker>-->
	</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
// import mapHot from '../map-hot/map-hot'
export default {
	name: 'specialPromo',
	components: {
		// mapHot,
		Datepicker
	},
	data () {
		return {
			date: new Date(2016, 9,  16),
			isLoad: false,
			showTitleHeight: 200,
			index: 1,
			id: 0,
			title: '发现上海',
			// promoImg: require('@/static/image/video.png'),
			promoImg: 'http://hhh.images.visitshanghai.com.cn/app/videoDemo.png',
			showTab: true,
			options: {
				activeColor: '#fff',
				activeBg: '#F24E5A'
			},
			topVideo: 'http://hhh.images.visitshanghai.com.cn/loOd2DseGpw6l5e_bqnaiYFSBNij?e=1566544613&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:BPTgh24Y6m5IwyYNyKhaF7Q-PgU='
		}
	},
	mounted () {
		// this.scrollShowTitle()
	},
	methods: {
		imgLoaded () {
			this.isLoad = true
		},
		goNext (item) {
			console.log(item)
		},
		// 添加滚动
		scrollShowTitle () {
			let _this = this
			let ele = document.querySelector('#block')
			ele.addEventListener('scroll', function () {
				let headerTopEle = document.querySelector('.headerTop')
				if (_this.showTitleHeight > this.scrollTop) {
					headerTopEle.style.opacity = this.scrollTop / _this.showTitleHeight
				} else {
					headerTopEle.style.opacity = 1
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.special_promo {
	width: 100%;
	height: 100%;
	background: #fff;

	.container {
		width: 100%;
		height: 100%;
		position: relative;
		.videoClass {
			position: absolute;
			top: 146px;
			z-index: 2;
			width: 100%;
			height: 392px;
			padding: 0 29px;
			video {
				width: 100%;
				height: 392px;
				border: none;
				border-radius: 8px;
			}
		}
	}

	.placeholer {
		height: 64px;
		background: #fff;
	}

}
</style>
