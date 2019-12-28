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
		let redBall = []
		let blueBall = []
		let saveRedBall = []
		let saveBlueBall = []
		for (let i = 1; i <= 33; i++) {
			redBall.push(i.toString())
		}
		for (let i = 1; i <= 16; i++) {
			blueBall.push(i.toString())
		}
		let s1 = '1 3 8 10 17 18 20 21 22 25 31'
		let s2 = '4 6 7 10 18 21 22 23 25 28 29'
		let s3 = '2 4 7 8 9 14 20 21 25 28 30 32'
		// let s5 = '3 11 15 16 18 31 5 10 15 16 18 30 1 6 11 18 21 30 2 6 10 21 30 31 1 4 13 18 21 28'
		let s4 = `${s1} ${s2} ${s3}`
		let s = '1 16 4 10 6 10 11 12 14'
		this.quchong(redBall, s4, saveRedBall)
		this.quchong(blueBall, s, saveBlueBall)
		console.log(saveRedBall, saveBlueBall, 'saveRed')
		console.log(this.getRandomArrayElements(saveBlueBall, 2), 'random')
		// console.log(window.location, 'window.location')
		// console.log(process.env, 'process.env')
		// console.log(url, 'url')
	},
	methods: {
		quchong (ar, sting, saveArr) {
			let set = Array.from(new Set([...sting.split(' ')]))
			ar.forEach(item => {
				if (set.every(arr => {
					if (arr !== item) {
						return true
					}
				})) {
					saveArr.push(item)
				}
			})
		},
		// 一个数组随机获取几个数字
		getRandomArrayElements (arr, count) {
			var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
			console.log(shuffled, 'shuffled')
			while (i-- > min) {
				console.log(i, (i + 1) * Math.random())
				index = Math.floor((i + 1) * Math.random());
				console.log(index, 'index')
				temp = shuffled[index];
				shuffled[index] = shuffled[i];
				shuffled[i] = temp;
				console.log(shuffled, 'shuffled123')
			}
			return shuffled.slice(min);
		}
	}
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
