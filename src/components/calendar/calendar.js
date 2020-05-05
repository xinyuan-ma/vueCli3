import { setToday, getHoliday } from './holiday';
import util from './util';

/**
 * @class Calendar 日历数据生成类
 * @param options 日历配置
 * @method update 根据配置更新/生成日历数据
 * @method setCheckInDate 设置开始时间
 * @method setCheckOutDate 设置离店时间，并返回是否设置成功状态吗
 */

export default class Calendar {
    constructor(options = {}) {
        let _default = {
            minDay: 1, // 最小选择天数 ，默认为最小选中1天
            maxDay: 0, // 最大选择天数，默认不设置。
            beginDate: 0, // 可选择最小时间，默认不限制
            endDate: 0, // 可选择最大时间，默认不限制
            checkInDate: util.now, // 开始时间，默认当天
            checkOutDate: util.now + util.timestamp, // 结束时间，默认第二天
            currentDate: util.now // 当前时间
        };

        this.options = Object.assign(_default, options);
        // 当前时间保存的日历数据
        this.current = util.computedDate(this.options.currentDate);

        // 重置传入的时间为 00：00：00 的时间戳
        this.options.checkInDate = util.computedDate(
            this.options.checkInDate
        ).timestamp;
        this.options.checkOutDate = util.computedDate(
            this.options.checkOutDate ||
                this.options.checkInDate + util.timestamp
        ).timestamp;

        // 假设在初始化阶段 结束时间小于开始时间，则重置结束时间为开始时间与最小选择天数计算后的时间
        if (
            this.options.checkOutDate <
            this.options.checkInDate + util.timestamp * this.options.minDay
        ) {
            this.options.checkOutDate =
                this.options.checkInDate + util.timestamp * this.options.minDay;
        }
        // 假设在初始化阶段，结束时间大于开始时间与最大选择天数之和
        if (
            this.options.checkOutDate >
            this.options.checkInDate + util.timestamp * this.options.maxDay
        ) {
            this.options.checkOutDate =
                this.options.checkInDate + util.timestamp * this.options.maxDay;
        }

        return this;
    }

    // 设置一个月的日历数组
    setMonthDate({ year, month }) {
        let options = this.options;

        let date = new Date(year, month - 1, 1, 0, 0, 0);

        let time = date.getTime();
        // 获取当前月份的第一天是星期几
        let week = date.getDay();
        // 获取当前月份总天数
        let days = util.getMonthDays(year, month - 1);

        let unit = week + days; // 计算生成的单元数
        let unit2 = Math.ceil(unit / 7) * 7;

        let months = [];
        for (let i = 1; i <= unit2; i++) {
            if (i <= week || i > unit) {
                months.push('');
            } else {
                let d = time + util.timestamp * (i - week - 1);
                months.push({
                    year: year, // 年
                    month: month + 1, // 月
                    date: i - week, // 日
                    disabled:
                        (options.beginDate &&
                            d < options.beginDate - util.timestamp) ||
                        (options.endDate && options.endDate < d) ||
                        false, // 是否不可点击
                    timestamp: d, // 时间戳
                    holiday: getHoliday(month, i - week) // 节日
                });
            }
        }
        return months;
    }

    // 设置入住时间
    setCheckInDate(checkInDate) {
        this.options.checkInDate = checkInDate;
        return this;
    }

    // 设置离店时间
    setCheckOutDate(checkOutDate) {
        let options = this.options;
        let boolMin =
            checkOutDate >=
            options.checkInDate + options.minDay * util.timestamp;
        let boolMax =
            checkOutDate <=
            options.checkInDate + options.maxDay * util.timestamp;
        // console.log(
        //     '[calendar setCheckOutDate option]',
        //     options.minDay,
        //     options.maxDay,
        //     boolMin,
        //     boolMax
        // );
        // 判断是否有最小可选天数配置，没有最大可选天数配置
        if (
            (options.minDay && !options.maxDay && boolMin) ||
            // 判断是否有最大可选天数配置，没有最小可选天数配置
            (!options.minDay && options.maxDay && boolMax) ||
            // 判断同时存在最大最小可选天数判断
            (options.minDay && options.maxDay && boolMin && boolMax)
        ) {
            this.options.checkOutDate = checkOutDate;
            return 'update';
        } else {
            this.options.checkOutDate = 0;
            return !boolMin ? 'min' : '' || !boolMax ? 'max' : '';
        }
    }
    // 检查一个时间戳是否在凌晨6点前
    checkDate3am(timestamp) {
        let AM_3 = 6 * 60 * 60 * 1000; // 6个小时时间戳
        let start = util.computedDate(timestamp).timestamp;
        let end = start + AM_3;

        return timestamp >= start && timestamp <= end;
    }
    // 更新
    update() {
        // 设置今天
        setToday();

        // 如果 当前时间属于当天的凌晨3点前，日历的时间 -1
        if (this.checkDate3am(Date.now())) {
            this.options.beginDate = this.options.beginDate
                ? this.options.beginDate - util.timestamp
                : this.options.beginDate;
            this.options.endDate = this.options.endDate
                ? this.options.endDate - util.timestamp
                : this.options.endDate;
        }
        let months = util.computedMonths(
            this.options.beginDate,
            this.options.endDate
        );
        return months.map(month => {
            return Object.assign(month, {
                child: this.setMonthDate(month)
            });
        });
    }

    setMinDay(minDay) {
        this.options.minDay = minDay;
    }

    setMaxDay(maxDay) {
        this.options.maxDay = maxDay;
    }

    setBeginDate(beginDate) {
        this.options.beginDate = beginDate;
    }

    setEndDate(endDate) {
        this.options.endDate = endDate;
    }
}
