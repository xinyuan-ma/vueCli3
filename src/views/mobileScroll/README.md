# 该组件 是用于手机端下拉 组织过度滚动的demo

* [overScroll.vue](./overScroll.vue) 滚动的组件
* 整体思路： 
* 手指下滑时 阻止元素的默认行为，在ios上 是指页面往下拉到底部后 手机顶部有白边（ios有回弹效果），这样就可以让图片在顶部充满
* 下滑时，markPosition 记录手指的初始位置（y轴的位置），计算出滑动的距离，通过阻尼函数，计算出一个新的距离，这个距离是让元素放大的倍数
* const scale = (this.topHeight + distance) / this.topHeight ，计算出元素的放大倍数； translateY(${distance}px) 计算元素的移动距离（新的距离始终比滚动距离小，阻尼效果就是这样产生）
* 滚动结束后，执行touchend 监听的handleTouchEnd事件，让放大的元素scale(1)  位移的元素 translateY(0px)
*
*
