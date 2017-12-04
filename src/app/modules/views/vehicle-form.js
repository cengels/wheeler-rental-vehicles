const Status = require('../../definitions/status-messages');
const VehicleRequestHandler = require('../requests/VehicleRequestHandler');
const VehicleDeleteRequestHandler = require('../requests/VehicleDeleteRequestHandler');

module.exports = (router, viewObject) => {
	router.get(viewObject.route, (req, res) => {
		const vehicleGetRequest = new VehicleRequestHandler(res, viewObject, req.body);

		vehicleGetRequest.renderVehicleForm();
	});

	router.post(viewObject.route, (req, res) => {
		const vehiclePostRequest = new VehicleRequestHandler(res, viewObject, req.body);

		if (vehiclePostRequest.inputIsValid()) {
			vehiclePostRequest.postVehicle()
				.then(() => vehiclePostRequest.renderVehicleSuccess(Status.Success.SUCCESS))
				.catch(() => vehiclePostRequest.renderVehicleError(Status.Errors.UNKNOWN,
					'Error posting new vehicle from vehicle-form.'));
		} else {
			vehiclePostRequest.renderVehicleError(Status.Errors.EMPTY_FIELDS,
				'Error adding vehicle. Invalid parameters.', req.body);
		}
	});

	router.post(viewObject.route + '/delete', (req, res) => {
		const vehicleDeleteRequest = new VehicleDeleteRequestHandler(res, viewObject, req.body);

		if (vehicleDeleteRequest.inputIsValid()) {
			vehicleDeleteRequest.deleteVehicle()
				.then(() => vehicleDeleteRequest.renderVehicleSuccess(Status.Success.SUCCESS))
				.catch(() => vehicleDeleteRequest.renderVehicleError(Status.Errors.UNKNOWN,
					'Error deleting vehicle from vehicle-form.'));
		} else {
			vehicleDeleteRequest.renderVehicleError(Status.Errors.EMPTY_FIELDS,
				'Error deleting vehicle. Invalid parameters.', req.body);
		}
	});
};