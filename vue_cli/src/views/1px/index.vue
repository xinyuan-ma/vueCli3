<template>
	<div class="scale">
		<p>1px实现的两种方式</p>
		<br>
		<div class="type_1">方法1,通过伪类实现</div>
		<br>
		<div class="type_2">方法2，封装的方法,可以灵活实现4个边框的1px（推荐使用这一种）</div>
		<br>
	</div>
</template>

<script>
export default {
	name: 'scale',
	data () {
		return {
		}
	},
	mounted () {
	},
	methods: {}
}
</script>

<style lang="less" scoped>
	@import "./mixins";
	div {
		width: 100%;
		height: 60px;
		text-align: center;
		line-height: 60px;
	}
	.type_1 {
		width: 100%;
		position: relative;
		border-top: 1px solid red;
		&:after {
			width: 100%;
			height: 1px;
			background-color: red;
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			transform: scaleY(.5);
		}
	}
	.type_2 {
		font-size: 12px;
		.border-1px(1px, red, bottom);
	}
</style>
