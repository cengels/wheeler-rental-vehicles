const httpRequest = require('../request');
const Status = require('../../definitions/status-messages');
const HTTP = require('../../definitions/http-verbs');
const logger = require('../Logger')(module.id);
const Car = require('../vehicles/Car');
const Truck = require('../vehicles/Truck');

const showCalcForm = (req, res, route, partials = {}) => {
	const renderForm = (result) => {
		const options = {
			data: {
				vehicles: result,
				vehicleId: partials.vehicleid || '',
				distance: partials.distance || '',
				days: partials.days || ''
			},
			partials: {
				route: route,
				hint: partials.hint || '',
				price: partials.price || ''
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
		const data = {
			vehicleid: req.body.vehicleid,
			days: req.body.days,
			distance: req.body.distance
		};

		const renderRentPrice = (vehicleInstance) => {
			data.price = vehicleInstance.getRentPrice(req.body.days, req.body.distance).toFixed(2).toString();
			showCalcForm(req, res, route, data);
		};

		const renderErrorHint = (errorHint, loggerMessage) => (err) => {
			data.hint = `<div class="hint-error">${errorHint}</div>`;
			logger.serverError(loggerMessage, err, req.body);
			showCalcForm(req, res, route, data);
		};

		if (data.vehicleid === 'default' || data.days === '' || data.distance === '') {
			renderErrorHint(Status.Errors.EMPTY_FIELDS, 'Error calculating price. Invalid parameters.')(data);
		} else {
			httpRequest(HTTP.GET, '/vehicles/' + data.vehicleid)
				.then((res) => getInstanceOf(res[0]))
				.then(renderRentPrice)
				.catch(renderErrorHint(Status.Errors.UNKNOWN, 'Error calculating price.'));
		}
	});
};