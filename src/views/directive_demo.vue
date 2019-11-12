<template>
	<div class="direvtive_demo">
		<input v-focus type="text" v-model="text" placeholder="输入内容">
		<div class="nice" v-changeColor>改变颜色</div>
		<img @load="downLoad"
			 src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565257256661&di=31fe15396e4e104a3ab879bc4d865ec4&imgtype=0&src=http%3A%2F%2Fimg65.chem17.com%2F1%2F20170713%2F636355580997454706981.jpg"
			 alt="">
	</div>
</template>

<script>
import mixin from '@/mixin'

export default {
	name: 'direvtive_demo',
	components: {},
	mixins: [mixin],
	directives: {
		focus: {
			// 指令的定义
			inserted: function (el) {
				el.focus()
				el.style.borderColor = '#ED1C24'
			}
		},
		changeColor: {
			// 改变元素的颜色
			inserted: function (el) {
				el.style.color = '#ED1C24'
			}
		}
	},
	data: function () {
		return {
			show: false,
			text: ''
		}
	},
	mounted () {
		this.mixinFn()
	},
	methods: {
		downLoad () { // load图片加载成功后执行的回调
			console.log('downLoad')
		}
	}
}
</script>
<style lang="less">
	.direvtive_demo {
		.nice {
			margin-top: 50px;
			height: 200px;
			border: 1px solid deepskyblue;
		}

		img {
			width: 100vw;
			height: 20vw;
		}
	}
</style>
