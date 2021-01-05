/*
* 参考教程：https://juejin.cn/post/6844903625769091079#heading-9
* */

class Promise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined

    // 成功时执行的回调函数数组
    this.onResolvedCallbacks = []

    // 失败时执行的回调函数数组
    this.onRejectedCallbacks = []

    // finally执行的回调函数数组
    this.onFinallyCallbacks = []

    // 成功
    let resolve = value => {
      if (this.state == 'pending') {
        this.state = 'fulfilled'
        this.value = value
        if (this.onResolvedCallbacks.length > 0) this.onResolvedCallbacks.forEach(fn => fn(this.value))
        if (this.onFinallyCallbacks.length > 0)  this.onFinallyCallbacks.forEach(fn => fn(this.value))
      }
    }

    // 失败
    let reject = reason => {
      if (this.state == 'pending') {
        this.state = 'rejected'
        this.reason = reason
        if (this.onRejectedCallbacks.length > 0) this.onRejectedCallbacks.forEach(fn => fn(this.reason))
        if (this.onFinallyCallbacks.length > 0) this.onFinallyCallbacks.forEach(fn => fn(this.reason))
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled) {
    if (this.state == 'pending') {
      this.onResolvedCallbacks.push(onFulfilled)
    } else if (this.state == 'fulfilled') {
      onFulfilled(this.value)
    }
    return this
  }
  catch(onRejected) {
    if (this.state == 'pending') {
      this.onRejectedCallbacks.push(onRejected)
    } else if (this.state == 'fulfilled') {
      onRejected(this.reason)
    }
    return this
  }
  finally(fina) {
    if (this.state == 'pending') {
      this.onFinallyCallbacks.push(fina)
    } else if (this.state == 'fulfilled') {
      fina(this.value ? this.value : this.reason)
    }
  }
}

let p = new Promise((resolve,reject) => {
  setTimeout(() => { resolve('成功') }, 2000)
})

p.then(res => {
  console.log(res);
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err, 'err');
}).finally(fin => {
  console.log(fin, 'fin');
})
