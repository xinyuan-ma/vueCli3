<template>
	<div id="mobileScroll" ref="wrapper" @scroll="handleScroll">
		<div id="fixed-back" ref="fixed" :class="{visible: fixedBack}">
			<div id="fixed-title">{{ title }}</div>
		</div>
		<!-- 头部背景 -->
		<div id="bg" ref="top">
			<!-- 返回 -->
			<div ref="title" id="title">{{ title }}</div>
			<img ref="img" id="top-img" src="http://hhh.images.visitshanghai.com.cn/app/travel_1.jpg" alt="">
		</div>
		<div id="main" ref="main">
			<!-- 子菜单 -->
			<div id="nav">
				<div class="nav-item" v-for="(item, index) in nav" :key="'nav' + index">
					<div class="nav-item-bg" :style="{ backgroundImage: 'url('+item.url+')' }"></div>
					<div class="nav-item-label">{{ item.label }}</div>
				</div>
			</div>
		</div>
		<!-- 阻止默认过度滚动 -->
		<overscroll :forceScrollTop="true" @overscroll="overscroll" @end="clearTransform"/>
	</div>
</template>

<script>
import overscroll from './overScroll'

export default {
	name: 'mobileScroll',
	components: {
		overscroll
	},
	data () {
		return {
			nav: [
				{
					url: 'http://hhh.images.visitshanghai.com.cn/app/travel_1.jpg',
					label: '阻止默认滚动，产生动效'
				}
			],
			fixedBack: false,
			topHeight: 0,
			clearTransformTimer: null,
			title: '测试'
		}
	},
	created () {
		for (let i = 0; i < 4; i++) {
			this.nav = this.nav.concat(this.nav)
		}
	},
	mounted () {
		// TODO
		// 直接获取 #bg 的高度有时错误
		this.topHeight = parseInt(window.innerWidth * 300 / 750)
	},
	methods: {
		handleScroll () {
			const scrollTop = this.$refs.wrapper.scrollTop
			if (scrollTop > this.topHeight) {
				this.fixedBack = true
			} else {
				this.fixedBack = false
			}
		},
		overscroll (distance) {
			clearTimeout(this.clearTransformTimer)
			// 放大倍数
			const scale = (this.topHeight + distance) / this.topHeight
			this.$refs.main.classList.remove('transition')
			this.$refs.img.classList.remove('transition')
			this.$refs.title.classList.remove('transition')
			// 下方列表Y轴位移
			this.$refs.main.style.transform = `translateY(${distance}px)`
			// 背景标题Y轴位移
			this.$refs.title.style.transform = `translate(-50%,calc(-50% + ${distance / 2}px))`
			// 背景放大
			this.$refs.img.style.transform = `scale(${scale})`
		},
		removeTransition () {
			this.$refs.main.classList.remove('transition')
			this.$refs.img.classList.remove('transition')
			this.$refs.title.classList.remove('transition')
			this.$refs.wrapper.classList.remove('transition')
		},
		clearTransform () {
			// 缓慢恢复原状态
			this.$refs.main.classList.add('transition')
			this.$refs.img.classList.add('transition')
			this.$refs.title.classList.add('transition')
			this.$refs.main.style.transform = `translateY(0px)`
			this.$refs.title.style.transform = `translate(-50%,-50%)`
			this.$refs.img.style.transform = `scale(1)`
			// 恢复后移除transition
			this.clearTransformTimer = setTimeout(this.removeTransition, 300)
		}
	}
}
</script>

<style lang="less" scoped>
	#mobileScroll {
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: #ffffff;
	}

	#bg {
		display: flex;
		position: relative;
		background-color: #ffffff;
		justify-content: center;
		align-items: center;
		transform-origin: top;
		height: calc(100vw * 300 / 750);
	}

	#fixed-back {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		position: fixed;
		z-index: 3;
		height: 140px;
		padding: 0 30px;
		height: 140px;
		background-color: #ffffff;
		width: 100%;
		pointer-events: none;
		opacity: 0;
		transition: opacity .3s ease-in-out;

		&.visible {
			opacity: 1;
			pointer-events: initial;
		}

		img {
			position: absolute;
			width: 60px;
			height: 60px;
			left: 30px;
			top: 65px;
		}
	}

	#main.transition {
		transition: transform .3s ease-in-out;
	}

	#fixed-title {
		line-height: 1rem;
	}

	#back {
		z-index: 2;
		width: 100px;
		height: 100px;
		position: absolute;
		left: 10px;
		top: 45px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 36px;
			height: 36px;
		}
	}

	#title {
		position: absolute;
		z-index: 2;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: #ffffff;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 67px;
		letter-spacing: 2px;
		transform-origin: center top;

		&.transition {
			transition: transform .3s ease-in-out;
		}
	}

	#nav {
		width: calc(100% - 60px);
		margin-left: 30px;
		background-color: #ffffff;
		box-shadow: 0px 2px 30px 0px rgba(0, 0, 0, 0.08);
		border-radius: 20px;
		transform: translateY(-40px);
	}

	.nav-item {
		width: 100%;
		height: 1300px;
		display: flex;
		/*justify-content: center;*/
		align-items: center;
		margin: 100px 0;
	}

	.nav-item-bg {
		width: 80%;
		height: 1300px;
		/*border-radius: 50%;*/
		background-color: #ffffff;
		background-size: 100% 100%;
	}

	.nav-item-label {
		background-color: #ffffff;
		line-height: 34px;
		margin-top: 20px;
		margin-left: 100px;
	}

	#ad {
		width: calc(100% - 60px);
		margin-left: 30px;
		margin-bottom: 40px;

		img {
			width: 100%;
		}
	}

	#top-img {
		width: 100%;
		height: calc(300 / 750 * 100vw);
		transform-origin: center top;

		&.transition {
			transition: transform .3s ease-in-out;
		}
	}
</style>
