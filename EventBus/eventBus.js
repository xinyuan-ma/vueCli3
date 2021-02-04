class Bus {
  constructor () {
    this.callbacks = {}
  }
  $on(name,fn) {
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }
  $emit(name,args) {
    if(this.callbacks[name]){
      //存在遍历所有callback
      this.callbacks[name].forEach(cb => cb(args))
    }
  }
}

document.body.style.setProperty('--primary', '#888888')
document.body.style.setProperty('--setPriay', '#123456')

document.body.style.removeProperty('--primary')