<template>
	<div class="special_promo">
		<datepicker :value="date"></datepicker>
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
			topVideo: 'http://hhh.images.visitshanghai.com.cn/loOd2DseGpw6l5e_bqnaiYFSBNij?e=1566544613&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:BPTgh24Y6m5IwyYNyKhaF7Q-PgU=',
			spots: [
				{
					area: '0,0,120,120', // 返回图标
					link: ''
				},
				{
					area: '30,668,360,853', // 长宁
					link: 'http://hhh.images.visitshanghai.com.cn/lt1BzTJ_2nuppvlZRbfUIvzCOodx?e=1566645376&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:FNiNPjdH4OXsBVXVkR0S6EIFgHs=',
					'id': 2586
				},
				{
					area: '383,668,720,853', // 徐汇
					link: 'http://hhh.images.visitshanghai.com.cn/lipj4zhf-d3q7kOnMXe8kCK29Ndq?e=1566644866&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:QYrA-M9_paBq5fN7GqztTeR6ME4=',
					'id': 2590
				},
				{
					area: '30,883,360,1068', // 黄埔
					link: 'http://hhh.images.visitshanghai.com.cn/lg-aIC_VcbaATnH6cWV280W-yhPs?e=1566642776&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:Lfwu0okaorTqN1bhMRYaIq7fGpY=',
					'id': 2591
				},
				{
					area: '383,883,720,1068', // 静安
					link: 'http://hhh.images.visitshanghai.com.cn/liz9YnVWUcwhkfxUx3SQjAOYAswO?e=1566643675&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:Sg67-dB0vEJSNvaHXlx0xO5U_eU=',
					'id': 2585
				},
				{
					area: '30,1198,720,1620', // 机遇上海
					link: 'http://hhh.images.visitshanghai.com.cn/lhYPFnpu7Zg1sNo4RgGesuvZtHwH?e=1559131166&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:2yThaZUWV2nU3rwPQzGgaHErJuk=',
					'id': 2589
				},
				{
					area: '30,1670,720,2120', // 活力上海
					link: 'http://hhh.images.visitshanghai.com.cn/lhVuG4CSceCWMcpfHhL79zzw5oU1?e=1559122517&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:calfAWcTGt2Tm3L7Gha7RGJpCUg=',
					'id': 2589
				}
			]
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
		position: relative;
		.videoClass {
			position: absolute;
			top: 146px;
			z-index: 2;
			width: 100%;
			padding: 0 29px;
			video {
				width: 100%;
				height: 392px;
				border: none;
				border-radius: 8px;
			}
		}
		/deep/ .comp__hot-spot--wrapper {
			width: 100%;

			img {
				width: 100%;
			}
		}
	}

	.placeholer {
		height: 64px;
		background: #fff;
	}

	.box {
		position: absolute;
		top: 0;
		top: constant(safe-area-inset-top);
		top: env(safe-area-inset-top);
		bottom: 0;
		bottom: env(safe-area-inset-bottom);
		bottom: constant(safe-area-inset-bottom);
		width: 100%;
		overflow: hidden;
		background: #fff;

		.box-wraper {
			position: absolute;
			width: 100%;
			top: 0;
			bottom: 0;

			.block {
				position: absolute;
				width: 100%;
				height: 100%;
				overflow: scroll;
				background: #f5f5f5;

				.container {
					/*padding-bottom: 60px;*/
					width: 100%;
					background: -webkit-linear-gradient(to bottom, #fff 6%, #f5f5f5 10%);
					background: linear-gradient(to bottom, #fff 6%, #f5f5f5 10%);
				}
			}
		}
	}

	.header-title {
		height: 88px;
		text-align: center;
		background: #fff;
		line-height: 88px;
		position: absolute;
		top: 0;
		width: 100%;
		font-weight: bold;
	}

	.vr-swiper {
		position: relative;
		padding: 10px 30px 0;

		.swipe-item {
			height: 260px;
			background-size: cover;
			background-position: center;
			border-radius: 8px;
		}

		.pagination-box {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 20px;
			z-index: 1;

			.pagination-bullet {
				width: 10px;
				height: 10px;
				margin: 0 5px;
				border-radius: 50%;
				opacity: 0.5;
				background-color: rgba(250, 250, 250);
			}

			.pagination-bullet-active {
				background: #fff;
				opacity: 1;
			}
		}
	}

	.item-box {
		display: inline-block;
		padding: 0 10px;
		width: 50%;
	}

	.disnen, .promo_food, .promo_business {
		margin: 0 20px -20px;
	}

	.food {
		&.ly-tab {
			background: transparent;
		}

		/deep/ .ly-tabbar {
			border-bottom: none;
		}

		/deep/ .ly-tab-list {
			padding-top: 6px;
			padding-bottom: 40px;
		}

		/deep/ .ly-tab-item {
			background: #eaeaea;
		}
	}

	.promo_food, .promo_business {
		.item-box {
			margin-bottom: 20px;
		}
	}

	.car {
		position: relative;
		height: 100%;
		border-radius: 8px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		padding: 0 30px;
		/*padding-bottom: 42.96%;*/
		text-align: left;
		overflow: hidden;
		margin-top: 0;
		/*margin-bottom: 20px;*/
		margin-bottom: 0;
		position: relative;
		z-index: 2;

		&.car-bg {
			background-color: #eee;
		}

		.car-centent {
			position: absolute;
			padding: 0 30px;
			left: 0;
			bottom: 30px;
		}

		&:after {
			position: absolute;
			z-index: 2;
			content: '';
			display: block;
			top: 50%; // 这是50%是遮挡一半，top为0时，是全部遮盖
			right: 0;
			bottom: 0;
			left: 0;
			background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)); // 遮罩为渐变色
		}

		.title {
			position: relative;
			z-index: 3;
			font-size: 36px;
			font-weight: 500;
			color: #FFFFFF;
			height: 50px;
			line-height: 50px;
			// margin: 100px 0 4px 0;
			overflow: hidden;
			display: -webkit-box !important;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
		}

		.describe {
			position: relative;
			z-index: 3;
			font-size: 24px;
			height: 33px;
			line-height: 33px;
			color: #FFFFFF;
			overflow: hidden;
			display: -webkit-box !important;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
		}
	}
}
</style>
