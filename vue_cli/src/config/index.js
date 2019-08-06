console.log(222222)
let url = ''
console.log(process.env.VUE_APP_YUAN, 'process.env.VUE_APP_YUAN')
switch (process.env.VUE_APP_YUAN) {
	case 'red':
		url = 'redred'
		break
	case 'blue':
		url = 'http:blue'
		break
	default:
		url = window.location.origin
		break
}
export default {
	url
}
