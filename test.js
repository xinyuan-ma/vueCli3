let obj1 = new Proxy({}, {
  get (target, propKey, receiver) {
    console.log(`gettting ${propKey}`, receiver === obj);
    return Reflect.get(target, propKey, receiver)
  },
  set (target, propKey, value, receiver) {
    console.log(`setting ${propKey}`);
    return Reflect.set(target, propKey,value, receiver)
  }
})
// obj.count = 1
// console.log(obj.count);

const proxy = new Proxy({}, {
  get(target, key, receiver) {
    return receiver
  }
})

console.log(proxy.name === proxy);