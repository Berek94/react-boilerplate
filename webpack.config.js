const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const connectDevServer = require('./webpack/connectDevServer');
const connectStylesLoaders = require('./webpack/connectStylesLoaders');
const connectOptimization = require('./webpack/connectOptimization');
const {computeDevTool, getFileName, getChunkName} = require('./webpack/helpers');

module.exports = env => ({
	mode: env,
	devtool: computeDevTool(env),
	entry: path.resolve(__dirname, 'src/index.jsx'),
	output: {
		filename: getFileName(env, 'js'),
		chunkFilename: getChunkName(env, 'js'),
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: connectDevServer(env),
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			src: path.resolve(__dirname, './src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['react', 'env', 'stage-2'],
					},
				},
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['eslint-loader'],
			},
			{
				test: /\.css$/,
				use: connectStylesLoaders(env),
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: getFileName(env, 'css'),
			chunkFilename: getChunkName(env, 'css'),
		}),
		new HtmlWebpackPlugin({
			title: 'Title',
			minify: {collapseWhitespace: true},
			template: path.resolve(__dirname, './src/index.html'),
		}),
		new CleanWebpackPlugin(['dist'], {
			verbose: true,
			dry: false,
		}),
		new webpack.ProvidePlugin({
			'React': 'react',
			'PropTypes': 'prop-types',
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env),
		}),
	],
	optimization: connectOptimization(env),
});
