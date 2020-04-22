/**
 * @class DropDown(el, [option]) 下拉组件
 * @param el 必填 下拉组件容器
 * @param option 选填 配置
 * @author volodymyr
 * 2017-3-1
 */
import supportsPassive from './supportsPassive'
import { setStopScroll } from './stopScroll'
// 下拉状态
const DROPDOWN_START = 1
const DROPDOWN_PROGRESS = 2
const DROPDOWN_END = 3
const DROPDOWN_UP_START = 4
const DROPDOWN_UP_END = 5

// 事件名称定义
const EVENT_DROPDOWN_START = 'dropstart'   // 开始下拉
const EVENT_DROPDOWN_MOVE = 'dropmove'     // 下拉过程中
const EVENT_DROPDOWN_END = 'dropend'       // 下拉到峰值
const EVENT_DROPDOWN_UP_START = 'dropupstart'  // 松开手指
const EVENT_DROPDOWN_UP_END = 'dropupend'      // 回弹到初始位置

// 默认配置
let defaultOption = {
	container: '.drop-down-container',  // 内容容器
	dropMax: 200,                       // 最大拉动距离
	damping: 1.15,                      // 阻尼系数
	duration: 300,                      // 回弹时间
	autoBack: true,                     // 是否开启自动回弹
	disable: false                      // 是否禁止下拉
}

let hasOwnProperty = Object.prototype.hasOwnProperty

let hasOwn = function (obj, param) {
	return hasOwnProperty.call(obj, param)
}

let isiOS = window.navigator.appVersion.match(/iphone/gi)

let rootHml = document.getElementsByTagName('html')[0]
let rootFont = parseInt(rootHml.style.fontSize) || 75
console.log(rootHml.style, 'rootHml.style')
console.log(rootFont, 'rootFont')

function px2px (px) {
	return px * rootFont / 75
}

class DropDown {
	constructor (el, option) {
		this._opts = Object.assign(defaultOption, option || {})

		// 转换px单位为 flexible方案下的px
		this._opts.dropMax = px2px(this._opts.dropMax)
		console.log(this._opts.dropMax, 'this._opts.dropMax')
		this._el = typeof el === 'string' ? document.querySelector(el) : el
		if (!this._el) {
			throw new Error('drop-down components can not find element !')
		}
		this._container = this._el.querySelector(this._opts.container)

		this.translateY = 0             // 偏移量
		this.duration = 0               // 过渡时间

		this._status = DROPDOWN_START   // 下拉状态
		this._canDrop = false           // 是否可以下拉
		this._canMove = true            // 容器是否可以移动
		this._isTouch = false
		this._events = {}               // 事件队列
		this._dropStartOnce = true      // 开始下拉事件锁

		this._startY = 0
		this._moveY = 0
		this._changeY = 0

		this._init()
	}

	_init () {
		this._initEvent()
	}

	// 初始化事件
	_initEvent () {
		this._el.addEventListener('touchstart', this,
			supportsPassive ? { passive: true } : false)
		// 将touchmove、touchend绑定到document对象上，有利于在容器高度非占满整屏时，用户操作的连贯性
		document.addEventListener('touchmove', this, false)
		document.addEventListener('touchend', this,
			supportsPassive ? { passive: true } : false)

		this._container.addEventListener('webkitTransitionEnd', this, false)
		this._container.addEventListener('transitionend', this, false)
	}

	_eventDropStart (e) {
		this._isTouch = true
		this._startY = e.touches[0].clientY
	}

	_eventDropMove (e) {
		if (this._canMove && !this._opts.disable && this._isTouch) {
			this._changeY = e.touches[0].clientY - this._startY
			this._moveY = this._changeY
			// 当container 到达顶部且手指滑动方向向下的时候，表示开始出发下拉操作
			if (this._el.scrollTop <= 0 && this._changeY > 0) {
				this._canDrop = true
				isiOS && e.preventDefault()
				// 触发 开始下拉事件，该事件只触发一次
				if (this._dropStartOnce) {
					this._status = DROPDOWN_START
					this.emit(EVENT_DROPDOWN_START)
					this._dropStartOnce = false
				}
				this._isTransition(false)
				this._setTranslateY(this._moveY / this._opts.damping)

				// 触发开始下拉事件后，继续触发拉动过程事件
				if (!this._dropStartOnce) {
					this._status = DROPDOWN_PROGRESS
					let progress = this.translateY / this._opts.dropMax
					// 触发 下拉拉动事件，传入进度参数
					this.emit(EVENT_DROPDOWN_MOVE, progress)
				}

				// 下拉达到峰值
				if (this.translateY === this._opts.dropMax) {
					this._status = DROPDOWN_END
					this.emit(EVENT_DROPDOWN_END)
				}
			} else {
				this._canDrop = false
				this._status = DROPDOWN_START
			}
		}
	}

