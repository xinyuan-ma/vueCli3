var worker1 = new Worker('./worker1.js');
var worker2 = new Worker('./worker2.js');

worker1.onmessage = function (e) {
 console.log('MAIN: ', 'RECEIVE', e.data);
};

setTimeout(() => {
  worker1.postMessage('Hello Worker1');
}, 1000)


worker2.onmessage = function (e) {
  console.log('MAIN: ', 'RECEIVE', e.data);
};

setTimeout(() => {
  worker2.postMessage('Hello Worker2');
}, 2000)

console.log('main, running');