const HTTP = require('../../definitions/http-verbs');
const { getCallback, postCallback, deleteCallback } = require('./operations');

module.exports = (router) => (route, ...httpVerbs) => {
	const table = route.split('/')[1];

	if (httpVerbs.indexOf(HTTP.GET) >= 0) {
		router.get(route, (req, res) => getCallback(req, res, table));
	}

	if (httpVerbs.indexOf(HTTP.POST) >= 0) {
		router.post(route, (req, res) => postCallback(req, res, table));
	}

	if (httpVerbs.indexOf(HTTP.DELETE) >= 0) {
		router.delete(route, (req, res) => deleteCallback(req, res, table));
	}
};