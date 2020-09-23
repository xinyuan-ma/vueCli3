/* eslint-disable */

<template>
	<div id="app">

		<div>
			Id:<input type="text" v-model="id">
			Name:<input type="text" v-model="name">
			<input type="button" value="添加" @click="add">
		</div>

		<!-- <ul> -->
		<!-- 在实现列表过渡的时候，如果需要过渡的元素，是通过 v-for 循环渲染出来的，不能使用 transition 包裹，需要使用 transitionGroup -->
		<!-- 如果要为 v-for 循环创建的元素设置动画，必须为每一个 元素 设置 :key 属性 -->
		<!-- 给 transition-group 添加 appear 属性，实现页面刚展示出来时候，入场时候的效果 -->
		<!-- 通过 为 transition-group 元素，设置 tag 属性，指定 transition-group 渲染为指定的元素，如果不指定 tag 属性，默认，渲染为 span 标签 -->
		<transition-group appear>
			<li v-for="(item, i) in list" :key="item.id" @click="del(i)">
				{{item.id}}-{{item.name}}
			</li>
		</transition-group>


	</div>
</template>

<script>
export default {
	data () {
		return {
			id: '',
			name: '',
			list: [
				{ id: 1, name: '赵高' },
				{ id: 2, name: '秦桧' },
				{ id: 3, name: '严嵩' },
				{ id: 4, name: '魏忠贤' }
			]
		}
	},
	methods: {
		add () {
			this.list.push({ id: this.id, name: this.name })//追加到列表最后
			this.id = this.name = ''
		},
		del (i) {
			let item = this.list[i]
			this.list.splice(i, 1)//从第i处删除1个元素
			this.list.unshift(item)
		}
	}
}
</script>

<style lang="less">
	li {
		border: 1px dashed #999;
		margin: 5px;
		line-height: 35px;
		padding-left: 5px;
		font-size: 12px;
		width: 100%;
	}

	li:hover {
		background-color: rebeccapurple;
		transition: all 0.8s ease; // 鼠标移动颜色渐变动画
	}

	.v-enter,
	.v-leave-to {
		opacity: 0; //设置元素的不透明级别：
		transform: translateY(200px); // 开始和结束位置在Y轴的80px处
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.6s ease; // 从Y轴的80px处渐渐移动到上面
	}

	.v-move {
		transition: all 0.6s ease;
	}

</style>
