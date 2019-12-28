<template>
	<div class="toast_container">
		<div>
			<p>{{content|filter1|filter2}}</p>
			<p>{{time | timeFormat}}</p>
			<p>{{params1 , params2 | filter3}}</p>
		</div>
	</div>
</template>
<script>
import moment from 'moment' // 时间转化插件
export default {
	name: 'toast',
	data: function () {
		return {
			time: 1575946268910,
			content: '练习filter',
			text: '输入框的内容',
			params1: '练习',
			params2: 'filter传参的案例'
		}
	},
	filters: {
		filter1 (val) {
			return val + ' xin '
		},
		filter2 (val) {
			return val + 'yuan'
		},
		filter3 (value1, value2) {
			return value1 + '--' + value2
		},
		timeFormat (val) {
			return moment(val).format('YYYY-MM-DD HH:mm:ss')
		}
	},
	methods: {}
}
</script>
<style lang="less">
	.toast_container {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		padding-top: 100px;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 1;

		.content {
			line-height: 50px;
			position: relative;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 100;
			color: red;
			background-color: rgba(0, 0, 0);
			padding: 20px;
			width: 500px;
			text-align: center;
		}
	}
</style>
