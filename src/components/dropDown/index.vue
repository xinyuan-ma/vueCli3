<template lang="html">
	<div class="drop-down-wrapper" ref="wrapper">
		<slot name="drop-down-fixed" v-if="dropType === 'fixed'"></slot>
		<div class="drop-down-container">
			<slot name="drop-down-follow" v-if="dropType === 'follow'"></slot>
			<slot></slot>
		</div>
	</div>
</template>

<script>
import DropDown, {
	EVENT_DROPDOWN_START,
	EVENT_DROPDOWN_MOVE,
	EVENT_DROPDOWN_END,
	EVENT_DROPDOWN_UP_START,
	EVENT_DROPDOWN_UP_END
} from './dropDown'

function noop () {}

export default {
	name: 'dropDown',

	props: {
		// 下拉方式 默认下拉无文案，
		// fixed: 固定到wrapper元素，不随container移动
		// follow: 跟随container移动
		dropType: {
			type: String,
			default () {
				return ''
			}
		},
		// 回弹时间
		duration: {
			type: Number,
			default () {
				return 300
			}
		},
		container: {
			default () {
				return '.drop-down-container'
			}
		},
		// 最大拉动距离
		dropMax: {
			type: Number,
			default () {
				return 100
			}
		},
		// 阻尼系数 ，0~1 范围内，阻尼越大，下拉越快，大于1时，阻尼越大，下拉受到的阻力越大，拉动越慢
		damping: {
			type: Number,
			default () {
				return 1.15
			}
		},
		// 是否开启自动回弹
		autoBack: {
			type: Boolean,
			default () {
				return true
			}
		},
		// 开始下拉 回调
		dropStart: {
			type: Function,
			default () {
				return noop
			}
		},
		// 下拉过程中 回调
		dropMove: {
			type: Function,
			default () {
				return noop
			}
		},
		// 下拉达到峰值回调
		dropEnd: {
			type: Function,
			default () {
				return noop
			}
		},
		// 开始回弹 回调
		dropUpStart: {
			type: Function,
			default () {
				return noop
			}
		},
		// 回弹结束回调
		dropUpEnd: {
			type: Function,
			default () {
				return noop
			}
		},
		canDrop: {
			type: Boolean,
			default () {
				return true
			}
		}
	},
	data () {
		return {
			dropDown: {}
		}
	},
	mounted () {
		this.dropDown = new DropDown(this.$refs.wrapper, {
			container: this.container,
			dropMax: this.dropMax,
			duration: this.duration,
			damping: this.damping,
			autoBack: this.autoBack,
			disable: !this.canDrop
		})
			.on(EVENT_DROPDOWN_START, data => this.dropStart(this.dropDown, data))
			.on(EVENT_DROPDOWN_MOVE, data => this.dropMove(this.dropDown, data))
			.on(EVENT_DROPDOWN_END, data => this.dropEnd(this.dropDown, data))
			.on(EVENT_DROPDOWN_UP_START, data => this.dropUpStart(this.dropDown, data))
			.on(EVENT_DROPDOWN_UP_END, data => this.dropUpEnd(this.dropDown, data))
	},
	watch: {
		canDrop (drop, oldDrop) {
			if (this.dropDown instanceof DropDown) {
				drop ? this.dropDown.enabled() : this.dropDown.disabled()
			}
		}
	},
	destroyed () {
		this.dropDown.destroyed()
		this.dropDown = null
	}
}
</script>

<style lang="less">
	.drop-down-wrapper,
	.drop-down-fixed,
	.drop-down-follow {
		position: absolute;
		left: 0;
		width: 100%;
	}

	.drop-down-wrapper {
		top: 100px;
		bottom: 0;
		height: 100%;
		margin: auto 0;
		overflow-y: auto;
		backface-visibility: hidden;
		transform: translate3d(0, 0, 0);
	}


	.drop-down-container {
		position: relative;
		transition-timing-function: cubic-bezier(0.27, 0.72, 0.98, 1);
		transition-property: transform;
		min-height: 100%;
		background-color: #f2f2f2;
	}


	.drop-down-fixed {
		top: 0;
		height: 100%;
	}


	.drop-down-follow {
		top: 0;
		transform: translate(0, -100%);
	}


</style>
