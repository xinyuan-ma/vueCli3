/** 图片瀑布流（这个瀑布流是有序的，按照元素接口返回的顺序加载）
* 思路： 插入当前元素的时候，先判断前一个元素是否插入，如果前一个已插入，这个元素就插入，否则放到等到列表中，还有种简单的思路，假如加载10条数据，设一个计数器，
* 每加载成功一个图片，imgLoaded方法的计数器就加一，然后等所有图片都加载成功后，再一次加载所有图片，暂时没用这个方案
*主要用到img的load属性，这个属性是在图片加载成功后，执行的回到，可以获取图片的高度
*/
<template>
  <div class="scroll">
    <div class="photoLiu">
      <div class="left" ref="left"></div>
      <div class="right" ref="right"></div>
    </div>
    <div class="photo" v-for="(item, key) in list" :key="key">
      <div :ref="'item'+key">
        <img :src="item.imgUrl" alt="" @load="imgLoaded(key, $event.target)">
        <h1>{{item.title}}</h1>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'photoLiu',
  components: {},
  data: function () {
    return {
      show: false,
      text: '',
      // 左侧容器高度
      leftHeight: 0,
      // 右侧容器高度
      rightHeight: 0,
      list: [
        {
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/Fvt0csjUonTmqCMlNLh-a8eoj0Ya?e=1564729416&token=JT9hop2MntCNMNz8O7UqTb4scQYpASy7sK2q11su:dV4U11d4f53iSq_RBg5m0cBap5g=&imageMogr2/thumbnail/554x',
          title: '最长的图片最长的图片'
        },
        {
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/culturebuild.jpg',
          title: '中等长的图片中等长的图片'
        },
        {
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/culture_1.jpg',
          title: '最小的图片最小的图片'
        },
        {
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/culture_4.jpg',
          title: '最小的图片最小的图片'
        },
        {
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/business_1.jpg',
          title: '最小的图片最小的图片'
        },
        {
          id: 3,
          title: 'Conference',
          describe: 'Embrace technology and innovation',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/conference_top.jpg'
        },
        {
          id: 12,
          title: 'University',
          // describe: '32所',
          describe: '',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/education_1_top.jpg'
        },
        {
          id: 13,
          title: 'Middle School',
          // describe: '8所',
          describe: '',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/education_2_top.jpg'
        },
        {
          id: 14,
          title: 'Elementary School',
          // describe: '5所',
          describe: '',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/education_3_top.jpg'
        },
        {
          id: 109,
          title: 'Library',
          describe: '',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/library_4_top.jpg'
        },
        {
          id: 24,
          title: 'Living in Shanghai',
          describe: 'Immerse in luxury and comfort',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/travel_2_top.jpg'
        },
        {
          id: 22,
          title: 'Modern Shanghai',
          describe: 'Discover the modern city',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/travel_1_1_top.jpg'
        },
        {
          id: 23,
          title: 'Nostalgic Shanghai',
          describe: 'Discover the old times',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/travel_1_2_top.jpg'
        },
        {
          id: 25,
          title: 'Shanghai Cuisines',
          describe: 'Colourful, aromatic & tasty',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/food_1_top.jpg'
        },
        {
          id: 26,
          title: 'Local Pastries',
          describe: 'Salty and sweet, crisp and soft',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/food_2_top.jpg'
        },
        {
          id: 27,
          title: 'Spicy Cuisines',
          describe: 'Burning sensation on your tongue',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/food_3_top.jpg'
        },
        {
          id: 28,
          title: 'Cantonese Cuisines',
          describe: 'Fresh and light flavor',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/food_4_top.jpg'
        },
        {
          id: 29,
          title: 'Popular Bars',
          describe: 'Fantastic nightlife in shanghai',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/food_5_top.jpg'
        },
        {
          id: 30,
          title: 'World Cuisines',
          describe: 'Various flavors worldwide',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/food_6_top.jpg'
        },
        {
          id: 31,
          title: 'Coffee & Snacks',
          describe: 'Enchantingly rich and unique',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/food_7_top.jpg'
        },
        {
          id: 32,
          title: 'Shanghai Culture',
          describe: 'View historical buildings in Shanghai',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/culture_1_top.jpg'
        },
        {
          id: 65,
          title: 'Culture Venues',
          describe: 'View historical buildings in Shanghai',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/culture_1.jpg'
        },
        {
          id: 33,
          title: 'Activities',
          describe: 'Enjoy art and culture',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/culture_4_top.jpg'
        },
        {
          id: 17,
          title: 'Shopping Mall',
          describe: 'Worldwide brands',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/business_1_top.jpg'
        },
        {
          id: 18,
          title: 'Local Shopping',
          describe: 'Selected special markets',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/business_2_top.jpg'
        },
        {
          id: 19,
          title: 'Century Old Shops',
          describe: 'Selected traditional brands',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/business_5_top.jpg'
        },
        {
          id: 66,
          title: 'Events',
          describe: 'Experience sporting events',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/sports_1_top.jpg'
        },
        {
          id: 67,
          title: 'Gyms and Stadiums',
          describe: 'Enjoy excitement and speed',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/sports_2_top.jpg'
        },
        {
          id: 68,
          title: 'Fitness trails',
          describe: 'Exercise makes different',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/sports_3_top.jpg'
        },
        {
          id: 15,
          title: 'Hospital',
          describe: 'High-quality medical institution',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/healthcare_1_top.jpg'
        },
        {
          id: 16,
          title: 'Specialist Clinic',
          describe: 'Special treatment service',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/healthcare_2_top.jpg'
        },
        {
          id: 69,
          title: 'Hot',
          describe: 'Discover the best shanghai',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/hot_top.jpg'
        },
        {
          id: 11,
          title: 'Shanghai High-tech',
          describe: 'Feel the power of smart technology',
          imgUrl: 'http://hhh.images.visitshanghai.com.cn/app/qianyan.jpg'
        }
      ],
      queue: {}, // 等待加载的元素
      appended: {} // 已经添加的元素
    }
  },
  created () {
    // for (let i = 0; i < 4; i++) {
    //   this.list = this.list.concat(this.list)
    // }
  },
  mounted () {
  },
  methods: {
    imgLoaded (index, imgEl) {
      if (index === 0) {
        this.append(index, imgEl)
        this.checkQueue()
      } else {
        // 检查前一个元素是否已添加
        if (this.appended[index - 1]) {
          this.append(index, imgEl)
          this.checkQueue()
          // 前一个元素还未展示，则先等待
        } else {
          this.queue[index] = imgEl
        }
      }
    },
    append (index, imgEl) {
      // 移出等待队列
      delete this.queue[index]
      this.appended[index] = imgEl
      imgEl.classList.add('loaded')
      const left = this.$refs.left
      const right = this.$refs.right
      const el = this.$refs['item' + index][0]
      const elHeight = el.offsetHeight
      if (this.leftHeight > this.rightHeight) {
        this.rightHeight += elHeight
        right.appendChild(el)
      } else {
        this.leftHeight += elHeight
        left.appendChild(el)
      }
    },
    // 检查是否有元素在队列中等待
    checkQueue () {
      const keys = Object.keys(this.queue)
      keys.sort((prev, next) => prev - next)
      keys.forEach(index => {
        if (this.appended[index - 1]) {
          this.append(index, this.queue[index])
        }
      })
    }
  }
}
</script>
<style lang="less">
  .scroll {
    height: 100%;
    overflow-y: scroll;
  }
  .photoLiu {
    width: 100%;
    display: flex;
    overflow-y: scroll;
    justify-content: space-between;
    .left, .right, .photo {
      width: calc(50vw - 40px);
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
  .photo {
     width: calc(50vw - 40px);
     overflow: hidden;
     img {
       width: 100%;
     }
     display: flex;
     opacity: 0;
     pointer-events: none;
   }
</style>
