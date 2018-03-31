const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		ident: 'postcss',
		plugins: () => [autoprefixer],
	},
};

module.exports = merge(common, {
	module: {
		rules: [
			{
				test: /\.global\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							minimize: true,
							import: true,
						},
					}, postcssLoader],
				}),
			},
			{
				test: /^((?!\.global).)*\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							minimize: true,
							localIdentName: '[name]__[local]___[hash:base64:5]',
						},
					}, postcssLoader],
				}),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'styles.css',
			allChunks: true,
		}),
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../'),
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
		}),
		new webpack.optimize.UglifyJsPlugin(),
	],
});
