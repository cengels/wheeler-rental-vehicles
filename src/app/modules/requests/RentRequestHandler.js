const RequestHandler = require('./RequestHandler');
const VehicleRequestHandler = require('./VehicleRequestHandler');
const logger = require('../Logger')(module.id);
const { makePostRequest, makeGetRequests } = require('./Request');

class RentRequestHandler extends RequestHandler {
	constructor(res, viewObject, requestBody) {
		super(res, viewObject);

		this._requestBody = RentRequestHandler._buildRequestBody(requestBody);
	}

	renderRentForm(hint) {
		RentRequestHandler._getVehiclesRentalsCustomers()
			.then(result => {
				const rentedVehicles = VehicleRequestHandler._filterRentedVehicles(result[1], result[0]);
				this._responseBody = {
					vehicles: rentedVehicles,
					customers: result[2]
				};
				this._renderForm(this._responseBody, { hint: hint });
			})
			.catch(err => logger.serverError('Failed to render form', err.stack));
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
		const postBody = RequestHandler._processRequestBody(this._requestBody);
		postBody['rentedsince'] = new Date().toISOString();

		return makePostRequest('/rentals', postBody);
	}

	static _getVehiclesRentalsCustomers() {
		return makeGetRequests('/vehicles?available=true', '/rentals', '/customers');
	}

	static _buildRequestBody(requestBody) {
		return {
			vehicleId: {
				value: requestBody.vehicleid,
				canBeNull: false
			},
			customerId: {
				value: requestBody.customerid,
				canBeNull: false
			}
		};
	}
}

module.exports = RentRequestHandler;