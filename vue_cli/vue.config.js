const path = require('path')

const resolve = dir => path.join(__dirname, dir)
// // const URL = 'http://m.visitshanghai.com.cn'
// const URL = 'http://172.25.33.219:9090'
const BundleAnalyzerPlugin = require(
	'webpack-bundle-analyzer').BundleAnalyzerPlugin
const { InjectManifest } = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
	outputDir: process.env.outputDir || 'dist',
	publicPath: './',
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
	// configureWebpack: (config) => {
	// 	if (process.env.NODE_ENV === 'production') {
	// 		config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
	// 	}
	// },
	productionSourceMap: false,
	devServer: {
		proxy: {
			'/information': {
				target: URL,
				changeOrigin: true,
				pathRewrite: {
					'/information': '/information'
				}
			},
			'/search': {
				// target: 'http://172.25.33.219:9090',
				target: URL,
				changeOrigin: true,
				pathRewrite: {
					'/search': '/search'
				}
			}
		}
	}
}
