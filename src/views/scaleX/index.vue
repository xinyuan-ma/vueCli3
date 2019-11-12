/**
* 使用transform: scaleX(n)、scaleY(n) 对元素进行x轴或y轴方向的旋转，n是旋转的倍数，默认值是1，n为0是将元素压缩完
* transform-origin: top ;  transform-origin 是选择旋转起始的原点, 如果是scaleX，transform-origin为left center right；如果是scaleY，transform-origin为top center bottom, 默认起点是center
*/
<template>
	<div class="scale">
		<p>
			<button @click="changeX = !changeX">scaleX</button>
		</p>
		<p>
			<button @click="changeY = !changeY">scaleY</button>
		</p>
		<div class="scaleX flex-between" :class="{changeX: changeX}">
			<p>左边的</p>
			<p>右边的</p>
		</div>
		<div class="scaleY" :class="{changeY: changeY}">
			<p>上边的</p>
			<p>下边的</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'scale',
	data () {
		return {
			isLoad: false,
			changeX: false,
			changeY: false
		}
	},
	mounted () {
	},
	methods: {}
}
</script>

<style lang="less" scoped>
	p {
		font-size: 40px;
		line-height: 40px;
		text-align: center;
	}
	.scaleX {
		padding: 30px 0;
		background-color: darkolivegreen;
		transform: scaleX(0);
		transition: transform 0.5s cubic-bezier(0.42, 0, 0.58, 1);
		transform-origin: left;
		&.changeX {
			transform: scaleX(1);
		}
	}
	.scaleY {
		padding: 30px 0;
		background-color: rebeccapurple;
		transform: scaleY(0);
		transition: transform 0.5s cubic-bezier(0.42, 0, 0.58, 1);
		transform-origin: top;
		&.changeY {
			transform: scaleY(1);
		}
	}
</style>
