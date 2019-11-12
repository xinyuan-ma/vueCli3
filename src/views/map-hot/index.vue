/**
*tehui 图片的蓝湖地址，上面有具体的尺寸，https://lanhuapp.com/web/#/item/project/board/detail?pid=470539db-c514-4bb6-9a99-55a2d5a274b3&project_id=470539db-c514-4bb6-9a99-55a2d5a274b3&image_id=4a75f83c-d8d7-4d59-8c7d-6c0b6eb96fb1
*/
<template>
	<div class="map">
		<map-hot
			:cover="require(`../../static/image/tehui.png`)"
			:map="spots"
			@detail="goNext"
		></map-hot>
	</div>
</template>

<script>
import mapHot from './map-hot.vue'

export default {
	name: 'home',
	components: {
		mapHot
	},
	data: function () {
		return {
			spots: [
				{
					// 50,131, 250,403 代表上海牌手表的区域
					area: '50,131, 250,403', // 区域是按照两个点的坐标计算，左上角到右下角 从原点（0.0开始），坐标从左上角开始计算
					link: '/first'
				},
				{
					area: '275,131, 475,403',  // 代表老凤祥区域
					link: '/second'
				},
				{
					area: '500,131, 700,403',  // 代表张小泉区域
					link: '/third'
				}
			]
		}
	},
	mounted () {
		console.log(this, 'mapHot')
		// this.$toast({
		// 	content: '这是toast弹框'
		// })
	},
	methods: {
		goNext (val) {
			console.log(val)
		}
	}
}
</script>
<style lang="less">
	.map {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		img {
			width: 100%;
		}
	}
</style>