	_eventDropEnd (e) {
		this._isTouch = false
		if (this._canMove) {
			this._opts.autoBack && this.dropBack()
			let _oldStatus = this._status
			this._status = DROPDOWN_UP_START
			this._dropStartOnce = true
			let isTop = _oldStatus === DROPDOWN_END

			if (isTop && !this._opts.autoBack) {
				this._canMove = false
			}
			// 结束下拉，开始回弹
			// 触发回弹开始事件
			// @param isTop {Boolean} 是否达到峰值
			this.emit(EVENT_DROPDOWN_UP_START, isTop)
		}
	}

	_transitionEnd (e) {
		this._canDrop = false
		this._canMove = true
		this._status = DROPDOWN_UP_END
		this._isTransition(false)
		setStopScroll(false)
		// 结束回弹
		// 触发结束回弹事件
		this.emit(EVENT_DROPDOWN_UP_END)
	}

	_setTranslateY (y) {
		this.translateY = y / 3
		this.translateY = this.translateY > this._opts.dropMax
			? this._opts.dropMax
			: this.translateY
		let style = this._container.style
		style.webkitTransform =
			style.MozTransform =
				style.OTransfrom =
					style.msTransform =
						style.tranform = `translate3d(0, ${this.translateY}px, 0)`
	}

	_isTransition (boolean) {
		let style = this._container.style
		this.duration = boolean ? this._opts.duration : 0
		style.webkitTransitionDuration =
			style.MozTransitionDuration =
				style.msTransitionDuration =
					style.OTransitionDuration =
						style.transitionDuration = this.duration + 'ms'
	}

	// 对象事件绑定
	handleEvent (e) {
		switch (e.type) {
			case 'touchstart':
				this._eventDropStart(e)
				break

			case 'touchmove':
				this._eventDropMove(e)
				break

			case 'touchend':
				this._eventDropEnd(e)
				break

			case 'webkitTransitionEnd':
			case 'transitionend':
			this._transitionEnd(e)
			break
		}
	}

	// api 回弹
	dropBack (callback) {
		// this._canMove = false;
		this._isTransition(true)
		this._setTranslateY(0)
		if (typeof callback === 'function') {
			var dropBackCallback = function () {
				callback()
				this.off(EVENT_DROPDOWN_UP_END, dropBackCallback)
			}
			this.on(EVENT_DROPDOWN_UP_END, dropBackCallback)
		}
	}

	// 获取拉动状态
	getStatus () {
		return this._status
	}

	// 禁止下拉
	disabled () {
		this._opts.disable = true
	}

	// 启动下拉
	enabled () {
		this._opts.disable = false
	}

	// 事件注册
	on (handleName, callback) {
		if (!hasOwn(this._events, handleName)) {
			this._events[handleName] = []
		}
		this._events[handleName].push(callback)

		return this
	}

	// 事件解绑
	off (handleName, callback) {
		if (hasOwn(this._events, handleName)) {
			let index = this._events[handleName].indexOf(callback)
			if (index !== -1) {
				this._events[handleName].splice(index, 0)
			}
		}
		return this
	}

	// 事件触发
	emit (handleName) {
		let _event = this._events
		if (hasOwn(this._events, handleName)) {
			let i = 0
			let len = _event[handleName].length
			let args = Array.prototype.slice.call(arguments, 1)
			for (; i < len; i++) {
				_event[handleName][i].apply(this, args)
			}
		}
		return this
	}

	destroyed () {
		this._el.removeEventListener('touchstart', this)
		document.removeEventListener('touchmove', this)
		document.removeEventListener('touchend', this, false)

		this._container.removeEventListener('webkitTransitionEnd', this)
		this._container.removeEventListener('transitionend', this)
	}
}

export default DropDown

export {
	EVENT_DROPDOWN_START,
	EVENT_DROPDOWN_MOVE,
	EVENT_DROPDOWN_END,
	EVENT_DROPDOWN_UP_START,
	EVENT_DROPDOWN_UP_END
}

export {
	DROPDOWN_START,
	DROPDOWN_PROGRESS,
	DROPDOWN_END,
	DROPDOWN_UP_START,
	DROPDOWN_UP_END
}
