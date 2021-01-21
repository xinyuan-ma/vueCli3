console.log('work task2,running');

setTimeout(() => {
  postMessage({type: 'worker2',value: [6]})
}, 3000)

onmessage = (e) => {
  console.log('work2接受', e.data);
}