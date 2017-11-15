const httpRequest = require('../request');
const Status = require('../../definitions/status-messages');
const HTTP = require('../../definitions/http-verbs');
const logger = require('../Logger')(module.id);

const showRentalForm = (req, res, route, hint) => {
	const renderForm = (vehicles, customers) => {
		const options = {
			data: {
				vehicles: vehicles,
				customers: customers
			},
			partials: {
				hint: hint || '',
				route: route
			}
		};

		res.render('rental-form', options);
	};

	return httpRequest(HTTP.GET, '/vehicles?available=true')
		.then((availableVehicles) => httpRequest(HTTP.GET, '/rentals')
			.then((rentals) => httpRequest(HTTP.GET, '/customers')
				.then((customers) => {
					const rentedVehicleIDs = rentals.map(rental => rental.vehicleid);
					const vehicles = availableVehicles
						.filter(vehicle => rentedVehicleIDs.indexOf(vehicle.vehicleid) < 0);

					renderForm(vehicles, customers);
				}).catch((err) => logger.serverError('Failed to render rental form', err.stack))
		)).catch((err) => logger.serverError('Failed to fetch', err.stack));
};

module.exports = (router, route) => {
		router.get(route, (req, res) => showRentalForm(req, res, route));

	router.post(route, (req, res) => {
		const renderErrorHint = (errorHint, loggerMessage) => (err) => {
			logger.userError(loggerMessage, err);
			showRentalForm(req, res, route, `<div class="hint-error">${errorHint}</div>`);
		};

		const renderSuccessHint = (successHint, loggerMessage) => (info) => {
			logger.info(loggerMessage, info);
			showRentalForm(req, res, route, `<div class="hint-success">${successHint}</div>`);
		};

		if (req.body.customerid === 'default' || req.body.vehicleid === 'default') {
			renderErrorHint(Status.Errors.RentalForm.EMPTY_FIELDS,
				'Error posting new rental from rental-form. Invalid parameters.')(req.body);
		} else {
			httpRequest(HTTP.POST, '/rentals', {
				'customerid': req.body.customerid,
				'vehicleid': req.body.vehicleid,
				'rentedsince': new Date().toISOString()
			})
				.then(renderSuccessHint(Status.Success.SUCCESS, 'Successfully posted new rental from rental-form.'))
				.catch(renderErrorHint(Status.Errors.UNKNOWN, 'Error posting new rental from rental-form.'));
		}
	});
};