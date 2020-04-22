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
import url from '@/config'

export default {
	mounted () {
		// 项目地址 http://localhost:8080/yuan/#/
		console.log(window.location, 'window.location')
		console.log(process.env, 'process.env')
		console.log(url, 'url')
	}
}

</script>
<style lang="less">
	#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
		text-align: center;
		color: #2c3e50;
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
