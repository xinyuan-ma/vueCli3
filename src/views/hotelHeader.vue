<template>
	<div class="hotelHeader">
		<div></div>
		<div></div>
	</div>
</template>

<script>

export default {
	name: 'hotelHeader',
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

</style>
