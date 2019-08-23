<template>
	<div class="transition_demo">
		<button @click="show = !show">阿牛</button>
		<transition name="bounce">
			<p v-if="bounce">我是一个p标签</p>
		</transition>

		<!--当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们-->
		<transition name="fade" mode="out-in">
			<p v-if="show" key="first">我是第一个p标签</p>
			<p v-else key="second">我是第二个p标签</p>
		</transition>

		<!--使用animate.css动画-->
		<transition enter-active-class="animated rotateInDownLeft" leave-active-class="animated rotateOutUpLeft">
			<p v-if="show">hello</p>
		</transition>

	</div>
</template>

<script>

export default {
	name: 'transition_demo',
	components: {},
	data: function () {
		return {
			show: false,
			bounce: false
		}
	}
}
</script>
<style lang="less">
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.custom-appear-class, .custom-appear-active-class {
		transition: opacity 2s;
	}

	.bounce-enter-active {
		animation: boucn-in .5s;
	}

	.bounce-leave-active {
		animation: boucn-in .5s reverse;
	}

	@keyframes boucn-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.4);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
