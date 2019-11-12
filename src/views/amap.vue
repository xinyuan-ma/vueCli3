<template>
	<div class="amap">
		<div id="container"></div>
		<p>医院：{{hospital.name}}</p>
		<p>警察局：{{publicSecurity.name}}</p>
	</div>
</template>

<script>

export default {
	name: 'amap',
	components: {},
	data: function () {
		return {
			show: false,
			bounce: false,
			hospital: {},
			publicSecurity: {}
		}
	},
	created () {
		this.setMap(this, '113.627145', '34.760052')
	},
	methods: {
		/**
		 * 搜索周边信息
		 * @param params
		 */
		placeSearch (params) {
			this.MapLoader().then(AMap => {
				AMap.service(['AMap.PlaceSearch'], () => {
					var placeSearch = new AMap.PlaceSearch({
						type: params.keywords,
						pageSize: 50,
						pageIndex: 1,
						city: '0371', // 所在城市的编号
						lang: params.lang
					})
					const center = [params.lon, params.lat] // 中心点坐标
					placeSearch.searchNearBy(params.keywords, center, 20000, (status, result) => {
						// 搜索成功时，result即是对应的匹配数据
						if (result.info === 'OK' && result.poiList) {
							let aTemp = result.poiList.pois
							let aFilterTemp = [] // 遍历获取距离信息
							aFilterTemp = aTemp.filter((item, index) => {
								return item.name.indexOf(params.keywords) !== -1 ||
									item.name.indexOf(params.enKeywords) !== -1
							})
							params.callback && params.callback(aFilterTemp)
						}
					})
				})
			})
		},
		MapLoader () {
			return new Promise((resolve, reject) => {
				if (window.AMap) {
					resolve(window.AMap)
				} else {
					var script = document.createElement('script')
					script.type = 'text/javascript'
					script.async = true
					script.src = 'http://webapi.amap.com/maps?v=1.4.15&callback=initAMap&key=d2c8ab40333905292bca0b5ff74a56e8'
					script.onerror = reject
					document.head.appendChild(script)
				}
				console.log(window.initAMap, 'window.initAMap')
				window.initAMap = () => {
					resolve(window.AMap)
				}
			})
		},
		setMap (self, gdLongitude, gdLatitude) {
			let _this = self
			// const _language = _this.isZH ? 'zh_cn' : 'en' // 可选值：en，zh_en, zh_cn
			const _language = 'zh_cn' // 可选值：en，zh_en, zh_cn
			const center = [gdLongitude, gdLatitude]
			this.MapLoader().then(AMap => {
				_this.map = new AMap.Map('container', {
					center: center,
					pitch: 50,
					// viewMode: '3D',
					zoom: 14,
					lang: _language,
					// rotateEnable: true,
					// showBuildingBlock: true,
					// pitchEnable: true,
					// skyColor: '#58C3F6',
					// scrollWheel: true,
					// zoomEnable: true
					dragEnable: false,
					keyboardEnable: false,
					doubleClickZoom: false,
					zoomEnable: false
				})
				// 中心点位置
				const icon = new AMap.Icon({
					size: new AMap.Size(24, 33), // 图标尺寸
					image: 'http://hhh.images.visitshanghai.com.cn/location.png', // Icon的图像
					imageSize: new AMap.Size(24, 33) // 根据所设置的大小拉伸或压缩图片
				})
				// // '31.233492', '121.505401'
				// var path = [ ['121.505401', '31.233492'], ['125.505401', '33.233492'], ['127.505401', '35.233492'] ] // 简写
				// var polyline = new AMap.Polyline({
				//   path: path
				// })
				const marker = new AMap.Marker({
					icon: icon,
					position: center,
					offset: new AMap.Pixel(-10, -10)
				})
				marker.setMap(_this.map)
				// 获取附近医院
				this.placeSearch({
					keywords: '医院',
					enKeywords: 'Hospital',
					lon: gdLongitude,
					lat: gdLatitude,
					lang: _language,
					callback: (res) => {
						console.log(res, 'res')
						_this.hospital = res.length > 0 && res[0]
					}
				})
				// 获取附近公安局
				this.placeSearch({
					keywords: '公安',
					enKeywords: 'Police',
					lon: gdLongitude,
					lat: gdLatitude,
					lang: _language,
					callback: (res) => {
						console.log(res, 'res')
						_this.publicSecurity = res.length > 0 && res[0]
					}
				})
			}, e => {
				console.log('地图加载失败', e)
			})
		}
	}
}
</script>
<style lang="less">
	.amap {
		#container {
			width: 100%;
			height: 80vw;
		}
		p {
			text-align: right;
		}
	}
</style>
