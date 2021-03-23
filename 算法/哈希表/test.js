class RandomizedSet {
  constructor() {
    this.hash = {} // 该对象用来存储 值和对应数组中的下标，方便查找，查找和删除的时间复杂度为O(1)
    this.arr = [] // 存储值
  }
  insert(val) { // 插入的时间复杂度为O(1)
    if (this.hash[val] !== undefined) { // 先判断该值是否存在
      return false
    } else {
      this.arr.push(val)
      this.hash[val] = this.arr.length - 1 // 存储对应的值和数组中的下标
      return true
    }
  }
  remove(val) { // 删除的时间复杂度为O(1)
    if(this.hash[val] !== undefined) {
      let index = this.hash[val];
      [this.arr[index], this.arr[this.arr.length-1]] =  [this.arr[this.arr.length-1], this.arr[index]]; // 要删除元素与最后一项交换位置
      this.hash[this.arr[index]] = index // hash中存储的最后一个元素的下标也对应改变
      this.arr.pop()
      delete this.hash[val]
      return true
    } else {
      return false
    }
  }
  getRandom() { // 随即返回数组中的元素
    return this.arr[Math.floor(Math.random()* this.arr.length)]
  }
}

// 哈希函数，确保最终的数据均匀分布
function hashFn(str, limit = 10) {
  // 创建一个质数的常量,哈希表为什么要用质数的说明：http://www.voidcn.com/article/p-uuyioobq-bcb.html
  const prime = 31
  let hashCode = 0
  for(let item of str) {
    hashCode = prime * hashCode + item.charCodeAt() // 返回字符串第一个字符的 Unicode 编码
  }
  return hashCode % limit
}

console.log(hashFn('name'), 'name');
console.log(hashFn('age'), 'name');
console.log(hashFn('number'), 'name');

// 判断数字是不是质数
function isPrime(number) {
  if(number <= 1 || number ===4) return false
  const temp = Math.ceil(Math.sqrt(number))
  for (let i = 2; i < temp; i++) {
    if(number%i===0) {
      return false
    }
  }
  return true
}

class HashTable {
  constructor() {
    this.storage = [] // 存储哈希表的数据
    this.count = 0 // 当前存放元素的个数
    this.limit = 10
    this.loadFactor = 0.75
    this.minLoadFactor = 0.25
  }
  getPrime(number) {
    while (!isPrime(number)) {
      number ++
    }
    return number
  }

  push(key, value) {
    let index = hashFn(key, this,limit)
    let bucket = this.storage[index]

    if(bucket === undefined) {
      bucket = []
      this.storage[index] = bucket
    }

    for (let i = 0; i < bucket.length; i++) {
      let [key_, value_] = bucket[i]
      if(key_ === key) {
        value_ = value
        return
      }
    }
    bucket.push([key, value])
    this.count ++
    if(this.count / this.limit > this.loadFactor) {
      this.resize(this.getPrime(this.limit*2))
    }
  }

  get(key) {
    let index = hashFn(key, this.limit)
    let bucket = this.storage[index]
    if(bucket === undefined) return null
    for(let [key_,value] of bucket) {
      if(key_ === key) {
        return  value
      }
    }
    return null
  }

  remove(key) {
    let index = hashFn(key, this.limit)
    let bucket = this.storage[index]

    if(bucket === undefined) return null
    for (let i = 0; i < bucket.length; i++) {
      const [key_, value] = bucket[i]
      if(key === key_) {
        bucket.splice(i,1)
        this.count --
        return [key_, value]
      }
    }
  }
}

