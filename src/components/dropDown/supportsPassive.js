// Test via a getter in the options object to see
// if the passive property is accessed
let supportsPassive = false
try {
	let opts = Object.defineProperty({}, 'passive', {
		get: function () {
			supportsPassive = true
		}
	})
	window.addEventListener('test-passive', null, opts)
} catch (e) {
}

export default supportsPassive
