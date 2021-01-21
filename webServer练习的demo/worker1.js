console.log('work task1,running');

setTimeout(() => {
  postMessage({type: '测试',value: [1,2,3]})
}, 2000)

onmessage = (e) => {
  console.log('work1接受', e.data);
}