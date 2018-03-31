const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, '../src/app.js'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].js',
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, '../src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['react', 'env', 'stage-2'],
					},
				},
			},
			{
				test: /\.(svg|jpg|jpeg)$/,
				use: [
					'file-loader',
					{
						loader:	'url-loader',
						options: {limit: 40000},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Project',
			minify: {
				collapseWhitespace: true,
			},
			template: path.resolve(__dirname, '../src/index.html'),
		}),
		new webpack.ProvidePlugin({
			'React': 'react',
			'PropTypes': 'prop-types',
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'__DEV__': JSON.stringify(!process.env.NODE_ENV),
		}),
	],
};
