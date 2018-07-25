const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const {isProduction} = require('./helpers');

module.exports = env => {
	if (!isProduction(env)) {
		return {};
	}

	return {
		runtimeChunk: {
			name: 'manifest',
		},
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: true,
				cache: true,
				parallel: true,
				extractComments: true,
				uglifyOptions: {
					compress: {
						inline: false,
					},
					ecma: 7,
				},
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
	};
};
