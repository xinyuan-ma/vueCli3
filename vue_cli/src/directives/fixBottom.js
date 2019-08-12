/**
 * 固定底部btn、tab
 */
let el

function touchStart () {
	let top = el.scrollTop
	let totalScroll = el.scrollHeight
	let currentScroll = top + el.offsetHeight
	if (top === 0) {
		el.scrollTop = 1
	} else if (currentScroll === totalScroll) {
		el.scrollTop = top - 1
	}
}

function touchMove (evt) {
	if (el.offsetHeight < el.scrollHeight) {
		evt._isScroller = true
	} else {
		evt._isScroller = false
	}
}

function hiddenPrevent (evt) {
	if (!evt._isScroller) {
		evt.preventDefault()
	}
}

export default {
	inserted (_el, binding) {
		let iOS = navigator.userAgent.indexOf('iPhone')
		if (iOS !== -1) {
			el = _el
			_el.addEventListener('touchstart', touchStart, false)
			_el.addEventListener('touchmove', touchMove, false)
			document.body.addEventListener('touchmove', hiddenPrevent, false)
		}
	},
	unbind (_el) {
		let iOS = navigator.userAgent.indexOf('iPhone')
		if (iOS !== -1) {
			el = _el
			_el.removeEventListener('touchstart', touchStart, false)
			_el.removeEventListener('touchmove', touchMove, false)
		}
	}
}
