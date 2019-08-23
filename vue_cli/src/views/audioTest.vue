/**
* 音频联系， 音频api ： https://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp
*/
<template>
	<div>
		<div class="centerDiv">
			<div class="cent">垂直居中</div>
		</div>
		<div class="audio-box" @touchmove.prevent>
			<!--<audio ref="audio" controls>-->
			<audio ref="audio" :src="audioUrl">
				<source :loop="cycle" type="audio/mp3">
			</audio>
			<div class="item-title">音频名字</div>
			<div class="progress-box">
				<div class="progressBar" ref="progressBar" @touchstart="justifyProgress">
					<div class="progress" :style="{'width': progressBarWidth}"></div>
					<div class="progressDot" id="progressDot" :style="{'left': progressDotLeft}"></div>
				</div>
				<div class="audio-time">
					<span class="audio-current">{{currentTime}}</span>
					<span class="audio-total">{{totalTime}}</span>
				</div>
			</div>

			<div class="control-box">
				<div class="cycle" @click="setCycle">
					<i class="iconfont" :class="{'iconxunhuanx': cycle, 'iconxunhuanstop':!cycle}"></i>
				</div>
				<div class="left-speed" @click="prevAudio">
					<i class="iconfont iconhoutuix"></i>
				</div>
				<div class="play" id="audioPlayer" @click="playPlayer">
					<i class="iconfont" :class="{'iconplay': paused, 'iconstop': !paused}"></i>
				</div>
				<div class="right-speed" @click="nextAudio">
					<i class="iconfont iconqianjinx"></i>
				</div>
				<div class="volume" @click="setMuted">
					<i class="iconfont" :class="{'iconno_volcex': muted, 'iconvolcex': !muted}"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { formatTimeStr } from '@/common/index.js'

export default {
	name: 'audio-comp',
	data () {
		return {
			audioUrl: 'http://hhh.images.visitshanghai.com.cn/lsp_iAJ7Cg0MdCso_LZxIEl4X4OZ?e=1564729492&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:72EKCdWqEiktkXmxb-EA2rw7Il8=',
			cycle: true,
			muted: false,
			paused: true,
			progressBarWidth: '',
			progressDotLeft: '',
			currentTime: '00.00',
			totalTime: '00.00',
			currentUrl: 'http://hhh.images.visitshanghai.com.cn/FqVkdpkYIqTu5J1XnXyJyedBpIis?e=1563765817&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:X6d_VOf9EdZPQDLcMJ-Jw9cq_Po='
		}
	},
	props: {
		source: {
			type: String,
			default: ''
		}
	},
	mounted () {
		let audio = this.$refs.audio
		console.log(audio, '123456')
		audio.load() // 重新加载音频/视频元素
		let _this = this
		audio.addEventListener('canplay', function () { // 当浏览器可以播放音频时，音频加载分为多个步骤，最开始先加载音频元信息，包括音频时长等，加载完成后，才会执行canplay
			_this.totalTime = _this.transTime(audio.duration)
		})
		audio.addEventListener('timeupdate', function (event) { // 音频播放中触发，监听音频播放时间并更新进度条
			_this.updateProgress(audio)
		}, false)
		audio.addEventListener('ended', function () { // 监听播放完成事件
			_this.audioEnded()
			if (_this.cycle) {
				audio.currentTime = 0
				_this.paused = false
				audio.play()
			}
		}, false)
		audio.addEventListener('onloadedmetadata', function () { // 音频的元信息获取成功后触发，监听metaloaddata， 音频的加载顺序链接：https://www.w3school.com.cn/tags/av_event_loadedmetadata.asp
			_this.totalTime = audio.duration
		}, false)
		this.dragProgressDotEvent(audio)
	},
	methods: {
		setCycle () {
			this.cycle = !this.cycle
		},
		setMuted () {
			this.muted = !this.muted
			let audio = this.$refs.audio
			audio.muted = this.muted
		},
		prevAudio () {
			if (!this.paused) {
				let audio = this.$refs.audio
				let desireTime = audio.currentTime - 10
				audio.currentTime = desireTime < 0 ? 0 : desireTime
			}
		},
		nextAudio () {
			if (!this.paused) {
				let audio = this.$refs.audio
				let desireTime = audio.currentTime + 10
				audio.currentTime = desireTime < audio.duration ? desireTime : audio.duration
			}
		},
		justifyProgress (e) {
			let audio = this.$refs.audio
			// 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
			if (!audio.paused || audio.currentTime !== 0) {
				let audioBoxPadLeft = parseFloat(getComputedStyle(document.getElementsByClassName('audio-box')[0]).paddingLeft)
				let pgsWidth = this.$refs.progressBar.offsetWidth
				let rate = (e.touches[0].clientX - audioBoxPadLeft) / pgsWidth
				audio.currentTime = audio.duration * rate
				this.updateProgress(audio)
			}
		},
		updateProgress (audio) {
			let value = audio.currentTime / audio.duration
			this.progressBarWidth = value * 100 + '%'
			this.progressDotLeft = value * 100 + '%'

			this.currentTime = this.transTime(audio.currentTime)
		},
		/**
		 * 播放完成时把进度调回开始的位置
		 */
		audioEnded () {
			this.progressBarWidth = 0
			this.progressDotLeft = 0
			this.paused = true
		},
		/**
		 * 音频播放时间换算
		 * @param {number} value - 音频当前播放时间，单位秒
		 */
		transTime (value) {
			var time = ''
			var h = parseInt(value / 3600)
			value %= 3600
			var m = parseInt(value / 60)
			var s = parseInt(value % 60)
			if (h > 0) {
				time = formatTimeStr(h + ':' + m + ':' + s)
			} else {
				time = formatTimeStr(m + ':' + s)
			}

			return time
		},
		playPlayer () {
			let audio = this.$refs.audio
			console.log(audio, 'audio')
			if (!audio.src) {
				alert('音频链接不存在')
				return
			}
			if (audio.paused) {
				// 开始播放当前点击的音频
				audio.play()
				this.paused = false
			} else {
				audio.pause()
				this.paused = true
			}
		},
		/**
		 * 鼠标拖动进度点时可以调节进度
		 * @param {*} audio
		 */
		dragProgressDotEvent (audio) {
			let _this = this
			let dot = document.getElementById('progressDot')

			let position = {
				oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
				oriX: 0, // 移动开始时的x坐标
				maxLeft: 0, // 向左最大可拖动距离
				maxRight: 0 // 向右最大可拖动距离
			}
			var flag = false // 标记是否拖动开始

			// 触摸开始时，会记录一个刚开始触发的位置
			dot.addEventListener('touchstart', down, false)

			// 开始拖动，拖动过程中，鼠标的位置会不断变化，通过鼠标终点的位置 - 开始的位置，就是鼠标移动的位置
			document.addEventListener('touchmove', move, false)

			// 拖动结束
			document.addEventListener('touchend', end, false)

			function down (event) {
				if (!audio.paused || audio.currentTime !== 0) { // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
					flag = true

					position.oriOffestLeft = dot.offsetLeft
					position.oriX = event.touches ? event.touches[0].clientX : event.clientX // 要同时适配mousedown和touchstart事件
					position.maxLeft = position.oriOffestLeft // 向左最大可拖动距离
					position.maxRight = _this.$refs.progressBar.offsetWidth - position.oriOffestLeft // 向右最大可拖动距离

					// 禁止默认事件（避免鼠标拖拽进度点的时候选中文字）
					if (event && event.preventDefault) {
						event.preventDefault()
					} else {
						event.returnValue = false
					}

					// 禁止事件冒泡
					if (event && event.stopPropagation) {
						event.stopPropagation()
					} else {
						window.event.cancelBubble = true
					}
				}
			}

			function move (event) {
				if (flag) {
					let clientX = event.touches ? event.touches[0].clientX : event.clientX // 要同时适配mousemove和touchmove事件
					let length = clientX - position.oriX
					if (length > position.maxRight) {
						length = position.maxRight
					} else if (length < -position.maxLeft) {
						length = -position.maxLeft
					}
					let pgsWidth = _this.$refs.progressBar.offsetWidth
					let rate = (position.oriOffestLeft + length) / pgsWidth
					audio.currentTime = audio.duration * rate
					_this.updateProgress(audio)
				}
			}

			function end () {
				flag = false
			}
		}
	}
}
</script>

