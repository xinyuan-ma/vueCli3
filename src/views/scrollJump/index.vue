<template>
	<div class="scrollJump" ref="scrollJump">
		<header class="page-header">
			<img
				srcset="https://img-pub01.visitshanghai.com.cn/wuxinwenlv/header_750.jpg 750w, https://img-pub01.visitshanghai.com.cn/wuxinwenlv/header_1125.jpg 1125w, https://img-pub01.visitshanghai.com.cn/wuxinwenlv/header_1500.jpg 1500w"
				src="https://img-pub01.visitshanghai.com.cn/wuxinwenlv/header_750.jpg" @load="loadImg">
		</header>
		<!-- 五心 导航 -->
		<div class="page-top" >
			<div class="group-nav" :class="{ fixed: fiveBlocksFixed }" ref="fiveBlock">
				<ul ref="fiveBlockScroll">
					<li v-for="(item, index) in fiveBlocks" :ref="item.navRef + index" :key="'block' + index"
						:class="{ active: activeBlockIndex === index || !fiveBlocksFixed }"
						@click="handleClickNav(item, index)">{{item.title}}
					</li>
				</ul>
			</div>
			<!-- 五心导航固定后，占位元素 -->
			<div ref="navPosition" v-show="fiveBlocksFixed" :style="{height: `${fiveBlocksNavHeight}px`}"></div>
		</div>
		<!-- 列表 -->

		<div class="main">
			<div class="listContent" v-for="(item, index) in fiveBlocks" :key="index" :ref="item.ref">
				<h1>{{item.title}}</h1>
				<div class="listImg">
					<img v-for="(item, key) in list" :key="key" :src="item.img">
				</div>
        <p v-for="item in 10" style="height: 30px">测试站位使用</p>
			</div>
		</div>
	</div>
</template>

