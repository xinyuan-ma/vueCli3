<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>
      <button @click="changeCom">切换组件</button>
    </p>
    <transition name="component-fade" mode="out-in">
      <component v-bind:is="view"></component>
    </transition>
    <AMap></AMap>
    <!--<Transit></Transit>-->
  </div>
</template>

<script>
import mixin from '@/mixin'
import Transit from './transition_demo.vue'
import People from './people.vue'
import AMap from './amap.vue'

export default {
  name: 'home',
  components: {
    Transit,
    People,
    AMap
  },
  mixins: [mixin],
  data: function () {
    return {
      show: false,
      view: Transit
    }
  },
  mounted () {
    this.mixinFn()
  },
  methods: {
    changeCom () {
      this.view = this.view.name.includes('people') ? Transit : People
    }
  }
}
</script>
<style lang="less">
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .5s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
</style>
