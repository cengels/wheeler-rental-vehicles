const httpRequest = require('../request');
const Status = require('../../definitions/status-messages');
const HTTP = require('../../definitions/http-verbs');
const logger = require('../Logger')(module.id);

const showVehicleForm = (req, res, route, hint) => {
	return httpRequest(HTTP.GET, '/models')
		.then((models) => httpRequest(HTTP.GET, '/colors')
			.then((colors) => {
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
			}).catch((err) => logger.serverError('Failed to render vehicle form', err.stack))
		).catch((err) => logger.serverError('Failed to fetch', err.stack));
};

module.exports = (router, route) => {
	router.get(route, (req, res) => showVehicleForm(req, res, route));

	router.post(route, (req, res) => {
		const invalidInput = req.body.colorid === 'default'
			|| req.body.modelid === 'default'
			|| req.body.licenseplate === ''
			|| req.body.year === '';

		if (invalidInput) {
			logger.userError('Error posting new vehicle from vehicle-form. Invalid parameters.', req.body);
			showVehicleForm(req, res, route, `<div class="hint-error">${Status.Errors.EMPTY_FIELDS}</div>`);
		} else {
			httpRequest(HTTP.POST, '/vehicles', {
				'colorid': req.body.colorid,
				'modelid': req.body.modelid,
				'licenseplate': req.body.licenseplate,
				'year': req.body.year,
				'mileage': 0,
				'milessincemaintenance': 0,
				'available': true
			}).then(() => {
					logger.info('Successfully posted new vehicle from vehicle-form.', req.body);
					showVehicleForm(req, res, route, `<div class="hint-success">${Status.Success.SUCCESS}</div>`);
				})
				.catch((err) => {
					logger.serverError('Error posting new vehicle from vehicle-form.', err, req.body);
					showVehicleForm(req, res, route, `<div class="hint-error">${Status.Errors.UNKNOWN}</div>`);
				});
		}
	});
};