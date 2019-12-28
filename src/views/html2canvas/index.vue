<template>
	<div class="toast_container">
		<div ref="printMe" style="padding: 10px; background: #f5da55">
			<h1 style="color: #000; ">Print me!</h1>
			<img src="http://hhh.images.visitshanghai.com.cn/app/newFoodTop.jpg?imageView2/1/w/750/h/330" alt="" style="width: 300px; height: 200px">
		</div>
		<!-- OUTPUT -->
		<p>下面的图片是通过canvas绘制的</p>
		<img :src="output" style="width: 100%; height: auto">
	</div>
</template>
<script>
import Vue from 'vue'
import html2canvas from 'vue-html2canvas';
Vue.use(html2canvas)
export default {
	name: 'toast',
	data: function () {
		return {
			output: ''
		}
	},
	components: {
		html2canvas
	},
	methods: {
		async print() {
			let self = this
			const el = self.$refs.printMe;
			// add option type to get the image version
			// if not provided the promise will return
			// the canvas.
			const options = {
				type: 'dataURL',
				backgroundColor: "#EEEEEE",
				width: el.width,
				height: el.height,
				scale: window.devicePixelRatio, //缩放（按照屏幕尺寸像素比）
				// scale: 2, //缩放
				// allowTaint: true //跨域渲染 ,注意:allowTaint与useCORS不可同时并用，只能开启一个，建议useCORS。
				tainttest: true, // 检测每张图片都已经加载完成
				useCORS: true, //跨域渲染
				logging: false, //打印日志,上线后关闭,默认开启true
				imageTimeout: 15000 //默认标准官方时长 15000
			}
			self.output = await self.$html2canvas(el, options);
		}
	},
	mounted () {
		setTimeout( () => {
			this.print()
		}, 2000)
	}
}
</script>
<style lang="less">
	.toast_container {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0,0,0,0.4);
		z-index: 1;
		.content {
			line-height: 50px;
			position: relative;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 100;
			color: red;
			background-color: rgba(0,0,0);
			padding: 20px;
			width: 500px;
			text-align: center;
		}
	}
</style>
