<!--练习inheritAttrs， $attrs， $listeners-->

<template>
	<div class="parent">
		<!--练习$attrs-->
		<!--attrs
		组件结构： 父组件 → 子组件 → 孙子组件
		attrs 用作孙子组件获取父组件的数据，不用子组件prop传值给孙子组件-->
		<p>父组件</p>
        {{name}}
		<!--<child :name="name" :age="age" :sex="sex"></child>-->
		<child v-bind="$data"></child>

		<!--练习inheritAttrs-->
		<!-- 正常情况下，父组件可以在子组件上绑定属性，即使子组件没有通过prop接收，子组件的html元素上会显示父组件绑定的数据
		子组件将inheritAttrs设置flase, inheritAttrs: false后，子组件的html就不会显示父组件绑定的数据， 但是 style 和class 不受影响，子组件上依然可以绑定成功，比如 <child class='prop-child' />
		-->
		<p>父组件</p>
		<!--子组件设置inheritAttrs: false,  子组件的html元素上不会有message="child"，但子组件的class 有这个属性"prop-child"-->
		<child v-bind="$data" message="child" class="prop-child"></child>

		<!--练习$listeners-->
		<!--使用场景： 孙子组件，通过$listeners可以直接改变父组件的值， 子组件需要在孙子组件上绑上<grand-son v-on="$listeners"/>-->
		<p>父组件</p>
		<child v-bind="$data" message="child" class="prop-child" @change="changeName"></child>

	</div>
</template>

<script>
import child from './components/child'

export default {
	name: 'parent',
	data () {
		return {
			name: 'yuan',
			age: 'old',
			sex: '男'
		}
	},
	components: {
		child
	},
	mounted () {
		console.log(this.$data, 'data') // this.$data 可以获取当前data对象里的数据
	},
	methods: {
		changeName (val) {
          console.log(val, 'val');
          this.name = val
		}
	}
}
</script>

<style lang="less" scoped>
	.parent {
		width: 100%;
		height: 600px;
	}
	p {
		font-size: 40px;
		line-height: 40px;
		text-align: center;
	}
</style>
