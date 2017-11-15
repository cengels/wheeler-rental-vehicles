const httpRequest = require('../request');
const Status = require('../../definitions/status-messages');
const HTTP = require('../../definitions/http-verbs');
const logger = require('../Logger')(module.id);
const Car = require('../vehicles/Car');
const Truck = require('../vehicles/Truck');

const showCalcForm = (req, res, route, price, hint) => {
	const renderForm = (result) => {
		const options = {
			data: {
				vehicles: result
			},
			partials: {
				hint: hint || '',
				route: route,
				price: price || ''
			}
		};

		res.render('calc-form', options);
	};

	return httpRequest(HTTP.GET, '/vehicles')
		.then(renderForm)
		.catch((err) => logger.serverError('Failed to fetch vehicles', err.stack));

};

const getInstanceOf = (vehicle) => {
	const { modelid, licenseplate, mileage, milessincemaintenance, maximumcargoload, available } = vehicle;

	const makeNewVehicleInstance = (res) => {
		if (res[0].name === 'Truck') {
			return new Truck(licenseplate, mileage, milessincemaintenance, maximumcargoload, available);
		} else {
			return new Car(licenseplate, mileage, milessincemaintenance, available);
		}
	};

	return httpRequest(HTTP.GET, '/models/' + modelid)
		.then((res) => httpRequest(HTTP.GET, '/types/' + res[0].typeid))
		.then(makeNewVehicleInstance)
		.catch((err) => logger.serverError('Error constructing vehicle object.', err.stack));
};

module.exports = (router, route) => {
	router.get(route, (req, res) => showCalcForm(req, res, route));

	router.post(route, (req, res) => {
		const renderRentPrice = (days, distance) => (vehicleInstance) => {
			const rentPrice = vehicleInstance.getRentPrice(days, distance);
			showCalcForm(req, res, route, rentPrice.toFixed(2).toString());
		};

		const renderErrorHint = (errorHint, loggerMessage) => (err) => {
			logger.serverError(loggerMessage, err, req.body);
			showCalcForm(req, res, route, '', `<div class="hint-error">${errorHint}</div>`);
		};

		if (req.body.vehicleid === 'default' || req.body.days === '' || req.body.distance === '') {
			renderErrorHint(Status.Errors.EMPTY_FIELDS, 'Error calculating price. Invalid parameters.')(req.body);
		} else {
			const { vehicleid, days, distance } = req.body;
			httpRequest(HTTP.GET, '/vehicles/' + vehicleid)
				.then((res) => getInstanceOf(res[0]))
				.then(renderRentPrice(days, distance))
				.catch(renderErrorHint(Status.Errors.UNKNOWN, 'Error calculating price.'));
		}
	});
};