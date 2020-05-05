/* eslint-disable */
import Vue from 'vue';
import calendar from './index.vue';

let Calendar = Vue.extend(calendar);
let appEl;
let instance;

let openCalendar = option => {
    appEl = appEl || document.getElementById('app');
    if (!instance) {
        instance = new Calendar();
        instance.vm = instance.$mount();
        document.body.insertBefore(instance.vm.$el, appEl);
    }
    setTimeout(() => {
        instance && Object.assign(instance, instance.$options.defaultData, option.data || {}, {
            show: true,
            success: option.success
        });
    }, 0);
};

export default openCalendar;
