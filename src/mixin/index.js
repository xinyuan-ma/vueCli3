export default {
	data: function () {
		return {
			mixinData: 'mixinData'
		}
	},
	mounted () {
		console.log('mounted')
	},
	methods: {
		mixinFn () {
			console.log('mixinFn')
		}
	}
}