<script>
  import smooth from './scroll'
  console.log(smooth, 'smoothScroll');
  let fiveBlocks = [
	{
		ref: 'nav1',
    navRef: 'navRef',
		title: '导航1',
		top: ''
	}, {
		ref: 'nav2',
    navRef: 'navRef',
		title: '导航2',
		top: ''
	}, {
		ref: 'nav3',
    navRef: 'navRef',
		title: '导航3',
		top: ''
	}, {
		ref: 'nav4',
    navRef: 'navRef',
		title: '导航4',
		top: ''
	}, {
		ref: 'nav5',
		title: '导航5',
    navRef: 'navRef',
		top: ''
	}, {
		ref: 'nav6',
		title: '导航6',
    navRef: 'navRef',
		top: ''
	}
]
let list = [
	{
		img: 'https://img-pub01.visitshanghai.com.cn/505a57af7bd94832b40a74a04ac97e1d.png?e=1587643144&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:OgvrdvWzf458_XMff-GAwptKxL0='
	},
	{
		img: 'https://img-pub01.visitshanghai.com.cn/5fac6431f7e248cd92ad0aab3670b44c.jpg?e=1588927593&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:8OVskPw4WyYBbfVcuOT5ZRIgaVY='
	},
	{
		img: 'https://img-pub01.visitshanghai.com.cn/Fva5K5IR05rdjdmRxWlkQrM75HaH?e=1586504128&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:xTDPt1CTF78euLgnXYhxY3vkn_k='
	},
	{
		img: 'https://img-pub01.visitshanghai.com.cn/FsyrVsbI6Qq6twXl2uf-IAvBxbU0?e=1586243977&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:7nN5ffmRdeZRXqgAzWcjwyiawcM='
	}
]
export default {
	name: 'scrollJump',
	components: {},
	data: function () {
		return {
			fiveBlocksFixed: false,	// 是否固定导航栏
			activeBlockIndex: -1, // 默认的导航栏
			fiveBlocksNavHeight: '', // 占位元素的高度
			fiveBlockTop: '', // fiveBlock距离顶部的距离
      navMaxScroll: '', // 导航栏最大滚动距离
			fiveBlocks,
			list
		}
	},
	computed: {
		fiveBlocksPosition () {
			if (this.fiveBlocksFixed) {
				if (this.downloadVisible) {
					return `${this.downloadAppHeight}px`
					// 为0的话，会出现细微空隙
				} else {
					return `-1px`
				}
			} else {
				return ''
			}
		}
	},
	created () {},
	mounted () {
		this.bandScroll()
    this.fiveBlockBroundClientRect()
    this.listScrollTop()
	},
	methods: {
	  // 等图片加载好以后，再计算导航栏的位置
    loadImg () {},
		// 元素绑定滚动事件
		bandScroll () {
			let dom = document.querySelector('.scrollJump')
			dom.addEventListener('scroll', this.handleScroll)
		},
		// 获取导航栏距离顶部和自身的高度，已经导航栏最大滚动距离
		fiveBlockBroundClientRect () {
      let {top, width, height } = this.$refs.fiveBlock.getBoundingClientRect()
      this.fiveBlockTop = top
			this.fiveBlocksNavHeight = height
      this.navMaxScroll = this.$refs.fiveBlockScroll.scrollWidth - width
    },
    // 获取锚链接各个区域的位置（距离顶部的距离）
    listScrollTop () {
      this.fiveBlocks.forEach(item => {
        item.top = this.$refs[item.ref][0].getBoundingClientRect().top - 50 // 50是预留区域
        console.log(item.top, 'item.top');
      })
    },
    // 让导航栏滚动到屏幕中间
    navScrollMiddle (index) {
      let left = this.$refs['navRef' + index][0].offsetLeft + this.$refs['navRef' + index][0].clientWidth/2 // 计算该元素正中间距离最左边的距离
      let middleLeft = window.innerWidth / 2 // 屏幕一半的距离
      let scrollLeft = left - middleLeft
      if (scrollLeft > 0) {
        scrollLeft = Math.min(scrollLeft, this.navMaxScroll)
      } else if (scrollLeft < 0) {
        scrollLeft = 0
      }
      smooth.smoothScrollLeft(this.$refs.fiveBlockScroll, scrollLeft)
    },
    // 点击跳转到对应的锚点区域
		handleClickNav (item, index) {
      let top = item.top // 目标位置
      this.navScrollMiddle(index)
      smooth.smoothScroll(top, this.$refs.scrollJump)
		},
		handleScroll () {
		  let scrollTop = this.$refs.scrollJump.scrollTop
      console.log(scrollTop, 'scrollTop');
      if (scrollTop > this.fiveBlockTop) {
        this.fiveBlocksFixed = true
      } else {
        this.fiveBlocksFixed = false
      }
      const modifyValue = 0
      for (let i = this.fiveBlocks.length-1; i>0 ;i-- ) {
        if (scrollTop > this.fiveBlocks[i].top - modifyValue) {
          this.activeBlockIndex = i
          break
        }
      }
      if (this.activeBlockIndex > -1) {
       this.navScrollMiddle(this.activeBlockIndex)
      }
      console.log(this.activeBlockIndex, 'this.activeBlockIndex');
    }
	}
}
</script>
<style lang="less" scoped>
  .page-header {
    width: 100%;
    height: 400px;
  }
	.scrollJump {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}

	.page-top {
		width: 100%;
		height: auto;
    background-color: white;

		.group-nav {
			overflow: hidden;
      background-color: white;
      &.fixed {
        position: fixed;
        width: 100%;
        top: 0;
      }
			ul {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				overflow-x: auto;

				&::after {
					content: '';
					display: block;
					width: 20px;
					height: 60px;
					flex-shrink: 0;
				}

				li {
					flex-shrink: 0;
					width: 160px;
					line-height: 60px;
					background-color: #F8640A;
					border-radius: 10px;
					border: 2px solid rgba(255, 255, 255, 1);
					margin: 20px 0 20px 20px;
          &.active {
            background-color: #6FBC17;;
          }
				}
			}
		}
	}

	.main {
		width: 100%;
		padding: 10px;

		.listContent {
			overflow: hidden;
			width: 100%;
			border-radius: 10px;
			background-color: #F5F5F5;
			margin-bottom: 50px;

			&:nth-of-type(1) {
				background-color: #11A3EE;
			}

			&:nth-of-type(2) {
				background-color: #F85D0A;
			}

			&:nth-of-type(3) {
				background-color: #6FBC17;
			}

			&:nth-of-type(5) {
				background-color: #0FB286;
			}

			h1 {
				text-align: center;
				margin: 20px 0;
				font-size: 40px;
				font-weight: bold;
			}

			.listImg {
				width: 100%;
				height: auto;
				display: flex;
				align-items: center;
				justify-content: space-around;
				flex-wrap: wrap;

				img {
					width: 45%;
					height: 300px;
					flex-shrink: 0;
					margin: 20px 0;
				}
			}
		}
	}
</style>
