<template>
	<div class="scale" ref="html2canvas">
		<p>练习html2canvas 生成图片，并下载下来</p>
		<div>
			<img src="https://picsum.photos/id/10/480/360" alt="" @load="downLoad">
		</div>
		<p>练习html2canvas 生成图片，并下载下来</p>
	</div>
</template>

<script>
import {asyncLoadJs} from '../../common'

export default {
	name: 'scale',
	data () {
		return {
			isLoad: false,
			changeX: false,
			changeY: false,
      obj: {
			  name: 'yuan',
        arr: [1, [2,3], 4],
        fn: function () {
          console.log('fn');
        },
        un: undefined,
        nul: null,
        reg: /boo/i
      },
      arr: [{name:1},{name:2}]
		}
	},
  mounted() {
	  // let arr1 = JSON.parse(JSON.stringify(this.arr))
    // arr1[1].name = 3
    // console.log(arr1, this.arr, 'arr');

    // let obj1 = JSON.parse(JSON.stringify(this.obj))
	  let obj1 = this.deepClone(this.obj)
	  // let obj1 = Object.assign(this.obj)
    obj1.arr[0] = 5
    obj1.arr[1].push(4)
    // console.log(obj1, this.obj, 'obj');
  },
  methods: {
	  deepClone(val) {
	    if (val instanceof Date) return new Date(val)
      if (val instanceof RegExp) return new RegExp(val)
      if (val === null) return null
      if (typeof val != 'object') return val
      let target = new val.constructor()
      for (let key in val) {
        if (val.hasOwnProperty(key)) {
          target[key] = this.deepClone(val[key])
        }
      }
	    return target
    },
    async downLoad () {
			// await asyncLoadJs('https://html2canvas.hertzen.com/dist/html2canvas.min.js')
			// this.$nextTick(()=> {
			// 	this.print('img', 'html2canvas')
			// })
		},
		//hmtl生成Canvas
		async print(type, domName) {
			const self = this
			//绑定开启裁剪元素
			const el = self.$refs[domName];
			//设置图片信息，详细http://html2canvas.hertzen.com/configuration
			const options = {
				// type: 'dataURL',
				backgroundColor: "#FFFFFF",
				width: el.clientWidth,
				height: el.clientHeight,
				// scale: window.devicePixelRatio, //缩放（按照屏幕尺寸像素比）
				scale: 10, // 缩放,值越大 下载图片越清楚
				// allowTaint: true //跨域渲染 ,注意:allowTaint与useCORS不可同时并用，只能开启一个，建议useCORS。
				tainttest: true, // 检测每张图片都已经加载完成
				useCORS: true, //跨域渲染
				logging: false, //打印日志,上线后关闭,默认开启true
				imageTimeout: 15000 //默认标准官方时长 15000
			}
			let canvas = await window.html2canvas(el, options);
			let haibaoImg = canvas.toDataURL("image/jpeg", 1.0)
			this.downloadFile(`${type}.jpg`, haibaoImg);
		},
		loadImg (src) {
			let downloadLink = document.createElement('a');
			downloadLink.download = 'img.jpg'
			downloadLink.href = src;
			downloadLink.click();
		},
		// 下载
		downloadFile(fileName, content) {
			console.log(fileName, 'fileName');
			let aLink = document.createElement('a');
			let blob = this.base64ToBlob(content); // new Blob([content]);
			let evt = document.createEvent('HTMLEvents');
			evt.initEvent('click', true, true);// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
			aLink.download = fileName;
			aLink.href = URL.createObjectURL(blob);
			aLink.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));// 兼容火狐
		},
		// base64转blob
		base64ToBlob(code) {
			let parts = code.split(';base64,');
			let contentType = parts[0].split(':')[1];
			let raw = window.atob(parts[1]);
			let rawLength = raw.length;

			let uInt8Array = new Uint8Array(rawLength);

			for(let i = 0; i < rawLength; ++i) {
				uInt8Array[i] = raw.charCodeAt(i);
			}
			return new Blob([uInt8Array], {type: contentType});
		},
	}
}
</script>

<style lang="less" scoped>
	.scale {
		width: 100%;
		height: auto;
		border: 1px solid rebeccapurple;
		p {
			margin: 20px 0;
		}
		img {
			width: 100%;
			height: 400px;
		}
	}
</style>
