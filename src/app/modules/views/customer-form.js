const httpRequest = require('../request');
const Status = require('../../definitions/status-messages');
const HTTP = require('../../definitions/http-verbs');
const logger = require('../Logger')(module.id);

const showCustomerForm = (req, res, route, hint) => {
	const options = {
		partials: {
			hint: hint || '',
			route: route
		}
	};

	res.render('customer-form', options);
};

module.exports = (router, route) => {
	router.get(route, (req, res) => showCustomerForm(req, res, route));

	router.post(route, (req, res) => {
		const validInput = req.body['first-name'] && req.body['last-name'] && req.body['postal-code'] && req.body.address
		&& req.body.city;

		const renderErrorHint = (errorHint, loggerMessage) => (err) => {
			logger.userError(loggerMessage, err);
			showCustomerForm(req, res, route, `<div class="hint-error">${errorHint}</div>`);
		};

		const renderSuccessHint = (successHint, loggerMessage) => (info) => {
			logger.info(loggerMessage, info);
			showCustomerForm(req, res, route, `<div class="hint-success">${successHint}</div>`);
		};


		if (!validInput) {
			renderErrorHint(Status.Errors.EMPTY_FIELDS, 'Error adding customer. Invalid parameters.')(req.body);
		} else {
			httpRequest(HTTP.POST, '/customers', {
				'firstname': req.body['first-name'] || null,
				'lastname': req.body['last-name'] || null,
				'postalcode': req.body['postal-code'] || null,
				'address': req.body.address || null,
				'city': req.body.city || null,
				'phonenumber': req.body['phone-number'] || null,
				'customersince': new Date().toISOString()
			})
				.then(renderSuccessHint(Status.Success.SUCCESS, 'Successfully posted new customer from customer-form.'))
				.catch(renderErrorHint(Status.Errors.UNKNOWN, 'Error posting new customer from customer-form.'));
		}
	});
};