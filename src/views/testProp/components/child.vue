<template>
	<div class="child">
		<p>子组件 {{name}}</p>
		<grand-son v-bind="$attrs" v-on="$listeners"></grand-son>
	</div>
</template>

<script>
import grandSon from './grandSon'

export default {
	name: 'child',
	inheritAttrs: false,
	data () {
		return {}
	},
	components: {
		grandSon
	},
	props: {
		name: {
			type: [String, Number]
		}
	},
	mounted () {
		console.log(this.$attrs, '$attrs')
	},
	methods: {}
}
</script>

<style lang="less" scoped>
	.child {
		width: 100%;
		height: 400px;
	}
</style>
