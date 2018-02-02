const VehicleRequestHandler = require('./VehicleRequestHandler');
const { makeDeleteRequest } = require('./Request');

class VehicleDeleteRequestHandler extends VehicleRequestHandler {
	constructor(res, viewObject, requestBody) {
		super(res, viewObject, requestBody);
		this._requestBody = VehicleDeleteRequestHandler
			.buildDeleteRequestBody(requestBody);
	}

	renderVehicleError(errorHint, logMessage, err) {
		const hint = this.generateErrorHint(errorHint, logMessage, err);
		this.renderVehicleForm({ 'hintDelete': hint });
	}

	renderVehicleSuccess(successHint) {
		const hint = this.generateSuccessHint(successHint);
		this.renderVehicleForm({ 'hintDelete': hint });
	}

	deleteVehicle() {
		/* eslint-disable */
		return makeDeleteRequest(
			`/vehicles/${this._requestBody.vehicleId.value}`
		);
		/* eslint-enable */
	}

	static buildDeleteRequestBody(requestBody) {
		return {
			'vehicleId': {
				'canBeNull': false,
				'value': requestBody.vehicleid
			}
		};
	}
}

module.exports = VehicleDeleteRequestHandler;