const RequestHandler = require('./RequestHandler');
const logger = require('../Logger')(module.id);
const { makePostRequest, makeGetRequests } = require('./Request');

class VehicleRequestHandler extends RequestHandler {
	constructor(res, viewObject, requestBody) {
		super(res, viewObject);

		this._requestBody = VehicleRequestHandler
			.buildRequestBody(requestBody);
	}

	renderVehicleForm(hintObject) {
		const hints = {
			'hintCreate': '',
			'hintDelete': ''
		};

		if (hintObject) {
			hints.hintCreate = hintObject.hintCreate || '';
			hints.hintDelete = hintObject.hintDelete || '';
		}

		VehicleRequestHandler.getModelsColorsRentalsVehicles()
			.then(result => {
				const rentedVehicles = VehicleRequestHandler
					.filterRentedVehicles(result[2], result[3]);
				this._responseBody = {
					'colors': result[1],
					'models': result[0],
					'vehicles': rentedVehicles
				};
				this._renderForm(this._responseBody, hints);
			})
			.catch(err => logger.serverError(
				'Failed to render form',
				err.stack
			));
	}

	renderVehicleError(errorHint, logMessage, err) {
		const hint = this.generateErrorHint(
			errorHint,
			logMessage,
			err
		);
		this.renderVehicleForm({ 'hintCreate': hint });
	}

	renderVehicleSuccess(successHint) {
		const hint = this.generateSuccessHint(successHint);
		this.renderVehicleForm({ 'hintCreate': hint });
	}

	postVehicle() {
		const postBody = RequestHandler
			.processRequestBody(this._requestBody);
		postBody.mileage = 0;
		postBody.milessincemaintenance = 0;
		postBody.available = true;

		return makePostRequest('/vehicles', postBody);
	}

	static getModelsColorsRentalsVehicles() {
		return makeGetRequests('/models', '/colors', '/rentals', '/vehicles');
	}

	static filterRentedVehicles(rentals, vehicles) {
		const rentedVehicleIDs = rentals.map(rental => rental.vehicleid);
		return vehicles
			.filter(vehicle => rentedVehicleIDs
				.indexOf(vehicle.vehicleid) < 0);
	}

	static buildRequestBody(requestBody) {
		return {
			'colorId': {
				'canBeNull': false,
				'value': requestBody.colorid
			},
			'licensePlate': {
				'canBeNull': false,
				'value': requestBody['license-plate']
			},
			'modelId': {
				'canBeNull': false,
				'value': requestBody.modelid
			},
			'year': {
				'canBeNull': false,
				'value': requestBody.year
			}
		};
	}
}

module.exports = VehicleRequestHandler;