function deepClone(target, hash = new WeakMap()) {
  if(!isObject(target)) return target
  if(hash.get(target)) return hash.get(target)
  let obj = Array.isArray(target) ? [] : {}
  hash.set(target, obj)
  for(let key in target) {
    if(target.hasOwnProperty(key)) {
      if(isObject(target[key])) {
        obj[key] = deepClone(target[key], hash)
      } else {
        obj[key] = target[key]
      }
    }
  }
  return obj
}
function isObject(target) {
  return typeof target === 'object' && target !== null
}
let obj = {
  a: {
    b:1
  }
}
let obj1 = deepClone(obj)
obj.a.b = 2
console.log(obj,obj1);
