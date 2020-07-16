/**
* 此demo 模仿国内版App首页的导航，主要思路是用到getBoundingClientRect 获取元素的定位，然后使用cloneNode 获取克隆的元素，
*
*/



<template>
	<div class="guideBtn">
		<div class="guide-btn" v-for="(item,key) in 2" :key="key" :class="{guide: key == 1}">
			<img src="https://img-pub01.visitshanghai.com.cn/huyouma/15901252443506716.jpeg" alt="">
			<p>图片描述</p>
		</div>
		<div class="guide-step" v-show="guideStepState">
			<div class="guide-verify" ref="guideVerify" v-show="guideVerify" @click="changeGuide">{{guideTitle}}</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'guide_demo',
	components: {},
	data: function () {
		return {
			show: false,
			text: '',
			totalStep: 0,
			guideTitle: '下一步',
			guideVerify: false,
			guideStepState: false,
			guideDom: null
		}
	},
	mounted () {
		this.guideStep()
	},
	methods: {
		guideStep () {
			let dom = document.querySelectorAll('.guide-btn')[this.totalStep]
			console.log(dom, 'dom')
			let style = dom.getBoundingClientRect()
			console.log(style, 'style')
			let copyDom = dom.cloneNode(true)
			copyDom.style.backgroundColor = '#ffffff'
			copyDom.style.left = style.left + 'px'
			copyDom.style.margin = 0
			copyDom.style.top = style.top + 'px'
			copyDom.style.position = 'fixed'
			copyDom.style.zIndex = 3
			document.body.appendChild(copyDom)
			this.guideDom = copyDom

			let verify = this.$refs.guideVerify
			verify.style.top = style.bottom + 20 + 'px'
			verify.style.left = style.left + 20 + 'px'
			this.guideVerify = true
			this.guideStepState = true

			if (this.totalStep == 1) {
				this.guideTitle = '知道了'
			}
			this.totalStep +=1
		},
		changeGuide () {
			this.guideDom.remove()
			if (this.totalStep > 1) {
				this.guideStepState = this.guideVerify = false
			} else {
				this.guideStep()
			}
		}
	}
}
</script>
<style lang="less">
	.guide-btn {
		border: 1px solid red;
		width: 200px;
		height: 150px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		img {
			width: 150px;
			height: 100px;
		}
		&.guide {
			margin-left: 300px;
		}
	}
	.guide-step {
		width: 100vw;
		height: 100vh;
		background: rgba(0,0,0,.75);
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;
	}
	.guide-verify {
		padding: 10px;
		color: #ffffff;
		line-height: 50px;
		text-align: center;
		border-radius: 10px;
		border: 1px solid #ffffff;
		position: absolute;
	}
</style>
