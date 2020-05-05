// 以下时间为 2018 节日表
export const holiday = {
    '1.1': '元旦',
    '2.4': '除夕',
    '2.5': '春节',
    '2.14': '情人节',
    '2.19': '元宵',
    '3.7': '女生节',
    '3.8': '妇女节',
    '4.1': '愚人节',
    '4.5': '清明节',
    '4.13': '泼水节',
    '4.16': '复活节',
    '5.1': '劳动节',
    '5.4': '青年节',
    '5.12': '母亲节',
    '6.1': '儿童节',
    '6.7': '端午节',
    '6.16': '父亲节',
    '7.1': '建党节',
    '8.1': '建军节',
    '8.7': '七夕节',
    '9.10': '教师节',
    '9.13': '中秋节',
    '10.1': '国庆节',
    '10.7': '重阳节',
    '10.31': '万圣节',
    '11.28': '感恩节',
    '11.11': '光棍节',
    '12.24': '平安夜',
    '12.25': '圣诞节'
};

let today = '';

export const setToday = () => {
    let D = new Date();
    let m = D.getMonth() + 1;
    let d = D.getDate();
    today = `${m}.${d}`;
};

setToday();

let hasOwnProperty = Object.prototype.hasOwnProperty;

let hasOwn = function (obj, param) {
    return hasOwnProperty.call(obj, param);
};

// 获取 当前月份日期对应的节日名称
export const getHoliday = (month, day) => {
    const key = `${month}.${day}`;
    return key == today ? '今天' : hasOwn(holiday, key) ? holiday[key] : '';
};
