const httpRequest = require('../request');
const Status = require('../../definitions/status-messages');
const HTTP = require('../../definitions/http-verbs');
const logger = require('../Logger')(module.id);

const showRentalForm = (req, res, route, hint) => {
	return httpRequest(HTTP.GET, '/vehicles?available=true')
		.then((availableVehicles) => httpRequest(HTTP.GET, '/rentals')
			.then((rentals) => httpRequest(HTTP.GET, '/customers')
				.then((customers) => {
					const rentedVehicleIDs = rentals.map(rental => rental.vehicleid);
					const vehicles = availableVehicles
						.filter(vehicle => rentedVehicleIDs.indexOf(vehicle.vehicleid) < 0);

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
				}).catch((err) => logger.serverError('Failed to render rental form', err.stack))
		)).catch((err) => logger.serverError('Failed to fetch', err.stack));
};

module.exports = (router, route) => {
	router.get(route, (req, res) => showRentalForm(req, res, route));

	router.post(route, (req, res) => {
		if (req.body.customerid === 'default' || req.body.vehicleid === 'default') {
			logger.userError('Error posting new rental from rental-form. Invalid parameters.', req.body);
			showRentalForm(req, res, route, `<div class="hint-error">${Status.Errors.RentalForm.EMPTY_FIELDS}</div>`);
		} else {
			httpRequest(HTTP.POST, '/rentals', {
				'customerid': req.body.customerid,
				'vehicleid': req.body.vehicleid,
				'rentedsince': new Date().toISOString()
			}).then(() => {
					logger.info('Successfully posted new rental from rental-form.', req.body);
					showRentalForm(req, res, route, `<div class="hint-success">${Status.Success.SUCCESS}</div>`);
				})
				.catch((err) => {
					logger.serverError('Error posting new rental from rental-form.', err, req.body);
					showRentalForm(req, res, route, `<div class="hint-error">${Status.Errors.UNKNOWN}</div>`);
				});
		}
	});
};