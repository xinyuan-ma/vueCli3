self.importScripts('/spark-md5.js')

self.onmessage = e => {
  const {fileChunkList} = e.data
  const spark = new self.SparkMD5.ArrayBuffer()
  let percentage = 0
  let count = 0
  const loadNext = index => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(fileChunkList[index].file)
    reader.onload = e => {
      count ++
      spark.append(e.target.result)
      if(count === fileChunkList.length) { // 全部完成后，将最终的hash传给主线程
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        })
        self.close()
      } else {
        percentage += 100 / fileChunkList.length // 100÷切片总数 = 每个切片所占百分比
        self.postMessage({
          percentage
        })
        loadNext(count)
      }
    }
  }
  loadNext(0)
}


