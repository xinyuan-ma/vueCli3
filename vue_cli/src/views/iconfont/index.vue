/** iconfont使用说明,要引入iconfont的css文件，现在在main.css中引入，如果不适用矢量图，只引入这个css文件即可，直接修改color就可以改变图标的颜色
* 使用矢量图，需要在引入iconfont的js文件,现在在yuan.html中引入,注意： 矢量图不能改变颜色，矢量图的icon前面要加一个#，不能少
*
*/
<template>
	<div class="special_promo">
		<div class="box">
			<div class="box-wraper">
				<div class="block" id="block">
					<p>这是标准的iconfont</p>
					<div class="container flex-between">
						<div v-for="(item, key) in list" :key="key" @click="item.show = !item.show"
							 :class="{active: item.show}">
							<i class="iconfont" :class="item.icon"></i>
							<p>{{item.item}}</p>
						</div>
					</div>
					<br><br><br>
					<p>这是使用矢量图</p>
					<div class="container flex-between">
						<div v-for="(item, key) in svgList" :key="key" @click="item.show = !item.show"
							 :class="{active: item.show}">
							<svg class="icon svg-icon" aria-hidden="true">
								<use :xlink:href='`#${item.icon}`'></use>
							</svg>
							<p>{{item.item}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'specialPromo',
	data () {
		return {
			isLoad: false,
			list: [
				{
					item: 'iconfont1',
					icon: 'iconlable_home',
					show: false
				},
				{
					item: 'iconfont2',
					icon: 'iconlable_fuwu',
					show: false
				},
				{
					item: 'iconfont3',
					icon: 'iconlable_tehui',
					show: false
				}
			],
			svgList: [
				{
					item: 'iconfont1',
					icon: 'iconlis_icon_yjwj',
					show: false
				},
				{
					item: 'iconfont2',
					icon: 'iconicon_ctyiyao',
					show: false
				},
				{
					item: 'iconfont3',
					icon: 'iconicon_mjwx',
					show: false
				}
			]
		}
	},
	mounted () {
		// this.scrollShowTitle()
	},
	methods: {}
}
</script>

<style lang="less" scoped>
	.svg-icon {
		/*color: #999;*/
		font-size: 60px;
	}

	svg.icon {
		width: 1em;
		height: 1em;
		vertical-align: bottom;
		fill: currentColor;
		overflow: hidden;
	}

	.special_promo {
		width: 100%;
		height: 100%;
		background: #fff;

		.container {
			margin-top: 50px;
			position: relative;

			.iconfont {
				color: #999;
				font-size: 40px;
			}

			.active {
				.iconfont {
					color: #F24E5A;
				}
			}

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
