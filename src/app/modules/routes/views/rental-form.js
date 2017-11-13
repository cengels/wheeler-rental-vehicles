const dbQuery = require('../../db/queries');
const Status = require('../../../definitions/status');
const logger = require('../../Logger')(module.id);
const pool = require('../../db/pool');

const showRentalForm = (req, res, route, hint) => {
	return dbQuery.getAll.availableVehicles(pool)
		.then((availableVehicles) => dbQuery.getAll.customers(pool)
			.then((customers) => {
				const options = {
					data: {
						vehicles: availableVehicles.rows,
						customers: customers.rows
					},
					partials: {
						hint: hint || '',
						route: route
					}
				};

				res.render('rental-form', options);
			}).catch((err) => logger.serverError('Failed to render rental form', err.stack))
		).catch((err) => logger.serverError('Failed to fetch', err.stack));
};

module.exports = (router, route) => {
	router.get(route, (req, res) => showRentalForm(req, res, route));

	router.post(route, (req, res) => {
		if (req.body.customerid === 'default' || req.body.vehicleid === 'default') {
			logger.userError('Error posting new rental from rental-form. Invalid parameters.', req.body);
			showRentalForm(req, res, route, `<div class="hint-error">${Status.Errors.RentalForm.EMPTY_FIELDS}</div>`);
		} else {
			dbQuery.post.newRental(pool, req.body.customerid, req.body.vehicleid, new Date().toISOString())
				.then(() => {
					logger.info('Successfully posted new rental from rental-form.', req.body);
					showRentalForm(req, res, route, `<div class="hint-success">${Status.Success.RENTAL_FORM}</div>`);
				})
				.catch((err) => {
					logger.serverError('Error posting new rental from rental-form.', err, req.body);
					showRentalForm(req, res, route, `<div class="hint-error">${Status.Errors.UNKNOWN}</div>`);
				});
		}
	});
};