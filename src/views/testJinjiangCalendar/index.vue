/* eslint-disable */
<template>
	<div class="toast_container">
		<div class="time-content">
			<span class="info" @click="openCanlender">住店</span>
			<span class="info" @click="openCanlender">离店</span>
		</div>
		<div class="time-content">
			<span>{{checkInDate | tiemFormat}}</span>
			<span>{{checkOutDate | tiemFormat}}</span>
		</div>
	</div>

</template>
<script>
import calender from '../../components/calendar/index.js'

export default {
	name: 'toast',
	data: function () {
		return {
			checkInDate: new Date().getTime(),
			checkOutDate: new Date().getTime() + 1 * 24 * 60 * 60 * 1000
		}
	},
	filters: {
		tiemFormat: time => {
			let d = new Date(time)
			return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'
		}
	},
	methods: {
		openCanlender () {
			let success = res => {
				console.log(res, 'data')
				this.checkInDate = res.result.checkInDate
				this.checkOutDate = res.result.checkOutDate
			}
			let data = {
				checkInDate: this.checkInDate,
				checkOutDate: this.checkOutDate
			}
			calender({ data, success })
		}
	}
}
</script>
<style lang="less">
	.toast_container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;

		.time-content {
			box-sizing: border-box;
			width: 100%;
			line-height: 40px;
			display: flex;
			align-items: center;
			justify-content: space-around;
			&:first-of-type {
				margin-top: 100px;
			}

			.info {
				padding: 12px;
				background-color: #5bc0de;
			}
		}
	}
</style>
