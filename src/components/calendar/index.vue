/* eslint-disable */
<template>
	<transition name="slideRight">
		<div class="calendar-wrapper" v-show="show">
			<header class="calendar-title">
				<div class="iconfont icon-daohangfanhui" @click="hide">
					<img src="../../assets/go.png" alt="">{{title}}
				</div>
			</header>
			<header class="calendar-header">
				<ul>
					<li
						v-for="(title, key) in weekTitle"
						:key="key"
					>
						{{title}}
					</li>
				</ul>
			</header>
			<freeze-scroll-list class="calendar-container" position="absolute" height="auto">
				<template
					v-for="month in months"
				>
					<h5 class="calendar-month-title freeze">{{month.year}}年{{month.month}}月</h5>
					<ul class="calendar-month-list">
						<li
							v-for="item in month.child"
							:key="item.timestamp"
							:class="{
                                'calendar-month-item': 1,
                                'active': inDate && outDate && item.timestamp >= inDate && item.timestamp <= outDate,
                                'begin': item.timestamp == inDate,
                                'end': item.timestamp == outDate,
                                'disabled': item.disabled
                            }"
							@click="dateClick(item)"
						>
							<p class="calendar-date"
							   v-if="item.date"
							>
								<span class="calendar-date-before">{{item.date}}</span>
								<span class="calendar-date-after"></span>
							</p>
							<p class="calendar-info"
							   v-if="!item.disabled"
							   v-show="item.timestamp == inDate || item.timestamp == outDate || item.holiday"
							>
								{{item.timestamp == inDate ? checkInString :
								(item.timestamp == outDate ? checkOutString :
								item.holiday)}}
							</p>
						</li>
					</ul>
				</template>
			</freeze-scroll-list>
			<transition name="slideUp">
				<div class="calendar-warn-wrapper" v-if="warn">
					<p>{{warn}}</p>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
import Calendar from './calendar'
import util from './util'
import FreezeScrollList from './freeze-scroll-list'
// import {
// getAllQuery
// encodeQuery
// } from '@@/query';
// import {hasOwn} from '@@/validator';

let now = Date.now()
let noop = function () {}
// const HASH_KEY = '_oc_';

export default {
	name: 'Calendar',
	defaultData: {
		type: 'double', // 点击类型，double为分别分则入住离店时间，once为只选择入住时间自动选择离店时间（入住时间加一天）
		checkInDate: now,   // 入住时间
		checkOutDate: now + util.timestamp * 1, // 离店时间
		checkInString: '入住', // 入住时间下标文案
		checkOutString: '离店', // 离店时间下标文案
		minDays: 0, // 最小入住时间
		maxDays: 90, // 最大入住时间
		beginDate: now, // 日历可选择开始时间
		endDate: now + util.timestamp * 90, // 日历可选择结束时间
		success: noop
	},
	data () {
		return Object.assign({
			weekTitle: ['日', '一', '二', '三', '四', '五', '六'], // 日历头部星期标题
			calendar: null, // 当前日历实例
			months: [], // 保存日历月份数据
			warn: '', // 用户操作警告信息
			warnTimer: null, // 警告计时器
			show: false
		}, this.$options.defaultData)
	},
	computed: {
		inDate () {
			let inDate = util.computedDate(this.checkInDate).timestamp
			this.calendar && this.calendar.setCheckInDate(inDate)
			return inDate
		},
		outDate () {
			let checkInDate = this.checkInDate
			let checkOutDate = this.checkOutDate
			if (checkOutDate == 0) {
				return 0
			}
			// 假设在初始化阶段 结束时间小于开始时间，则重置结束时间为开始时间与最小选择天数计算后的时间
			if (checkOutDate < checkInDate + util.timestamp * this.minDays) {
				checkOutDate = checkInDate + util.timestamp * this.minDays
			}
			// 假设在初始化阶段，结束时间大于开始时间与最大选择天数之和
			if (checkOutDate > checkInDate + util.timestamp * this.maxDays) {
				checkOutDate = checkInDate + util.timestamp * this.maxDays
			}
			let outDate = util.computedDate(checkOutDate).timestamp
			this.calendar && this.calendar.setCheckOutDate(outDate)
			return outDate
		},
		title () {
			if (this.inDate && this.outDate) {
				return '请选择入住时间'
			} else {
				return '请选择离店时间'
			}
		}
	},
	watch: {
		show (show) {
			if (show) {
				this.initCalendar()
				let calendar = this.calendar
				calendar.setCheckInDate(this.inDate)
				calendar.setCheckOutDate(this.outDate)
				calendar.setBeginDate(this.beginDate)
				calendar.setEndDate(this.endDate)
				calendar.setMinDay(this.minDays || 1)
				calendar.setMaxDay(this.maxDays || 90)
				this.update()
				// let pre = window.location.hash.split('?')[0] + '?';
				// window.location.hash = pre + encodeQuery(Object.assign(getAllQuery(), {
				//     [HASH_KEY]: 1
				// }));
			}
		},
		warn (warn) {
			if (warn) {
				this.warnTimer && clearTimeout(this.warnTimer)
				this.warnTimer = setTimeout(() => {
					this.warn = ''
				}, 2000)
			}
		}
	},
	methods: {
		initCalendar () {
			if (!this.calendar) {
				this.calendar = new Calendar()
				console.log(this.calendar, 'this.calendar')
			}
		},
		// 更新日历数据
		update () {
			this.months = this.calendar.update()
		},
		hide () {
			this.show = false
			// window.history.go(-1);
		},
		// hasChange() {
		//     let query = getAllQuery();
		//     if (hasOwn(query, HASH_KEY)) {
		//         this.show = query[HASH_KEY] == '1';
		//     } else {
		//         this.show = false;
		//     }
		// },
		// 日历选择成功回调
		callback () {
			setTimeout(() => {
				this.show = false
				this.success && this.success({
					msgCode: 100,
					result: {
						checkInDate: this.checkInDate,
						checkOutDate: this.checkOutDate
					}
				})
			}, 300)
		},
		dateClick (date) {
			if (!date || date.disabled) {
				return
			}
			let inDate = this.inDate
			let outDate = this.outDate
			// 已有入住离店日期或者入住离店日期均为空
			// 本次点击为选择入住时间
			if ((inDate && outDate) || (!inDate && !outDate)) {
				this.checkInDate = date.timestamp
				this.checkOutDate = 0
			}
			// 有入住时间，但没有离店时间
			if (inDate && !outDate) {
				// 判断当前点击日期是否是入住日期
				// 一致则表示取消当前选中的入住日期
				if (date.timestamp == inDate) {
					this.checkInDate = 0
					// 如果点击如期钓鱼入住日期
					// 表示重新选择入住日期
				} else if (date.timestamp < inDate) {
					this.checkInDate = date.timestamp
				} else {
					// 通过接口拿到当前点击的日期是否符合已有的离店日期规则，返回状态
					// state == update 表示可以更新 离店日期，否则给出警告
					let state = this.calendar.setCheckOutDate(date.timestamp)
					if (state === 'update') {
						this.checkOutDate = date.timestamp
						this.callback()
					} else {
						this.warn = state == 'min' ? `至少入住${this.minDays}天` : `最多入住${this.maxDays}天`
					}
				}
			}
		}
	},
	created () {
		let href = window.location.href
		window.addEventListener('hashchange', () => {
			if (href !== window.location.href) {
				this.show = false
				href = window.location.href
			}
		}, false)
	},
	components: {
		FreezeScrollList
	}
}
</script>

<style lang="less" scoped src="./index.less">
</style>
