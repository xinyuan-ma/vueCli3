<template>
	<div class="grandSon">
		<p>孙子组件{{$attrs.age}}{{$attrs.sex}}</p>
		<button @click="chName">点我改成父组件的name</button>
	</div>
</template>

<script>
export default {
	name: 'grandSon',
	data () {
		return {
		}
	},
	mounted () {
	},
	methods: {
		chName () {
			this.$emit('change', 'change_name')
		}
	}
}
</script>

<style lang="less" scoped>
	.grandSon {
		width: 100%;
		height: 200px;
	}
</style>
