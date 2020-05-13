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
							resolve()
						} else {
							const ratio = this.easeOutQuad(
								timeChange / duration)
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
		// 则中止上一次动画
		if (element.horizontalScrollAnimationFrameId) {
			cancelAnimationFrame(element.horizontalScrollAnimationFrameId)
			element.horizontalScrollAnimationFrameId = null
		}
		const startLeft = element.scrollLeft
		const change = left - startLeft
		if (change !== 0) {
			let startTime = null
			const step = timeStamp => {
				if (!startTime) {
					startTime = timeStamp
					element.horizontalScrollAnimationFrameId = requestAnimationFrame(
						step)
				} else {
					const timeChange = timeStamp - startTime
					if (timeChange > duration) {
						element.scrollLeft = left
						element.horizontalScrollAnimationFrameId = null
					} else {
						const ratio = this.easeOutQuad(timeChange / duration)
						element.scrollLeft = startLeft + ratio * change
						element.horizontalScrollAnimationFrameId = requestAnimationFrame(
							step)
					}
				}
			}
			element.horizontalScrollAnimationFrameId = requestAnimationFrame(
				step)
		}
	},
	// 缓出
	easeOutQuad (x) {
		return 1 - (1 - x) * (1 - x)
	}
}
