const request = require('request-promise-native');
const config = require('../../../config');

module.exports = (method, path, requestBody) => {
	const host = config.get('app:host');
	const port = config.get('app:port');
	const uri = process.env.NODE_ENV === 'production' ? `http://${host}` + path : `http://${host}:${port}` + path;

	let options = {
		uri: uri,
		method: method,
		json: true
	};

	if (requestBody) {
		options.body = requestBody;
	}

	return new Promise((resolve, reject) => {
		request(options)
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
};