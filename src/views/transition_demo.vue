<template>
	<div class="transition_demo" ref="getScroll" @scroll="getScroll">
		<button @click="show = !show">阿牛</button>
		<transition name="bounce">
			<p v-if="bounce">我是一个p标签</p>
		</transition>
		<div class="jump" @click="jumpTo">跳转</div>
		<!--当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们-->
		<transition name="fade" mode="out-in">
			<p v-if="show" key="first">我是第一个p标签</p>
			<p v-else key="second">我是第二个p标签</p>
		</transition>

		<!--使用animate.css动画-->
		<!--<transition enter-active-class="animated rotateInDownLeft" leave-active-class="animated rotateOutUpLeft">-->
			<!--<p class="animated" v-if="show">hello</p>-->
		<!--</transition>-->
		<transition
			appear
			enter-active-class="animated slideInUp"
			leave-active-class="animated fadeOut">
			<div v-if="show" class="toast-container" style="z-index: 999;">
				<span>{{content}}</span>
			</div>
		</transition>
		<div class="scroll_div" v-for="(item, index) in 10" :key="index">这是第{{item}}div</div>

	</div>
</template>

<script>

export default {
	name: 'transition_demo',
	components: {},
	data: function () {
		return {
			show: false,
			bounce: false,
			content: 'toast弹框',
			getBoundingClientRect: [],
			key: 0
		}
	},
	mounted () {
		let doms = document.querySelectorAll('.scroll_div')
		this.getBoundingClientRect = Array.from(doms).map(dom => {
			console.log(dom.offsetTop)
			return (dom.getBoundingClientRect().top)
		})
		console.log(this.getBoundingClientRect, 'this.getBoundingClientRect')
	},
	methods: {
		jumpTo () {
			this.key += 1
			console.log(this.key)
			if (this.key > 3) {
				this.key = 0
			}
			console.log(this.getBoundingClientRect[this.key] - 10, 'this.getBoundingClientRect[this.key] - 10')
			this.$refs.getScroll.scrollTop = this.getBoundingClientRect[this.key] - 10
		},
		getScroll () {
			let doms = document.querySelectorAll('.scroll_div')
			let getBoundingClientRect = Array.from(doms).map(dom => {
				console.log(dom.offsetTop)
				return (dom.getBoundingClientRect().top)
			})
			console.log(getBoundingClientRect, this.getBoundingClientRect)
		}
	}
}
</script>
<style lang="less">
	.jump {
		width: 100%;
		height: 50px;
		position: fixed;
		top: 0;
		z-index: 100;
		background-color: rgba(100, 100, 100, .5);
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.custom-appear-class, .custom-appear-active-class {
		transition: opacity 2s;
	}

	.bounce-enter-active {
		animation: boucn-in .5s;
	}

	.bounce-leave-active {
		animation: boucn-in .5s reverse;
	}

	@keyframes boucn-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.4);
		}
		100% {
			transform: scale(1);
		}
	}
	.toast-container {
		display: flex;
		z-index: 100;
		justify-content: center;
		position: fixed;
		bottom: 120px;
		width: 100%;
		font-size: 28px;
		color: #fff;
		animation-duration: 0.35s;
		span {
			display: block;
			max-width: 700px;
			padding: 30px 30px;
			border-radius: 12px;
			background: rgba(0, 0, 0, .6);
			word-wrap: break-word; // 英文换行
			white-space: pre-wrap; // 中文换行
		}
	}
	.transition_demo {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		padding-top: 50px;
		.scroll_div {
			width: 100%;
			height: 50%;
			border: 1px solid blue;
			&:first-of-type {
				border: 1px solid red;
				margin-top: 100px;
			}
			&:last-of-type {
				border: 1px solid red;
			}
		}
	}
</style>
