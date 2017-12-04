const RequestHandler = require('./RequestHandler');
const logger = require('../Logger')(module.id);
const { makeGetRequest } = require('./Request');
const Car = require('../vehicles/Car');
const Truck = require('../vehicles/Truck');
const StatusMessages = require('../../definitions/status-messages');

class CalcRequestHandler extends RequestHandler {
	constructor(res, viewObject, requestBody) {
		super(res, viewObject);

		this._requestBody = CalcRequestHandler._buildRequestBody(requestBody);
		this._responseBody = RequestHandler._processRequestBody(this._requestBody);
	}

	renderPrice() {
		makeGetRequest('/vehicles/' + this._requestBody.vehicleId.value)
			.then(vehicle => this._getVehicleInstance(vehicle))
			.then(vehicleInstance => {
				this._responseBody.price = this._getRentPrice(vehicleInstance);
				this.renderCalcForm();
			})
			.catch(err => this.renderCalcError(StatusMessages.Errors.UNKNOWN, 'Error calculating price.', err));
	}

	renderCalcForm(hint) {
		return this._getVehicles()
			.then(() => this._renderForm(this._responseBody, { hint: hint }))
			.catch(err => logger.serverError('Failed to render form', err.stack))
	}

	renderCalcError(errorHint, logMessage, err) {
		return this._getVehicles()
			.then(() => {
				const hint = this.generateErrorHint(errorHint, logMessage, err);
				this.renderCalcForm(hint);
			})
			.catch(err => logger.serverError('Failed to render form', err.stack))
	}

	static _buildRequestBody(requestBody) {
		return {
			vehicleId: {
				value: requestBody.vehicleid,
				canBeNull: false
			},
			days: {
				value: requestBody.days,
				canBeNull: false
			},
			distance: {
				value: requestBody.distance,
				canBeNull: false
			}
		};
	}

	_getVehicleInstance(vehicle) {
		this._vehicle = vehicle[0];

		return makeGetRequest('/models/' + this._vehicle.modelid)
			.then(model => makeGetRequest('/types/' + model[0].typeid))
			.then(type => this._makeNewVehicleInstance(type))
			.catch(err => logger.serverError('Error constructing vehicle object.', err.stack));
	}

	_getVehicles() {
		return makeGetRequest('/vehicles')
			.then(res => this._responseBody.vehicles = res)
			.catch(err => logger.serverError('Failed to fetch vehicles', err.stack));
	}

	_makeNewVehicleInstance(type) {
		const { licenseplate, mileage, milessincemaintenance, maximumcargoload, available } = this._vehicle;

		switch (type[0].name) {
			case 'Truck':
				return new Truck(licenseplate, mileage, milessincemaintenance, maximumcargoload, available);
			case 'Car':
				return new Car(licenseplate, mileage, milessincemaintenance, available);
			default:
				logger.userError('Invalid vehicle type', type[0]);
				break;
		}
	}

	_getRentPrice(vehicleInstance) {
		return vehicleInstance
			.getRentPrice(this._requestBody.days.value, this._requestBody.distance.value)
			.toFixed(2)
			.toString() + ' €';
	}
}

module.exports = CalcRequestHandler;