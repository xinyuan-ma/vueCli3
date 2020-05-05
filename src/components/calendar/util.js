export default {
    now: Date.now(),
    timestamp: 86400000,
    /**
     * @method 获取当前年月份的天数
     * @param year {Number} 年份
     * @param month {Number} 月份 从0开始
     * @return days {Number} 天数
     */
    getMonthDays(year, month) {
        if (month === 1) {
            // 计算闰年下 2月有 29天，普通年2月有28天
            return (year % 100 !== 0 && year % 4 === 0) || year % 400 === 0 ? 29 : 28;
        } else {
            return [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        }
    },
    /**
     * 计算当前时间戳对应的年月份星期
     */
    computedDate(date) {
        if (date <= 0) {
            return {
                timestamp: 0
            };
        }

        let d = new Date();
        d.setTime(date);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let da = d.getDate();
        return {
            week: d.getDay(),
            year,
            month,
            date: da,
            timestamp: new Date(year, month - 1, da, 0, 0, 0).getTime()
        };
    },
    /**
     * @method 计算两个时间戳的跨越的月份，并返回年月份信息
     * @param {Timestamp} startTimestamp 开始时间时间戳
     * @param {Timestamp} endTimestamp 结束时间时间戳
     */
    computedMonths(startTimestamp, endTimestamp) {
        let start = new Date();
        let over = new Date();
        start.setTime(startTimestamp);
        over.setTime(endTimestamp);

        let begin = {
            year: start.getFullYear(),
            month: start.getMonth() + 1
        };
        let end = {
            year: over.getFullYear(),
            month: over.getMonth() + 1
        };
        let i = begin.month;
        let len = i + (end.year - begin.year) * 12 + (end.month - begin.month);
        let year = begin.year;
        let result = [];
        for (; i <= len; i++) {
            result.push({
                year: i % 12 === 0 ? year++ : year,
                month: i % 12 || 12
            });
        }
        return result;
    }
};
