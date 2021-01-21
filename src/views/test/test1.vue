<template>
    <div style="width: 100%" @click="modify">
        修改prop的值
      <p>{{concent.des.des}}</p>
    </div>


</template>

<script>
  export default {
    data () {
      return {
        val: true,
        testconcent: this.concent
      }
    },
    mounted() {
      console.log(this.concent, 'this.concent');
    },
    props: ['concent'],
    methods: {
      modify () {
        this.concent.des.test = 'name'
        console.log(this.concent, 'modify');
      }
    }
  }
</script>
<style lang="less">
	.scrollTest {
		height: 100%;
		overflow: auto;
		p {
			height: 30px;
		}
	}
    .filter {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
