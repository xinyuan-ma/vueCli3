let animationFrameId = null
// 平滑滚动
export default {
	/**
	 * @description 平滑滚动
	 * @param {Number} top 位置
	 * @param {Number} duration 时长(ms)
	 * @returns {Promise} 动画完成
	 */
	smoothScroll (top, element, duration = 300) {
		// 上一次动画没结束，触发新的动画
		// 则中止上一次动画
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId)
			animationFrameId = null
		}
		return new Promise(resolve => {
			const startTop = element.scrollTop
			const change = top - startTop
			if (change !== 0) {
				let startTime = null
				const step = timeStamp => {
					if (!startTime) {
						startTime = timeStamp
						animationFrameId = requestAnimationFrame(step)
					} else {
						const timeChange = timeStamp - startTime
						if (timeChange > duration) {
							element.scrollTo(0, top)
							animationFrameId = null
							resolve() // 这里返回resolve，是要监听什么时候滚动完
						} else {
							const ratio = this.easeOutQuad(timeChange / duration)
							element.scrollTo(0, startTop + ratio * change)
							animationFrameId = requestAnimationFrame(step)
						}
					}
				}
				animationFrameId = requestAnimationFrame(step)
			}
		})
	},
	/**
	 * @description 横向平滑滚动
	 * @param {Element} element 滚动元素
	 * @param {Number} left 位置
	 * @param {Number} duration 时长(ms)
	 */
	smoothScrollLeft (element, left, duration = 300) {
		// 上一次动画没结束，触发新的动画
		// 则中止上一次动画，horizontalScrollAnimationFrameId 为requestAnimationFrame返回的id，类似于setTimeout一样，每次只需requestAnimationFrame(step)都会返回一个新的id
		if (element.horizontalScrollAnimationFrameId) {
			cancelAnimationFrame(element.horizontalScrollAnimationFrameId) // 取消的动画，参数为对应的id，和clearSetTimeout一样
			element.horizontalScrollAnimationFrameId = null
		}
		const startLeft = element.scrollLeft
		const change = left - startLeft
		if (change !== 0) {
			let startTime = null
			const step = timeStamp => { // timeStamp表示执行回调函数的时刻，该值会一直变大
				if (!startTime) {
					startTime = timeStamp
					element.horizontalScrollAnimationFrameId = requestAnimationFrame(step)
				} else {
					const timeChange = timeStamp - startTime
					if (timeChange > duration) { // 如果超过300ms，直接滚动到目标位置
						element.scrollLeft = left
						element.horizontalScrollAnimationFrameId = null
					} else {
						// 此处是实现顺滑滚动加载动效的关键计算方式，ratio是一个从0逐渐变大，最后趋近于1的值，就可以实现前面滚动快，后面滚动慢的效果，类似于动画的ease效果
						// 无论change 是正值还是负值 都可以用同样的计算方式
						const ratio = this.easeOutQuad(timeChange / duration)
						element.scrollLeft = startLeft + ratio * change
						element.horizontalScrollAnimationFrameId = requestAnimationFrame(step)
					}
				}
			}
			element.horizontalScrollAnimationFrameId = requestAnimationFrame(step)
		}
	},
	// 缓出
	easeOutQuad (x) {
		return 1 - (1 - x) * (1 - x)
	}
}
