module.exports = {
	plugins: {
		// 'postcss-import': {},
		// 'postcss-url': {},
		// 'postcss-aspect-ratio-mini': {},
		// 'postcss-write-svg': {
		// 	utf8: false
		// },
		// 'postcss-cssnext': {
		// 	features: {
		// 		customProperties: {
		// 			strict: false,
		// 			warnings: false,
		// 			preserve: true
		// 		}
		// 	}
		// },
		'postcss-pxtorem': {
			rootValue: 75, // 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
			propList: ['*'],
			minPixelValue: 3
		}
		// 'cssnano': {
		// 	preset: 'advanced',
		// 	autoprefixer: false,
		// 	'postcss-zindex': false
		// }
	}
}
