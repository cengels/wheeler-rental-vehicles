const VehicleRequestHandler = require('./VehicleRequestHandler');
const { makeDeleteRequest } = require('./Request');

class VehicleDeleteRequestHandler extends VehicleRequestHandler {
	constructor(res, viewObject, requestBody) {
		super(res, viewObject, requestBody);
		this._requestBody = VehicleDeleteRequestHandler._buildDeleteRequestBody(requestBody);
	}

	renderVehicleError(errorHint, logMessage, err) {
		const hint = this.generateErrorHint(errorHint, logMessage, err);
		this.renderVehicleForm({ hintDelete: hint });
	}

	renderVehicleSuccess(successHint) {
		const hint = this.generateSuccessHint(successHint);
		this.renderVehicleForm({ hintDelete: hint });
	}

	deleteVehicle() {
		return makeDeleteRequest('/vehicles/' + this._requestBody.vehicleId.value);
	}

	static _buildDeleteRequestBody(requestBody) {
		return {
			vehicleId: {
				value: requestBody.vehicleid,
				canBeNull: false
			}
		};
	}
}

module.exports = VehicleDeleteRequestHandler;