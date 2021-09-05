process.on('message', res => console.log(res))
process.send({message: 'from_child'})
