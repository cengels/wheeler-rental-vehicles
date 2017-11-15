const httpRequest = require('../request');
const Status = require('../../definitions/status-messages');
const HTTP = require('../../definitions/http-verbs');
const logger = require('../Logger')(module.id);

const showVehicleForm = (req, res, route, hint) => {
	const renderForm = (models) => (colors) => {
		const options = {
			data: {
				models: models,
				colors: colors
			},
			partials: {
				hint: hint || '',
				route: route
			}
		};

		res.render('vehicle-form', options);
	};

	return httpRequest(HTTP.GET, '/models')
		.then((models) => httpRequest(HTTP.GET, '/colors')
			.then(renderForm(models))
			.catch((err) => logger.serverError('Failed to render vehicle form', err.stack))
		).catch((err) => logger.serverError('Failed to fetch', err.stack));
};

module.exports = (router, route) => {
	router.get(route, (req, res) => showVehicleForm(req, res, route));

	router.post(route, (req, res) => {
		const invalidInput = req.body.colorid === 'default'
			|| req.body.modelid === 'default'
			|| req.body.licenseplate === ''
			|| req.body.year === '';

		const renderErrorHint = (errorHint, loggerMessage) => (err) => {
			logger.userError(loggerMessage, err);
			showVehicleForm(req, res, route, `<div class="hint-error">${errorHint}</div>`);
		};

		const renderSuccessHint = (successHint, loggerMessage) => (info) => {
			logger.info(loggerMessage, info);
			showVehicleForm(req, res, route, `<div class="hint-success">${successHint}</div>`);
		};

		if (invalidInput) {
			renderErrorHint(Status.Errors.EMPTY_FIELDS,
				'Error posting new vehicle from vehicle-form. Invalid parameters.')(req.body);
		} else {
			httpRequest(HTTP.POST, '/vehicles', {
				'colorid': req.body.colorid,
				'modelid': req.body.modelid,
				'licenseplate': req.body['license-plate'],
				'year': req.body.year,
				'mileage': 0,
				'milessincemaintenance': 0,
				'available': true
			})
				.then(renderSuccessHint(Status.Success.SUCCESS, 'Successfully posted new vehicle from vehicle-form.'))
				.catch(renderErrorHint(Status.Errors.UNKNOWN, 'Error posting new vehicle from vehicle-form.'));
		}
	});
};