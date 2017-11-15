const request = require('request-promise-native');
const config = require('../../../config');

module.exports = (method, path, requestBody) => {
	const host = config.get('app:host');
	const port = config.get('app:port');

	let options = {
		uri: `http://${host}:${port}` + path,
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