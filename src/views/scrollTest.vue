<!--/**-->
<!--*  该模块测试@scroll 方法，vue自带的滚动方法-->
<!--*/-->
<!--<template>-->
<!--	<div class="scrollTest" @scroll="handleScroll">-->
<!--		<p v-for="(item, key) in 10" :key="key">{{item}}</p>-->
<!--	</div>-->
<!--</template>-->
<template>
    <div class="container">
        <Test1 data="123" name="567"></Test1>
    </div>
</template>

<script>
import Test1 from './test/test'
export default {
	name: 'scrollTest',
	components: {
      Test1
    },
	data: function () {
		return {
			show: false,
			bounce: false
		}
	},
	mounted () {
		window.addEventListener('online', function () {
			console.log('网络打开', window.navigator.onLine)
		})
		window.addEventListener('offline', function () {
			console.log('网络关闭', window.navigator.onLine)
		})
	},
  // render () {
  //   return (
  //     <div>
  //     {(<p>{(<span>span标签</span>)}</p>)}
  //     </div>
  // )
  // },
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
			height: 30px;
		}
	}
    .container {
        background-color: yellowgreen;
        position: relative;
        .flex {
            width: 100px;
            height: 300px;
            background-color: red;
            position: absolute;
            top: 0;
            left: 0;
        }
    }
</style>
