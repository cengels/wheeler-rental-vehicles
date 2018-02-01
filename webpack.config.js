const path = require('path');

module.exports = {
	entry: './public/js/dashboard/main.jsx',
	output: {
		filename: 'public.js',
		path: path.resolve(__dirname, 'public/js')
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-stage-2']
				}
			}
		]
	}
};