<template>
	<div id="app">
		<!--<div id="nav">-->
		<!--<router-link to="/">Home</router-link> |-->
		<!--<router-link to="/about">About</router-link>-->
		<!--</div>-->
		<router-view/>
	</div>
</template>

<script>
// import url from '@/config'
// import * as caipiao from  '../../common/caipiao'

export default {
	mounted () {
		// console.log(window.location, 'window.location')
		// console.log(process.env, 'process.env')
		// console.log(url, 'url')
	},
	methods: {}
}

</script>
<style lang="less">
	@import '../../style/reset.css';
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;
		width: 100%;
	}

	#nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}

		img {
			display: inline-block;
			width: 200px;
		}
	}
</style>
