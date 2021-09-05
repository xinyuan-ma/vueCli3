const cp = require('child_process')
let n = cp.fork('child.js')
n.send({message: 'from_parent'})
n.on('message', res => console.log(res))
