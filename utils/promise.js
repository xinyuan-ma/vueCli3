// 手写promise
// 原理：promise是对callback的封装，构造函数注册的有一个 成功时的任务队列，一个失败时的任务队列, 任务的初始状态pending
// 在Promise这个构造函数的原型上，添加一个then 和 catch方法，调用then方法的时候，判断任务的状态，状态为pending：将要执行的方法放到任务队列中；状态为已完成，直接执行回调；失败的状态也是同样处理
// 当任务成功后，执行resolve()方法，判断如果成功的任务队列中有值的话，就执行队列中的方法

function PromiseNew(executor){ //executor执行器
	let self = this;
	self.status = 'pending'; //等待态
	self.value  = undefined; // 表示当前成功的值
	self.reason = undefined; // 表示是失败的值
	self.resolveList = [] // 执行成功后的任务队列
	self.rejectList = [] // 执行失败后的任务队列
	self.finallyList = [] // 执行最后统一执行的任务队列
 	function resolve(value){ // 成功的方法
		if(self.status === 'pending'){
			self.status = 'resolved';
			self.value = value;
			if (self.resolveList.length > 0) {
				self.resolveList.forEach(item => {
					item(self.value)
				})
			}
			if (self.finallyList.length > 0) {
				self.finallyList.forEach(item => {
					item(self.value ?  self.value : self.reason)
				})
			}
		}
	}
	function reject(reason){ //失败的方法
		if(self.status === 'pending'){
			self.status = 'rejected';
			self.reason = reason;
			if (self.rejectList.length > 0) {
				self.rejectList.forEach(item => {
					item(self.reason)
				})
			}
			if (self.finallyList.length > 0) {
				self.finallyList.forEach(item => {
					item(self.value ?  self.value : self.reason)
				})
			}
		}
	}
	try {
		// executor函数执行可能会异常，需要捕获，如果出错需要用这个错误对象reject
		executor(resolve,reject);
	} catch (e) {
		// executor执行失败需要用失败原因reject这个promise
		reject(e)
	}

}

PromiseNew.prototype.then = function(onFufiled){
	let self = this;
	if(self.status === 'resolved'){
		onFufiled(self.value);
	}
	if(self.status === 'pending') {
		self.resolveList.push(onFufiled)
	}
	return this
}


PromiseNew.prototype.catch = function(onRejected){
	let self = this;
	if(self.status === 'pending') {
		self.rejectList.push(onRejected)
	}
	if(self.status === 'rejected'){
		onRejected(self.reason);
	}
	return this
}

PromiseNew.prototype.finally = function(fina){
	let self = this;
	if (self.status === 'pending') {
		self.finallyList.push(fina)
	} else {
		fina(self.value ?  self.value : self.reason)
	}

}

let fn = new PromiseNew((resolve,reject) => {
	setTimeout(() => {
		// reject('失败')
		resolve('成功')
	}, 2000)
	// resolve('1')
})
fn.then(res => {
	console.log(res,'res')
}).then(res => {
	console.log(res,'res1')
}).catch(err => {
	console.log(err, 'err')
}).finally(fina => {
	console.log(fina, '完成')
})
