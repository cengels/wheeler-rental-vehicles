const RequestHandler = require('./RequestHandler');
const logger = require('../Logger')(module.id);
const { makeGetRequest } = require('./Request');
const Car = require('../vehicles/Car');
const Truck = require('../vehicles/Truck');
const StatusMessages = require('../../definitions/status-messages');

class CalcRequestHandler extends RequestHandler {
	constructor(res, viewObject, requestBody) {
		super(res, viewObject);

		this._requestBody = CalcRequestHandler
			.buildRequestBody(requestBody);
		this._responseBody = RequestHandler
			.processRequestBody(this._requestBody);
		this._NUMBER_OF_DECIMALS = 2;
	}

	renderPrice() {
		makeGetRequest(`/vehicles/${this._requestBody.vehicleId.value}`)
			.then(vehicle => this.getVehicleInstance(vehicle))
			.then(vehicleInstance => {
				this._responseBody.customerPrice = this
					.getCustomerPrice(vehicleInstance);
				this._responseBody.maintenancePrice = this
					.getMaintenancePrice(vehicleInstance);
				this.renderCalcForm();
			})
			.catch(err => this.renderCalcError(
				StatusMessages.Errors.UNKNOWN,
				'Error calculating price.',
				err
			));
	}

	renderCalcForm(hint) {
		return this._getVehicles()
			.then(() => this._renderForm(
				this._responseBody,
				{ hint }
			))
			.catch(err => logger.serverError(
				'Failed to render form',
				err.stack
			));
	}

	renderCalcError(errorHint, logMessage, err) {
		return this._getVehicles()
			.then(() => {
				const hint = this.generateErrorHint(
					errorHint,
					logMessage,
					err
				);
				this.renderCalcForm(hint);
			})
			.catch(error => logger.serverError(
				'Failed to render form',
				error.stack
			));
	}

	static buildRequestBody(requestBody) {
		return {
			'days': {
				'canBeNull': false,
				'value': requestBody.days
			},
			'distance': {
				'canBeNull': false,
				'value': requestBody.distance
			},
			'vehicleId': {
				'canBeNull': false,
				'value': requestBody.vehicleid
			}
		};
	}

	getVehicleInstance(vehicle) {
		[this._vehicle] = vehicle;

		return makeGetRequest(`/models/${this._vehicle.modelid}`)
			.then(model => makeGetRequest(`/types/${model[0].typeid}`))
			.then(type => this._makeNewVehicleInstance(type))
			.catch(err => logger.serverError(
				'Error constructing vehicle object.',
				err.stack
			));
	}

	_getVehicles() {
		return makeGetRequest('/vehicles')
			.then(res => {
				this._responseBody.vehicles = res;
			})
			.catch(err => logger.serverError(
				'Failed to fetch vehicles',
				err.stack
			));
	}

	_makeNewVehicleInstance(type) {
		const {
			'available': availableForRent,
			'licenseplate': licensePlate,
			'maximumcargoload': MAX_CARGO_LOAD,
			mileage,
			'milessincemaintenance': milesSinceMaintenance
		} = this._vehicle;

		switch (type[0].name) {
			case 'Truck':
				return new Truck({
					MAX_CARGO_LOAD,
					availableForRent,
					licensePlate,
					mileage,
					milesSinceMaintenance
				});
			case 'Car':
				return new Car({
					availableForRent,
					licensePlate,
					mileage,
					milesSinceMaintenance
				});
			default:
				return logger.userError(
					'Invalid vehicle type',
					type[0]
				);
		}
	}

	getCustomerPrice(vehicleInstance) {
		// eslint-disable-next-line prefer-template
		return vehicleInstance
			.getCustomerPrice(
				this._requestBody.days.value,
				this._requestBody.distance.value
			)
			.toFixed(this._NUMBER_OF_DECIMALS)
			.toString() + ' €';
	}

	getMaintenancePrice(vehicleInstance) {
		// eslint-disable-next-line prefer-template
		return vehicleInstance
			.getMaintenancePrice(this._requestBody.distance
				.value)
			.toFixed(this._NUMBER_OF_DECIMALS)
			.toString() + ' €';
	}
}

module.exports = CalcRequestHandler;