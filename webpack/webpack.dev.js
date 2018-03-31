const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, '../dist'),
		compress: true,
		overlay: true,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.global\.css$/,
				use: [{loader: 'style-loader'}, {
					loader: 'css-loader',
					options: {sourceMap: true, import: true},
				}],
			},
			{
				test: /^((?!\.global).)*\.css$/,
				use: [{loader: 'style-loader'}, {
					loader: 'css-loader',
					options: {
						modules: true,
						sourceMap: true,
						importLoader: 1,
						localIdentName: '[name]__[local]___[hash:base64:5]',
					},
				}],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['eslint-loader'],
			},
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
});
