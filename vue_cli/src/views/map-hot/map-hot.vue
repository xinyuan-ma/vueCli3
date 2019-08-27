<template>
	<div class="comp__hot-spot--wrapper" :id="id">
		<img class="comp__hot-spot--cover" :src="cover" :usemap="'#map-'+id" @load='imgLoaded'>
		<map
			v-if="map && map.length > 0"
			:name="'map-'+id"
			:id="'map-'+id"
			:class="{
                hidden: !debug
            }"
		>
			<area
				v-for="(item, index) in maps"
				:key="index"
				:coords="item.coords"
				shape="rect"
				href="javascript:void(0)"
				@click.stop="onClick(index)"
				:class="{
                    hidden: !debug
                }"
			>
		</map>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'hot-spot',

	props: {
		// 视图宽度
		viewWidth: {
			type: Number,
			default: 750 // 默认图片宽度
		},
		cover: {
			type: String,
			default: '',
			required: true
		},

		map: {
			type: Array,
			default () {
				return []
			}
		},

		id: {
			type: [String, Number],
			default: Date.now()
		},

		debug: {
			type: Boolean,
			default: process.env.NODE_ENV !== 'production'
		}
	},

	data () {
		return {
			ratio: 2
		}
	},

	computed: {
		maps () {
			let temp = []

			if (this.map.length > 0) {
				this.map.forEach((item) => {
					temp.push({
						...item,
						coords: item.area.split(',').map((val) => {
							return val * this.ratio
						}).join(',')
					})
				})
			}
			console.log(temp)
			return temp
		}
	},

	created () {
		window.addEventListener('resize', this.onResize)
	},

	mounted () {
		this.onResize()
	},

	beforeDestroy () {
		window.removeEventListener('resize', this.onResize)
	},

	methods: {
		onResize () {
			this.ratio = document.documentElement.clientWidth / this.viewWidth
		},
		imgLoaded () {
			this.$emit('imgLoaded')
		},
		onClick (index) {
			this.$emit('detail', { item: this.map[index], index })
		}
	}
}
</script>

<style lang="less">
	p {
		font-size:36px;
		font-family:PingFangSC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:50px;
		text-align: center;
	}
	.hidden {
		outline: none;
	}
</style>
