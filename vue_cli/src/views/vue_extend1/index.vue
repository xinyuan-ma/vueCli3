<template>
	<div class="toast_container" @click.stop="hidden" v-show="show">
		<div class="content" @click.stop="hidden1">{{content}}</div>
	</div>
</template>
<script>
export default {
	name: 'toast',
	data: function () {
		return {
			content: 'toast页面',
			show: false
		}
	},
	methods: {
		openShow () {
			this.show = true
		},
		hidden () {
			this.show = false
		},
		hidden1 () {
			console.log('hidden1')
		}
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
