/**
*  该模块测试下拉刷新
*/
<template>
	<div>
		<div class="dropdownTest">{{dropText}}</div>
		<div class="dropdown_header">标题</div>
		<drop-down
			:drop-max="50"
			:auto-back="true"
			:drop-type="'follow'"
			:drop-start="dropStart"
			:drop-end="dropEnd"
			:drop-up-start="dropUpStart"
			id="orderList"
			class="orderList-dropdown"
		>
			<div class="drop-down-follow dropDown-tips" slot="drop-down-follow">
				{{dropStateText}}
			</div>
			<ul>
				<li v-for="(item, key) in userInfoData" :key="key">
					<p>{{item.name || item.userName}}</p>
				</li>
			</ul>
		</drop-down>
	</div>
</template>

<script>
import dropDown from '../components/dropDown/index'

export default {
	name: 'dropDownTest',
	components: {
		dropDown
	},
	data: function () {
		return {
			dropText: '',
			dropIndex: 0,
			dropStateText: '继续下拉',
			dropTextList: ['开心学习', '努力学习', '坚持学习'],
			userInfoData: [
				{
					name: '下拉1'
				},
				{
					name: '下拉2'
				}]
		}
	},
	mounted () {},
	methods: {
		// 下拉开始
		dropStart () {
			if (this.dropIndex == this.dropTextList.length) {
				this.dropIndex = 0
			}
			this.dropText = this.dropTextList[this.dropIndex]
			this.dropIndex += 1
		},
		// 下拉到底
		dropEnd () {
			this.dropStateText = '已经到底'
		},
		// 开始回弹
		dropUpStart (dropDown, isTop) {
			if (isTop) {
				this.dropStateText = '继续拉下'
				console.log('调取接口，重新获取数据')
			} else {
				dropDown.dropBack()
			}
		}
	}
}
</script>
<style lang="less">
	.dropdown_header {
		position: absolute;
		left: 0;
		width: 100%;
		top: 0;
		height: 50px;
		text-align: center;
		background-color: rebeccapurple;
	}
	.dropdownTest {
		width: 100%;
		padding-top: 55px;
	}
</style>
