export default function getScrollParent (el) { // 查找产生滚动的元素
	const scrollState = getComputedStyle(el)['overflow-y'] // getComputedStyle 获取元素上的样式
	if (scrollState === 'scroll' || scrollState === 'auto') {
		return el
	} else {
		if (el === document.body) {
			return el
		} else {
			return getScrollParent(el.parentNode)
		}
	}
}
