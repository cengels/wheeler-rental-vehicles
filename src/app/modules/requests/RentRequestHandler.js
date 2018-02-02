const RequestHandler = require('./RequestHandler');
const VehicleRequestHandler = require('./VehicleRequestHandler');
const logger = require('../Logger')(module.id);
const { makePostRequest, makeGetRequests } = require('./Request');

class RentRequestHandler extends RequestHandler {
	constructor(res, viewObject, requestBody) {
		super(res, viewObject);

		this._requestBody = RentRequestHandler
			.buildRequestBody(requestBody);
	}

	renderRentForm(hint) {
		RentRequestHandler
			.getVehiclesRentalsCustomers()
			.then(result => {
				const rentedVehicles = VehicleRequestHandler
					.filterRentedVehicles(result[1], result[0]);

				this._responseBody = {
					'customers': result[2],
					'vehicles': rentedVehicles
				};

				this._renderForm(
					this._responseBody,
					{ hint }
				);
			})
			.catch(err => logger.serverError(
				'Failed to render form',
				err.stack
			));
	}

	renderRentError(errorHint, logMessage, err) {
		const hint = this.generateErrorHint(errorHint, logMessage, err);
		this.renderRentForm(hint);
	}

	renderRentSuccess(successHint) {
		const hint = this.generateSuccessHint(successHint);
		this.renderRentForm(hint);
	}

	postRental() {
		const postBody = RequestHandler.processRequestBody(this._requestBody);
		postBody.rentedsince = new Date().toISOString();

		return makePostRequest('/rentals', postBody);
	}

	static getVehiclesRentalsCustomers() {
		return makeGetRequests(
			'/vehicles?available=true',
			'/rentals',
			'/customers'
		);
	}

	static buildRequestBody(requestBody) {
		return {
			'customerId': {
				'canBeNull': false,
				'value': requestBody.customerid
			},
			'vehicleId': {
				'canBeNull': false,
				'value': requestBody.vehicleid
			}
		};
	}
}

module.exports = RentRequestHandler;