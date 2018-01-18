const path = require('path');

module.exports = {
	entry: './public/js/dashboard/main.js',
	output: {
		filename: 'public.js',
		path: path.resolve(__dirname, 'public/js')
	}
};