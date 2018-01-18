const path = require('path');

module.exports = {
	entry: './public/js/dashboard/main.js',
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
					presets: ['react', 'env', 'stage-2']
				}
			}
		]
	}
};