<style lang="less" scoped>
	.centerDiv {
		width: 100vw;
		height: 500px;
		position: relative;
		.cent {
			width: 800px;
			height: 100px;
			line-height: 100px;
			position: absolute;
			border: 1px solid red;
			left: 50%;
			top: 50%;
		    transform: translate(-50%,-50%);
			/*transform: translateX(-50%) translateY(-50%);*/
		}
	}
	.audio-box {
		height: 220px;
		width: 100%;
		background: #fff;
		padding: 20px 30px;
		position: absolute !important;
		bottom: 1000px;
		border-top: 2px solid red;

		.item-title {
			font-size: 28px;
			color: #333333;
			text-align: center;
			line-height: 40px;
		}

		.progress-box {
			padding-top: 20px;
			width: 100%;
			box-sizing: border-box;
			position: relative;

			.progressBar, .progress {
				background: #DDDDDD;
				border-radius: 2.5px;
				height: 4px;
			}

			.progressBar {
				width: 100%;
				position: relative;
			}

			.progress {
				background: #2C8AE2;
				width: 0;
			}

			.dot-box {
				width: 36px;
				height: 36px;
				border-radius: 50%;
				position: absolute;
				top: 42%;
				transform: translateY(-50%);
				left: 0;
			}

			.progressDot {
				position: absolute;
				top: 50%;
				left: 0%;
				transform: translate(-50%, -50%);
				width: 18px;
				height: 18px;
				border-radius: 50%;
				background: radial-gradient(#fff, #ececec);
				box-shadow: 0 1px 2px #696262;

				&:after {
					content: '';
					width: 300px;
					height: 60px;
					display: inline-block;
					position: absolute;
					top: -50%;
					left: 50%;
					transform: translate(-50%, -10%);
				}
			}

			.audio-time {
				margin-top: 10px;

				.audio-current, .audio-total {
					line-height: 30px;
					font-size: 22px;
					color: #999999;
				}

				.audio-total {
					float: right;
				}
			}
		}

		.control-box {
			display: flex;
			height: 76px;
			line-height: 76px;
			position: absolute;
			left: 30px;
			right: 30px;
			bottom: 18px;

			div {
				width: 20%;
				text-align: center;
			}

			.left-speed, .play, .right-speed {
				color: #1296db;
			}

			.iconplay, .iconstop {
				font-size: 76px;
			}

			.iconhoutuix, .iconqianjinx {
				font-size: 40px;
			}

			.iconxunhuanx, .iconvolcex, .iconno_volcex, .iconxunhuanstop {
				font-size: 36px;
			}
		}
	}

</style>
