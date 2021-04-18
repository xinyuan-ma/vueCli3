// let text = 'hello world'
let text = {
  name: {age: 18},
  arr: [1,2,3]
}
let textBlob = new Blob([JSON.stringify(text)])

function ab2str(input, outputEncoding = 'utf8',) { // arrayBuffer转化为字符串
  const decoder = new TextDecoder(outputEncoding)
  return decoder.decode(input)
}

/**
 * 从blob中提取数据   blob两种提取数据的教程：https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
 * 方法1：
 * 利用FileReader.readAsArrayBuffer的方法 将blob中的内容 转化为ArrayBuffer数据对象
 * 再利用TextEncoder 将ArrayBuffer对象转换为字符串, ArrayBuffer与字符串相互转成的教程；https://es6.ruanyifeng.com/#docs/arraybuffer
 * */
function fileReader(blob) {
  let read = new FileReader()
  read.readAsArrayBuffer(blob)
  read.onloadend = function (e) {
    console.log(e.target.result);
    let text = ab2str(e.target.result)
    console.log(text, 'text1');
  }
}
fileReader(textBlob)

/**
 * 从blob中提取数据
 * 方法2：
 * 利用Response方法
 * */
async function responseReader(blob) {
  let text = await (new Response(blob)).text()
  console.log(text, 'text');
}
responseReader(textBlob);

function request({url, method='post', data, headers= {}, onProgress = e => e, requestList}) {
  return new Promise(resolve => {
    let xhr = new XMLHttpRequest()
    xhr.open(url, method)
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.send()
    xhr.upload = onProgress;
    xhr.onload = e => { // 上传成功时触发
      if(requestList) {
        const xhrIndex = requestList.findIndex(item => item === xhr)
        requestList.splice(xhrIndex,1) // 上传成功后 将请求删除，所以requestList保存未上传完成的任务
      }
      resolve({
        data: e.target.response
      })
    }
  })
}

// 对file文件进行切片
function createChunkList(file, size) {
  let current = 0
  let fileList = []
  while (current < file.size) {
    fileList.push({file: file.slice(current, current + size)})
    current += size
  }
  return fileList
}

async function uploadChunks() {
  const chunklist = this.data.map({chunk,hash,index} => {
    const formData = new FormData()
    formData.append('chunk', chunk)
    formData.append('hash', hash)
    formData.append('filename', this.container.file.name)
    return this.request({
      url: 'http://localhost:3000',
      data: formData,
      onProgress: this.createProgressHandler(this.data[index])
    })
  })
  await Promise.all(chunklist)
}

async function mergeRequest() {
  await this.request({
    url: 'http://localhost:3000/merge',
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      fileName: this.container.file.name
    })
  })
}

const UPLOAD_DIR = path.resolve(__dirname, '..', 'target') // 文件最终存储路径
const multipart = new multiparty.Form() // 解析formData参数格式
multipart.parse(req, async(error, fields, files) => { // fileds 存储文件的信息， files存储文件的内容
  const [chunk] = files.chunk
  const [hash] = fields.hash
  const [filename] = fields.filename
  const chunkDir = path.reslove(__dirname, filename) // 将文件路径接卸为绝对路径
  if(!fse.existsSync(chunkDir)) { // 文件路径不存为
    await fse.mkdirs(chunkDir) // 创建路径
  }
  await fse.move(chunk.path, `${chunkDir}/${hash}`) // 上传文件存储在临时路径中，将临时路径的文件移动到指定路径里
  res.end('received file chunk')
})

const mergeFileChunk = async (filePath, filename, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, filename)
  const chunkPaths = await fse.readdir(chunkDir)
  chunkPaths.sort((a,b) => a.split("-")[1] - b.split('-')[1])
  await Promise.all(chunkPaths.map(chunkPath, index) => {
    pipeStream(path.resolve(chunkDir, chunkPath),
      fse.createWriteStream(filePath, {
        start: index* size,
        end: (index+1)*size
      })
      )
  })
  fse.rmdirSync(chunkDir) //合并后删除存放切片的目录
}

const pipeStream = (path, writeStream) => {
  new Promise(resolve => {
    const readStream = fse.createReadStream(path)
    readStream.on('end', () => {
      fse.unlinkSync(path)
      reslove()
    })
    readStream.pipe(writeStream) // 拼接后面的流
  })
}


function createProcessHandler(item) {
  return e => {
    item.percentage = parseInt((e.loaded/e.total)*100)
  }
}

function handlePause() {
  this.requestList.forEach(item => item.abort())
  this.requestList = []
}


// fs.readdir 读取当前目录的所有文件名
async function createUploadList (fileHash) {
  fs.existsSync(path.resolve(UPLOAD_DIR, fileHash)) ? await fs.readdir(path.resolve(UPLOAD_DIR, fileHash)) : []
}

const path  = require('path')
const fse = require('fs-extra') // fs-extra封装了fs模块的所有方法
const multiparty = require('multiparty') // 解析formData格式的参数
const server = http.createServer()
const UPLOAD_DIR = path.resolve(__dirname, '..', 'target') // 当前目录下的创建target目录 存放服务器下载的文件
server.on('request', async(req, res) => {
  const multipart = new multiparty.Form()
  multipart.parse(req, async(err,fileds, files) => {
    const [chunk] = files.chunk
    const [hash] = fileds.hash
    const [filename] = fileds.filename

    const chunkDir = path.resolve(UPLOAD_DIR, filename)
    if(!fse.existsSync(chunkDir)) { // 判断切换路径是否存在
      await  fse.mkDir(chunkDir) // 创建切片路径，存储所有的切片
    }
    await fse.move(chunk.path, `${chunkDir}${hash}`) // 重点： 将上传文件的从临时路径移动到切片路径下
  })
  res.end("received file chunk")
})

// 重点：合并切片
async function mergeFileChunk(filePath, filename, size) {
  const chunkDir = path.resolve(UPLOAD_DIR, filename) // 找到存储切片的路径
  const chunkList = await fse.readDir(chunkDir) // 读出切片路径下的所有文件名
  chunkList.sort((a,b) => a.split['-'][1] - b.split['-'][1]) // 根据下标从小到大进行排序，还原文件的顺序
  await Promise.all(
    chunkList.map((chunkPath,index) => {
      pipeStream(
        path.resolve(chunkDir, chunkPath)
        // 指定位置创建可写流
        fse.createWritesStream(filePath, {
          start: index * size,
          end: (index + 1) * size
        })
      )
    })
  )
  fse.rmdirSync(chunkDir) // 合并后删除保存切片的目录
}

function pipeStream(path,writeStream) {
  new Primose(resolve => {
    const readStream = fse.createReadStream(path)
    readStream.on('end', () => {
      fse.unlinksSync(path)
      reslove()
    })
    readStream.pipe(writeStream)
  })
}
