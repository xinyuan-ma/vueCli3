<template>
	<div class="content">
		<div id="main"></div>
		<div id="main1"></div>
		<div id="main2"></div>
	</div>
</template>
<script>
import {asyncLoadJs} from '../../common'

export default {
	name: 'echart',
	data: function () {
		return {
			dataList: [
				{name:"南海诸岛",value:0},
				{name: '北京', value: 1},
				{name: '天津', value: 2},
				{name: '上海', value: 3},
				{name: '重庆', value: 4},
				{name: '河北', value: 5},
				{name: '河南', value: 5},
				{name: '云南', value: 5},
				{name: '辽宁', value: 5},
				{name: '黑龙江', value: 5},
				{name: '湖南', value: 5},
				{name: '安徽', value: 5},
				{name: '山东', value: 5},
				{name: '新疆', value: 5},
				{name: '江苏', value: 5},
				{name: '浙江', value: 5},
				{name: '江西', value: 5},
				{name: '湖北', value: 5},
				{name: '广西', value: 5},
				{name: '甘肃', value: 5},
				{name: '山西', value: 5},
				{name: '内蒙古', value: 5},
				{name: '陕西', value: 5},
				{name: '吉林', value: 5},
				{name: '福建', value: 5},
				{name: '贵州', value: 5},
				{name: '广东', value: 5},
				{name: '青海', value: 5},
				{name: '西藏', value: 5},
				{name: '四川', value: 5},
				{name: '宁夏', value: 5},
				{name: '海南', value: 5},
				{name: '台湾', value: 5},
				{name: '香港', value: 5},
				{name: '澳门', value: 5}
			]
		}
	},
	async mounted () {
		await asyncLoadJs('https://img-pub01.visitshanghai.com.cn/echarts.min.js')
		await asyncLoadJs('https://img-pub01.visitshanghai.com.cn/js/china.js')
		this.initMap()
		this.initMap1()
		this.initMap2()
	},
	methods: {
		initMap () {
			var myChart = echarts.init(document.getElementById('main'));
			let option = {
				tooltip: {
					formatter:function(params,ticket, callback){
						return params.seriesName+'<br />'+params.name+'：'+params.value
					}//数据格式化
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				visualMap: {
					min: 0,
					max: 1500,
					left: 'left',
					top: 'bottom',
					text: ['高','低'],//取值范围的文字
					inRange: {
						color: ['#e0ffff', '#006edd']//取值范围的颜色
					},
					show:true//图注
				},
				geo: {
					map: 'china',
					roam: false,//不开启缩放和平移
					zoom:1.23,//视角缩放比例
					label: {
						normal: {
							show: true,
							fontSize:'10',
							color: 'rgba(0,0,0,0.7)'
						}
					},
					itemStyle: {
						normal:{
							borderColor: 'rgba(0, 0, 0, 0.2)'
						},
						emphasis:{
							areaColor: '#F3B329',//鼠标选择区域颜色
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							shadowBlur: 20,
							borderWidth: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				},
				series : [
					{
						name: '数据',
						type: 'map',
						geoIndex: 0,
						data: this.dataList
					}
				]
			};
			myChart.setOption(option);
			myChart.on('click', function (params) {
				alert(params.name);
			});

			/*  setTimeout(function () {
                  myChart.setOption({
                      series : [
                          {
                              name: '信息量',
                              type: 'map',
                              geoIndex: 0,
                              data:dataList
                          }
                      ]
                  });
              },1000)*/
		},
		initMap1 () {
			var myChart = echarts.init(document.getElementById('main1'));
			let option = {
				grid: { // 柱状图或折线图整体偏移
					left: '3%',
					right: '4%',
					bottom: '10%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					axisTick: {
						alignWithLabel: true  /*分类和分类的柱状图对齐*/
					}
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					type: 'line',
					data: [10, 52, 200, 334, 390, 330, 220]
				}]
			};
			myChart.setOption(option);
			myChart.on('click', function (params) {
				alert(params.name);
			});

			/*  setTimeout(function () {
                  myChart.setOption({
                      series : [
                          {
                              name: '信息量',
                              type: 'map',
                              geoIndex: 0,
                              data:dataList
                          }
                      ]
                  });
              },1000)*/
		},
		initMap2 () {
			var myChart = echarts.init(document.getElementById('main2'));
			let option = {
				grid: {
					left: '3%',
					right: '4%',
					bottom: '10%',
					containLabel: true
				},
				// 工具箱 echarts上自带的工具
				// toolbox: {
				// 	show: true,
				// 	feature:{
				// 		saveAsImage:{
				// 			show:true
				// 		},
				// 		restore:{
				// 			show:true
				// 		},
				// 		dataView:{
				// 			show:true
				// 		},
				// 		dataZoom:{
				// 			show:true
				// 		},
				// 		magicType:{
				// 			type:['line','bar']
				// 		}
				//
				// 	}
				// },
				tooltip:{
					trigger:'axis'
				},
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					axisTick: {
						alignWithLabel: true
					}
				},
				yAxis: [{
					type: 'value'
				}],
				series: [{
					type: 'bar',
					barWidth: '60%', // 设置柱状图的宽度
					data: [10, 52, 200, 334, 390, 330, 220]
				}]
			};

			myChart.setOption(option);
			myChart.on('click', function (params) {
				alert(params.name);
			});

			/*  setTimeout(function () {
                  myChart.setOption({
                      series : [
                          {
                              name: '信息量',
                              type: 'map',
                              geoIndex: 0,
                              data:dataList
                          }
                      ]
                  });
              },1000)*/
		}
	}
}
</script>
<style lang="less">
	.content {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0,0,0,0.4);
		z-index: 1;
		overflow: auto;
		#main {
			width: 100%;
			height: 500px;
		}
		#main1, #main2 {
			width: 400px;
			height: 200px;
		}
	}
</style>
