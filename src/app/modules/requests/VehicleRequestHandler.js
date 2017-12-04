const RequestHandler = require('./RequestHandler');
const logger = require('../Logger')(module.id);
const { makePostRequest, makeGetRequests } = require('./Request');

class VehicleRequestHandler extends RequestHandler {
	constructor(res, viewObject, requestBody) {
		super(res, viewObject);

		this._requestBody = VehicleRequestHandler._buildRequestBody(requestBody);
	}

	renderVehicleForm(hintObject) {
		const hints = {
			hintCreate: '',
			hintDelete: ''
		};

		if (hintObject) {
			hints.hintCreate = hintObject.hintCreate || '';
			hints.hintDelete = hintObject.hintDelete || '';
		}

		VehicleRequestHandler._getModelsColorsRentalsVehicles()
			.then(result => {
				const rentedVehicles = VehicleRequestHandler._filterRentedVehicles(result[2], result[3]);
				this._responseBody = {
					models: result[0],
					colors: result[1],
					vehicles: rentedVehicles
				};
				this._renderForm(this._responseBody, hints);
			})
			.catch(err => logger.serverError('Failed to render form', err.stack));
	}

	renderVehicleError(errorHint, logMessage, err) {
		const hint = this.generateErrorHint(errorHint, logMessage, err);
		this.renderVehicleForm({ hintCreate: hint });
	}

	renderVehicleSuccess(successHint) {
		const hint = this.generateSuccessHint(successHint);
		this.renderVehicleForm({ hintCreate: hint });
	}

	postVehicle() {
		const postBody = RequestHandler._processRequestBody(this._requestBody);
		postBody.mileage = 0;
		postBody.milessincemaintenance = 0;
		postBody.available = true;

		return makePostRequest('/vehicles', postBody);
	}

	static _getModelsColorsRentalsVehicles() {
		return makeGetRequests('/models', '/colors', '/rentals', '/vehicles');
	}

	static _filterRentedVehicles(rentals, vehicles) {
		const rentedVehicleIDs = rentals.map(rental => rental.vehicleid);
		return vehicles.filter(vehicle => rentedVehicleIDs.indexOf(vehicle.vehicleid) < 0);
	}

	static _buildRequestBody(requestBody) {
		return {
			modelId: {
				value: requestBody.modelid,
				canBeNull: false
			},
			colorId: {
				value: requestBody.colorid,
				canBeNull: false
			},
			licensePlate: {
				value: requestBody['license-plate'],
				canBeNull: false
			},
			year: {
				value: requestBody.year,
				canBeNull: false
			}
		};
	}
}

module.exports = VehicleRequestHandler;