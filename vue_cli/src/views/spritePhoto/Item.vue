<template>
	<div class="itemWarp flex_mid" @click='changePage'>
		<span v-show='!bol'>
			<slot name='normalImg'></slot>
		</span>
		<span v-show='bol'>
			<slot name='activeImg'></slot>
		</span>
		<span class="text" :class="{'active': bol}" v-text='txt'></span>
	</div>
</template>

<script>


export default {
	name: 'Item',
	props: {
		txt: {
			type: String
		},
		page: {
			type: String
		},
		sel: {
			type: String
		}
	},
	computed: {
		bol: function () {
			if (this.sel === this.page) {
				return true
			}
			return false
		}
	},
	methods: {
		changePage: function () {
			// 点击跳转对应的页面
			// this.$router.push('/' + this.page)
			this.$emit('change', this.page)
		}
	}
}
</script>

<style scoped>
.itemWarp {
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.itemWarp span {
	font-size: 12px;
}

.itemWarp .text {
	font-size: 22px;
	color: #999;
}

.itemWarp .active {
	color: #000;
}
</style>
