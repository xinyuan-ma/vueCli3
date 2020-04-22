let stopScroll = false
let scrolling = false
let start = 0
let el

function touchStart (e) {
	start = e.touches[0].clientY
	scrolling = true
}

function touchMove (e) {
	let change = e.touches[0].clientY - start
	if (el.scrollTop <= 0 && change > 0) {
		e.preventDefault()
		stopScroll = true
	} else {
		stopScroll = false
	}
}

function touchEnd (e) {
	scrolling = false
}

function scroll (e) {
	if (el.scrollTop == 0 && !scrolling) {
		stopScroll = false
	}
}

function preventDefault (e) {
	if (stopScroll) {
		e.preventDefault()
	}
}

const disabledScroll = {
	inserted (_el, binding) {
		el = _el
		_el.addEventListener('touchstart', touchStart, false)
		_el.addEventListener('touchmove', touchMove, false)
		_el.addEventListener('touchend', touchEnd, false)
		_el.addEventListener('scroll', scroll, false)
	},
	unbind (_el) {
		stopScroll = false
		start = 0
		_el.removeEventListener('touchstart', touchStart)
		_el.removeEventListener('touchmove', touchMove)
		_el.removeEventListener('touchend', touchEnd)
		_el.removeEventListener('scroll', scroll)
	}
}

const stopScrollSelf = {
	inserted (_el) {
		_el.addEventListener('touchmove', preventDefault, false)
	},
	unbind (_el) {
		_el.removeEventListener('touchmove', preventDefault)
	}
}

export default {
	install (Vue) {
		document.documentElement.addEventListener('touchmove', preventDefault,
			false)
		Vue.directive('stopScroll', disabledScroll)
		Vue.directive('stopScrollSelf', stopScrollSelf)
	}
}

export function setStopScroll (stop) {
	stopScroll = stop
}
