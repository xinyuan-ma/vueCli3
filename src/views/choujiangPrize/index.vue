/* eslint-disabled */
<template>
	<div class="prize">
	</div>
</template>

<script>
export default {
	name: 'specialPromo',
	data () {
		return {}
	},
	mounted () {
		// 方法一:
		// var g = ['一等奖', '二等奖', '三等奖','四等奖', '未中奖'] // 奖项名称
		// var p = [1/10000, 1/1000, 1/100, 1/10, 0] // 各奖项的中奖概率
		// var t = [1, 10, 100, 1000, 0] // 奖项个数: 一等奖1个,二等奖10个,三等奖100个,四等奖1000个
		//
		// function lottery () { // 抽奖
		// 	// var s = p.reduce(function (pv, v) { // 计算p数组中数值之和。1+5+20+74是100
		// 	// 	return pv + v
		// 	// }, 0)
		// 	// console.log(s)
		// 	var r = Math.random()* 1
		// 	for (var i = 0, n = 0; i < p.length; i++) { // 判断用户获得几等奖的方式，通过累加p，判断r属于p中哪个区间
		// 		n += p[i]
		// 		if (n > r) break
		// 	}
		// 	console.log(i, r, 123)
		// 	console.log(t[i])
		// 	if (t[i]-- > 0) { // 中奖后，库存减一
		// 		console.log(t)
		// 		console.log(g[i])
		// 	} else {
		// 		console.log('未中奖')
		// 	}
		// }

		// 方法二:
		var g = ['一等奖', '二等奖', '三等奖', '未中奖'] //奖项名称
		var p = [20, 20, 20, 40] //奖项的权重。也就是各个奖项的中奖几率占总数的比例。比如这个总数是100，二等奖的中奖几率就是5/100
		var t = [1, 2, 4, 0] //奖项个数、一等奖1个,二等奖2个,三等奖4个

		function lottery () { //抽奖
			var s = p.reduce(function (pv, v) { //计算p数组中数值之和。1+5+20+74是100
				return pv + v
			}, 0)
			// console.log(s);
			var r = Math.random() * s
			for (var i = 0, n = 0; i < p.length; i++) {
				n += p[i]
				if (n > r) break
			}
			console.log(t[i])
			if (t[i]-- > 0) {
				console.log(t)
				console.log(g[i])
			} else {
				console.log('未中奖')
			}
		}

		setInterval(() => {
			lottery()
		}, 1000)
	},
	methods: {}
}
</script>

<style lang="less" scoped>
	.special_promo {
		width: 100%;
		height: 100%;
		background: #fff;

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
						position: relative;
						width: 100%;

						background: -webkit-linear-gradient(to bottom, #fff 6%, #f5f5f5 10%);
						background: linear-gradient(to bottom, #fff 6%, #f5f5f5 10%);

						.list-content {
							width: 80%;
							position: absolute;
							top: 100px;
							left: 50%;
							transform: translateX(-50%);

							p {
								padding: 20px;
								text-align: left;

								img {
									width: 40px;
									height: 40px;
									float: right;
								}
							}

							&.no-active {
								visibility: hidden;
							}
						}

						.submitOrderTips-text {
							position: absolute;
							left: 50%;
							transform: translateX(-50%);

							.transparent {
								color: transparent;
							}

							.active {
								color: #EF3535;
							}
						}
					}
				}
			}
		}
	}

	.bounceIn-enter-active {
		animation: bounceIn .5s;
	}

	.bounceIn-leave-active {
		animation: bounceIn .5s reverse;
	}

	@keyframes bounceIn {
		from, to {
			animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
		}

		0% {
			opacity: 0;
			transform: scale3d(.3, .3, .3);
		}

		20% {
			transform: scale3d(1.1, 1.1, 1.1);
		}

		40% {
			transform: scale3d(.9, .9, .9);
		}

		60% {
			opacity: 1;
			transform: scale3d(1.03, 1.03, 1.03);
		}

		80% {
			transform: scale3d(.97, .97, .97);
		}

		to {
			opacity: 1;
			transform: scale3d(1, 1, 1);
		}
	}
</style>
