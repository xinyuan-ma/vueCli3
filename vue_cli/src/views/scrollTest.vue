/**
*  该模块测试@scroll 方法，vue自带方法
*/
<template>
	<div class="scrollTest" @scroll="handleScroll">
		<p v-for="(item, key) in 80" :key="key">{{item}}</p>
	</div>
</template>

<script>

export default {
	name: 'scrollTest',
	components: {},
	data: function () {
		return {
			show: false,
			bounce: false
		}
	},
	mounted () {
	},
	methods: {
		handleScroll () {
			console.log(123)
		}
	}
}
</script>
<style lang="less">
	.scrollTest {
		height: 100%;
		overflow: auto;
		p {
			height: 200px;
		}
	}
</style>
