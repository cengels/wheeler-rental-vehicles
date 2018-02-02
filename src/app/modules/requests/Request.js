const request = require('request-promise-native');
const config = require('../../../../config/index');
const HTTP = require('../../definitions/http-verbs');

const makeRequest = (method) => (path, requestBody) => {
	const host = config.get('app:host');
	const port = config.get('app:port');
	const uri = process.env.NODE_ENV === 'production'
		? `http://${host}${path}`
		: `http://${host}:${port}${path}`;

	const options = {
		'json': true,
		method,
		uri
	};

	if (requestBody) {
		options.body = requestBody;
	}

	return request(options);
};

const makeGetRequest = makeRequest(HTTP.GET);

const makeGetRequests = (...paths) => {
	const requests = paths.map(path => makeGetRequest(path));

	return Promise.all(requests);
};

module.exports = {
	'makeDeleteRequest': makeRequest(HTTP.DELETE),
	makeGetRequest,
	makeGetRequests,
	'makePostRequest': makeRequest(HTTP.POST),
	'makePutRequest': makeRequest(HTTP.PUT)
};