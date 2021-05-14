// 通过pipe管道流 将可读流写入指定可写流中
const pipeStream = async (path, writeStream) => {
  new Promise(resolve => {
    let readStream = fse.createReadStream(path) // 创建可读流
    readStream.pipe(writeStream) // 将可读流写入指定可写流中
    readStream.on('end', () => {
      fes.unlinkSync(path) // 删除对应的路径
      resolve()
    })
  })
}

// 合并切片的代码
const mergeChunkList = async (fileHash,ext, size) => { // fileHash 合并生成文件的hash， ext 文件的后缀名
  const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); // 大文件存储目录
  const chunkDir = path.resolve(UPLOAD_DIR, filename); // 存储切片的目录
  let chunkList = await fse.readdir(chunkDir) // 返回该目录下所有文件的名称列表结合
  const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`); // 最终合并生成的文件名称

  chunkList.sort((a,b) => a.split('-')[1] - b.split('-')[1]) // 将切片进行排序

  await Promise.all(chunkList.map((chunkName,index) => {
    pipeStream(
      path.resolve(chunkDir, chunkName), // 每个切片的路径
      // 指定位置创建可写流
      fse.createWriteStream(filePath, {
        start: index*size, // 可写流指定开始和结束位置
        end: (index+1)*size
      })
    )
  }))
  fse.rmdirSync(chunkDir) // 删除切片的目录
}

// 将文件分为多个切片
function createChunk(file, size) {
  let chunkList = []
  let current = 0
  while (current < size) {
    chunkList.push({file: file.slice(current, currentsize)})
    current = size
  }
  return current
}

// 创建request请求
function request({url, method, data, header={}, onprogress}) {
  return new Promise(resolve => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    Object.keys(header).forEach(key => {
      xhr.setRequestHeader(key, header[key])
    })
    xhr.send(data)
    xhr.upload.onprogress = onprogress // 监听文件的上传进度
    xhr.onload = (e) => {
      resolve(e);
    }
  })
}