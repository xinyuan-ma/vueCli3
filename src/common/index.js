/**
 * 格式化时间显示，补零对齐
 * eg：2:4  -->  02:04
 * @param {string} value - 形如 h:m:s 的字符串
 */
export function formatTimeStr (value) {
	var time = ''
	var s = value.split(':')
	var i = 0
	for (; i < s.length - 1; i++) {
		time += s[i].length === 1 ? ('0' + s[i]) : s[i]
		time += ':'
	}
	time += s[i].length === 1 ? ('0' + s[i]) : s[i]

	return time
}

/**
 * 异步加载js
 * @param {string} url 加载的url地址
 * @param {boolean} isLoadScript 是否强制加载
 */

export const asyncLoadJs = (url, isLoadScript) => {
	return new Promise((resolve, reject) => {
		if (!isLoadScript) {
			let srcArr = document.getElementsByTagName('script');
			let hasLoaded = false, aTemp = [];
			for (let i = 0; i < srcArr.length; i++) { // 判断当前js是否加载上
				if (srcArr[i].src) {
					aTemp.push(srcArr[i].src)
				}
			}
			hasLoaded = aTemp.indexOf(url) > -1
			if (hasLoaded) {
				resolve();
				return;
			}
		}

		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		document.body.appendChild(script);
		script.onload = () => {
			resolve();
		};
		script.onerror = () => {
			// reject();
		};
	});
}