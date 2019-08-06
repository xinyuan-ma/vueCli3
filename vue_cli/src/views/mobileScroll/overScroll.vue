<!--
	阻止默认滚动(上)边界
	用法:
	<template>
		<div style="overflow:scroll" ref="wrapper">
			<ul>
				...
				...
				<li></li>
			</ul>
			// 任意位置引入
			<overscroll @overscroll="transform" @end="reset"/>
		</div>
	</template>
	<script>
		...
		methods: {
			// overscroll组件不对元素做transform等变换,需要引用的地方自行处理
			transform (translate) {
				this.$refs.wrapper.style.transform = ...
			},
			// 恢复初始状态
			reset () {
				this.$refs.wrapper.style.transform = 'none'
			}
		}
	</script>
-->
<template>
	<div id="overscroll" ref="wrapper"></div>
</template>

<script>
import getScrollParent from './getScrollParent'
export default {
	name: 'overscroll',
	props: {
		// 阻尼，越小，移动距离越小
		damp: {
			type: Number,
			default: 20,
			validator (value) {
				return value > 0
			}
		},
		// 惯性
		inertia: {
			type: Boolean,
			default: true
		},
		// 惯性滚动时强制阻止 scrollTop为负值,或者超出内容。 如： scrollTop为100，向上滑动，
		// scrollTop减小，变负值，此时上方出现白色空白，如果下方颜色不是白色，会影响体验，可以设为true
		// 这样当scrollTop接近0时，会将scrollTop直接设为0
		// 但是强制设置scrollTop 会存在一闪的情况，谨慎使用
		forceScrollTop: {
			type: Boolean,
			default: false
		},
		// 对底部是否生效
		// 一般底色为白色，超出不影响体验，就不用设
		btm: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			// 滚动祖先元素
			scrollParent: null,
			// 内容总高度
			markPosition: 0,
			// 滚动祖先元素初始滚动状态 'auto' 或 'scroll'
			initParentOverflow: '',
			startX: 0,
			startY: 0,
			// 是否禁止滚动祖先元素 滚动
			scrollDisabled: false,
			maxScrollTop: 0,
			pullOrDrop: '',
			lastScrollTop: 0,
			isTouch: false,
			inertiaAnimationId: null
		}
	},
	mounted () {
		let a = this.getRealMove(10)
		console.log(a, 'this.getRealMove(touchMove)')
		// 获取滚动祖先元素
		this.scrollParent = getScrollParent(this.$refs.wrapper)
		// 获取祖先元素初始状态
		this.initParentOverflow = getComputedStyle(this.scrollParent).overflowY
		// this.scrollParent.addEventListener('scroll', this.handleScroll)
		this.scrollParent.addEventListener('touchstart', this.handleTouch, false)
		this.scrollParent.addEventListener('touchmove', this.handleTouchMove, false)
		this.scrollParent.addEventListener('touchend', this.handleTouchEnd, false)
	},
	methods: {
		handleTouch (event) {
			cancelAnimationFrame(this.inertiaAnimationId)
			this.isTouch = true
			const [{ clientX, clientY }] = event.touches // 获取手指滑动的坐标， clientX = event.touches[0].clientX 也是一样的
			this.startY = clientY
			this.startX = clientX
			this.maxScrollTop = this.scrollParent.scrollHeight - this.scrollParent.clientHeight
		},
		handleTouchMove (event) {
			const [{ clientX, clientY }] = event.touches
			// 侧滑webview
			if (clientX < 0) {
				return
			}
			// X轴滑动时不禁默认行为，否则会引起ios侧滑失效
			const verticalScroll = Math.abs(clientX - this.startX) < Math.abs(clientY - this.startY)
			const scrollTop = this.scrollParent.scrollTop
			// 手指移动方向 下正 上负
			const direction = clientY - this.startY
			const topOverscroll = scrollTop <= 0 && direction > 0
			const btmOverscroll = (scrollTop >= this.maxScrollTop || this.maxScrollTop === 0) && direction < 0
			// scrollTop 0时继续下拉
			if (topOverscroll) {
				this.disableScroll()
				this.pullOrDrop = 'pull'
				verticalScroll && event.preventDefault()
				/**
				 * 组织默认事件 对于手机端 在ios上 是指页面往下拉到底部后 手机顶部有白边（ios有回弹效果），同理底部也有白边，安卓上没有这个问题
				 * */
				if (!this.markPosition) {
					this.markPosition = clientY
				}
			}
			if (btmOverscroll) {
				verticalScroll && event.preventDefault()
				if (this.btm) {
					this.disableScroll(true)
					this.pullOrDrop = 'drop'
					if (!this.markPosition) {
						this.markPosition = clientY
					}
				}
			}
			if (this.markPosition) {
				const emitName = this.pullOrDrop === 'pull' ? 'overscroll' : 'overscroll-btm'
				// 相比scrollTop=0的位置 移动距离
				const touchMove = clientY - this.markPosition
				this.scrollParent.scrollTop = this.pullOrDrop === 'pull' ? 0 : this.maxScrollTop
				// 阻尼处理
				const realMove = this.getRealMove(touchMove)
				this.$emit(emitName, realMove)
			}
		},
		// 禁止祖先元素滚动
		disableScroll (btm = false) {
			if (!this.scrollDisabled) {
				this.scrollParent.style.overflowY = 'hidden' // 如果不把overflow 设为hidden ，ios手机 会出现闪动的情况
				this.scrollDisabled = true
			}
		},
		handleScroll (event) {
			const scrollTop = this.scrollParent.scrollTop
			const toBtm = this.maxScrollTop - scrollTop
			const speed = scrollTop - this.lastScrollTop
			// scrollTop即将为负值
			// if (speed < 0 && Math.abs(speed) > scrollTop && scrollTop > 0) {
			// 增加提前量
			if (speed < 0 && Math.abs(speed) * 2 > scrollTop && scrollTop > 0) {
				if (this.forceScrollTop || this.isTouch) {
					// TODO 这样强制改变滚动位置，会有一闪的问题
					this.scrollParent.scrollTop = 0
				}
				this.disableScroll()
				// 惯性滚动
				if (!this.isTouch) {
					if (this.inertia) {
						this.simulateInertia(Math.abs(speed) / 5)
					} else {
						this.$nextTick(this.enableScroll)
					}
				}
			} else if (this.btm && speed > 0 && speed * 2 > toBtm && scrollTop < this.maxScrollTop) {
				// TODO 这样强制改变滚动位置，会有一闪的问题
				if (this.forceScrollTop || this.isTouch) {
					this.scrollParent.scrollTop = this.maxScrollTop
				}
				this.disableScroll()
				this.$nextTick(this.enableScroll)
				// TODO
				// if (!this.isTouch) {

				// }
			}
			this.lastScrollTop = scrollTop
		},
		// 模拟惯性
		simulateInertia (speed, duration = 100) {
			let startTime = 0
			let distance = 0
			const step = timeStamp => {
				if (!startTime) {
					startTime = timeStamp
				}
				const takenTime = timeStamp - startTime
				if (takenTime < duration) {
					distance += speed * (1 - takenTime / duration)
					// 阻尼处理
					const realMove = this.getRealMove(distance)
					this.$emit('overscroll', realMove)
					this.inertiaAnimationId = requestAnimationFrame(step)
				} else {
					this.enableScroll()
					this.$emit('end')
				}
			}
			this.inertiaAnimationId = requestAnimationFrame(step)
		},
		// 恢复祖先元素滚动
		enableScroll () {
			if (this.scrollDisabled) {
				this.scrollParent.style.overflowY = this.initParentOverflow
				this.scrollDisabled = false
			}
		},
		// 阻尼处理
		getRealMove (touchMove) { // 这里的阻尼处理 是越往下拉 可拉动的距离越小
			return Math.min(Math.sqrt(2 * this.damp * touchMove), touchMove)
		},
		handleTouchEnd () {
			this.isTouch = false
			this.clearMark()
			this.enableScroll()
		},
		clearMark () {
			this.$emit('end')
			this.markPosition = 0
		}
	},
	beforeDestroy () {
		this.enableScroll()
		this.scrollParent.removeEventListener('scroll', this.handleScroll)
		this.scrollParent.removeEventListener('touchstart', this.handleTouch, false)
		this.scrollParent.removeEventListener('touchmove', this.handleTouchMove, false)
		this.scrollParent.removeEventListener('touchend', this.handleTouchEnd, false)
	}
}
</script>
