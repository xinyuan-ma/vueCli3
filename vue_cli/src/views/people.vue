<template>
	<div class="people">
		<div class="socrollX">
			<div class="content" v-for="(item,key) in content" :key="key">
				<img :src="item.imgUrl" alt="">
				<p>{{item.title}}</p>
			</div>
		</div>
		<p>这是多个组件</p>
	</div>
</template>

<script>

export default {
	name: 'people',
	components: {},
	data: function () {
		return {
			show: false,
			bounce: false,
			content: [
				{
					imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/culture_1.jpg',
					title: '这是一个图片'
				}
			]
		}
	},
	mounted () {
		for (let i = 0; i < 4; i++) {
			this.content = this.content.concat(this.content)
		}
	}
}
</script>
<style lang="less">
	.socrollX {
		display: flex;
		overflow-x: auto;
		height: 400px;
		background-color: #FFFFFF;

		.content {
			display: flex;
			flex-direction: column;
			margin: 20px;
			justify-content: space-between;
			img {
				flex-shrink: 0;
				width: 350px;
				height: 250px;
				border-radius: 20px;
			}
			p {
				font-size: 24px;
			}
		}
	}
</style>
