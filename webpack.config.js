const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: ['./app/web/page/index.js'],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'app/public'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: [
					'file-loader',
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'output'
		}),
	]
};