<template>
  <div class="direvtive_demo">
    <input v-focus type="text" v-model="text" placeholder="输入内容">
    <div class="nice" v-changeColor>
      改变颜色
    </div>
  </div>
</template>

<script>
import mixin from '@/mixin'

export default {
  name: 'direvtive_demo',
  components: {},
  mixins: [mixin],
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
        el.style.borderColor = '#ED1C24'
      }
    },
    changeColor: {
      // 改变元素的颜色
      inserted: function (el) {
        el.style.color = '#ED1C24'
      }
    }
  },
  data: function () {
    return {
      show: false,
      text: ''
    }
  },
  mounted () {
    this.mixinFn()
  },
  methods: {
  }
}
</script>
<style lang="less">
  .direvtive_demo {
    .nice {
      margin-top: 50px;
      height: 200px;
      border: 1px solid deepskyblue;
    }
  }
</style>
