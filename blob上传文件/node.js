// console.log('start');
// Promise.resolve().then(() => {
//   console.log('promise');
// })
// process.nextTick(function () {
//   console.log('nextTick');
// })
// setTimeout(() => {
//   console.log('timeout');
// }, 0)

// setTimeout(() => {
//   console.log('timer1')
//   Promise.resolve().then(function() {
//     console.log('promise1')
//   })
// }, 0)
// process.nextTick(() => {
//   console.log('nextTick')
//   process.nextTick(() => {
//     console.log('nextTick')
//     process.nextTick(() => {
//       console.log('nextTick')
//       process.nextTick(() => {
//         console.log('nextTick')
//       })
//     })
//   })
// })

// Promise.resolve().then(()=>{
//   console.log('Promise1')
//   setTimeout(()=>{
//     console.log('setTimeout2')
//   },0)
// })
// setTimeout(()=>{
//   console.log('setTimeout1')
//   Promise.resolve().then(()=>{
//     console.log('Promise2')
//   })
// },0)

// let bar;
//
// setTimeout(() => {
//   console.log('setTimeout');
// }, 0)
//
// setImmediate(() => {
//   console.log('setImmediate');
// })
// function someAsyncApiCall(callback) {
//   process.nextTick(callback);
// }
//
// someAsyncApiCall(() => {
//   console.log('bar', bar); // 1
// });
//
// bar = 1;
//
//
// (function test() {
//   setTimeout(function() {console.log(4)}, 0);
//   new Promise(function executor(resolve) {
//     console.log(1);
//     for( var i=0 ; i<10000 ; i++ ) {
//       i == 9999 && resolve();
//     }
//     console.log(2);
//   }).then(function() {
//     console.log(5);
//   });
//   console.log(3);
// })()

console.log('start');
setTimeout(() => {
  console.log('timeout');
}, 0)
Promise.resolve().then(() => {
  console.log('promise');
})
process.nextTick(() => {
  console.log('nextTick');
  Promise.resolve().then(() => {
    console.log('promise1');
  })
})
console.log('end');