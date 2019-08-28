<template>
	<div class="special_promo">
		<div class="box">
			<div class="box-wraper">
				<div class="block" id="block">
					<div class="container">
						<!--占位元素 visibility: hidden-->
						<div class="list-content no-active" ref="list-content">
							<p v-for="(val, key) in listContent" :key="key">{{val}}</p>
						</div>
						<!--实际显示元素-->
						<div class="list-content">
							<transition-group name="bounceIn">
								<p v-for="(val, key) in listContent" :key="key+1" v-show="listShow[key]">
									{{val}}
									<img src="../../static/image/icon_complete.png" alt="">
								</p>
							</transition-group>
						</div>
						<!-- 底部提示 -->
						<div class="submitOrderTips-text" ref="submitOrderTips">
							<p class="default" v-show="!isPayForward">订单确认中
								<span v-for="n in 3" :key="n" :class="{ transparent: n > (wait + 1) }">.</span>
							</p>
							<p class="active" v-show="isPayForward">订单提交中
								<span v-for="n in 3" :key="n+100" :class="{ transparent: n > (wait + 1) }">.</span>
							</p>
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
			listContent: Object.freeze(
				['您的订单信息：订单号10057', '订单内容：豪华套餐2人份', '订单价格：20，30，总价50', '订单地点：这里那里', '订单时机：2019-10-11']
			),
			listShow: [], // 控制内容依次显示
			timerShow: '', // listShow的定时器
			isPayForward: false,
			wait: 0

		}
	},
	mounted () {
		this.$nextTick(() => {
			this.$refs.submitOrderTips.style.top = this.$refs['list-content'].clientHeight + 100 + 'px'
			this.changeListSHow()
			this.waiting()
		})
		setTimeout(() => {
			this.isPayForward = true
		}, 3000)
	},
	methods: {
		changeListSHow () {
			this.timerShow = setInterval(() => {
				this.listShow.push(true)
			}, 300)
		},
		waiting () {
			this.waitInterval = setInterval(() => {
				this.wait = (this.wait + 1) % 3
			}, 400)
		}
	}
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
