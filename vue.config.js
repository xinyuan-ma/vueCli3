const path = require('path')
let pageMethod = require('./utils/getPages.js')
pages = pageMethod.pages()
const SpritesmithPlugin = require('webpack-spritesmith')
var templateFunction = function (data) {
	var shared = '.icons { background-image: url(I);background-size: Wpx Hpx;}'.replace('I', data.sprites[0].image).replace('W', data.spritesheet.width)
		.replace('H', data.spritesheet.height)

	var perSprite = data.sprites.map(function (sprite) {
		return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
			.replace('N', sprite.name)
			.replace('W', sprite.width)
			.replace('H', sprite.height)
			.replace('X', sprite.offset_x)
			.replace('Y', sprite.offset_y)
	}).join('\n')

	return shared + '\n' + perSprite
}
const resolve = dir => path.join(__dirname, dir)
// // const URL = 'http://m.visitshanghai.com.cn'
// const URL = 'http://172.25.33.219:9090'
// const BundleAnalyzerPlugin = require(
// 	'webpack-bundle-analyzer').BundleAnalyzerPlugin
// const { InjectManifest } = require('workbox-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
	pages,
	outputDir: process.env.outputDir || 'dist',
	// publicPath: './',
	// chainWebpack: config => {
	// 	config.optimization.minimizer([new TerserPlugin({
	// 		terserOptions: {
	// 			compress: {
	// 				pure_funcs: ["console.log"]
	// 			}
	// 		}
	// 	})])
	// 	config.resolve.alias.set('@', resolve('src'))
	// 	return {
	// 		plugins: [
	// 			new BundleAnalyzerPlugin()
	// 		]
	// 	}
	// },
	configureWebpack: {
		plugins: [
			new SpritesmithPlugin({
				src: {
					cwd: path.resolve(__dirname, './src/static/iconfont'),
					glob: '*.png'
				},
				target: {
					image: path.resolve(__dirname, './src/static/image/sprite.png'),
					css: [
						[path.resolve(__dirname, './src/static/image/sprite.css'), {
							format: 'function_based_template'
						}]
					]
				},
				customTemplates: {
					'function_based_template': templateFunction
				},
				apiOptions: {
					cssImageRef: 'sprite.png'
				},
				spritesmithOptions: {
					padding: 8
				}
			})
		]
		// if (process.env.NODE_ENV === 'production') {
		// 	config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
		// }
	},
	productionSourceMap: false,
	devServer: {
		// proxy: {
		// 	'/information': {
		// 		target: URL,
		// 		changeOrigin: true,
		// 		pathRewrite: {
		// 			'/information': '/information'
		// 		}
		// 	},
		// 	'/search': {
		// 		// target: 'http://172.25.33.219:9090',
		// 		target: URL,
		// 		changeOrigin: true,
		// 		pathRewrite: {
		// 			'/search': '/search'
		// 		}
		// 	}
		// }
	}
}
